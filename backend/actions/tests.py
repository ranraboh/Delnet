from backend.train.actions import *
from backend.submodels.model import ProjectKnownModel
from backend.actions.dataset import compute_items_quantity, compute_labels_quantity
from backend.analyze.text import ModelError
from backend.actions.project import check_class_validation
import sys

class Tester():
    def __init__(self, project):
        self.project = project

    def display_error(self, data):
        is_error, error_message = data
        return { 'is_error': is_error, 'error_message': error_message }

    def architecture_defined(self):
        layers_file = get_file_layers(self.project.id)
        if not os.path.exists(layers_file):
            return True, ModelError.LAYERS_FILE_UNSET
        return False, ''

    def unselected_model(self):
        if self.project.model_type != 'k':
            return False, ModelError.GOOD_SETTINGS.value
        known_models = ProjectKnownModel.objects.filter(project=self.project)
        if known_models.count() <= 0:
            return True, ModelError.KNOWN_MODEL_UNSELECTED.value
        return False, ModelError.GOOD_SETTINGS.value

    def file_conventions(self):
        if self.project.model_type == 'u':  
            files = ProjectFiles.objects.filter(project=self.project)
            print (files.count())
            print (files)
            if files.count() == 0:
                return True, ModelError.NO_FILES.value
            elif files.filter(name="model.py").count() == 0:
                return True, ModelError.NO_MAIN_FILE.value
            elif not check_class_validation(project=self.project):
                return True, ModelError.MODEL_CLASS_UNDEFINED.value
            return False, ''
        return False, ''
    
    def valid_settings(self):
        if self.project.height <= 1 or self.project.width <= 1:
            return True, ModelError.IMAGE_SIZE_ERROR.value
        partition_sum = self.project.train_percentage + self.project.dev_percentage + self.project.test_percentage
        if partition_sum != 100:
            return True, ModelError.PARTITIONS_ERROR.value
        if self.project.dataset == None or self.project.dataset.id < 1:
            return True, ModelError.DATASET_NOT_EXIST.value
        file_conventions = self.file_conventions()
        if file_conventions[0] == True:
            return file_conventions
        return self.unselected_model()


    def test_model_create(self):
        layers_file = get_file_layers(self.project.id)
        file_conventions = self.file_conventions()
        if file_conventions[0] == True:
            self.create_model_error = file_conventions
            return
        if self.project.model_type == 'c' and not os.path.exists(layers_file):
            self.create_model_error = True, ModelError.LAYERS_FILE_UNSET.value
            return
        try:
            self.model = create_model_instance(self.project, self.labels_quantity)
            self.create_model_error = False, ModelError.CREATE_MODEL_SUCCESS.value
        except RuntimeError as e:
            self.create_model_error = True, ModelError.CREATE_MODEL.value + " " + str(e)
        except TypeError as e:
            if 'unexpected keyword argument' in str(e):
                self.create_model_error = True, ModelError.UNEXPECTED_KEYWORD.value + " \'" + str(e).split('\'')[1] + "\'"
            else: 
                self.create_model_error = True, ModelError.TYPE_ERROR.value
        except NameError as e:
            self.create_model_error = True, ModelError.NAME_ERROR_CREATION.value + " " + str(e)
        except ImportError as e:
            self.create_model_error = True, ModelError.MODULE_NOT_FOUND.value + " " + str(e)
        except ModuleNotFoundError as e:
            self.create_model_error = True, ModelError.MODULE_NOT_FOUND.value + " " + str(e)
        except Exception as e:
            self.create_model_error = True, 'an error has been detectd during model initialization. ' + str(e)
    
    def test_project(self):
        dataset_exist = self.dataset_load()
        valid_settings = self.valid_settings()
        if dataset_exist:
            dataset_exists_error = ModelError.DATASET_EXIST.value
            items_check = self.checks_items_quantity()
            labels_check = self.check_labels_quantity()
            self.test_model_create()
            if self.create_model_error[0] == False:
                labels_output_check = self.check_model_output()
                run_check = self.run_model()
            else:
                labels_output_check = True, ModelError.CANT_LABELS_OUTPUT.value
                run_check = True, ModelError.RUN_CREATE_PROBLEMS.value
        else:
            dataset_exists_error = ModelError.DATASET_NOT_EXIST.value
            self.test_model_create()
            items_check = True, ModelError.DATASET_FAIL_ITEMS.value
            labels_check = True, ModelError.CANT_LABELS_OUTPUT.value
            labels_output_check = True, ModelError.DATASET_FAIL_LABELS.value
            run_check = True, ModelError.RUN_DATASET_PROBLEMS.value
        return {
            'model': {
                'create_model': self.display_error(self.create_model_error),
                'run_model': self.display_error(run_check)
            },
            'dataset': {
                'exists': {
                    'is_error':  not dataset_exist,
                    'error_message': dataset_exists_error
                },
                'items': self.display_error(items_check),
                'labels': self.display_error(labels_check),
                'output_match': self.display_error(labels_output_check),
            },
            'settings': self.display_error(valid_settings)
        }

    def dataset_load(self):
        if self.project.dataset == None or not self.project.dataset.id > 0:
            return False
        self.labels_quantity = compute_labels_quantity(self.project.dataset)
        self.items_quantity = compute_items_quantity(self.project.dataset)
        return True

    def check_model_output(self):
        input = torch.zeros(2, 3, self.project.height, self.project.width).cuda()
        try:
            output_shape = self.model(input).shape
            if output_shape[-1] != self.labels_quantity:
                return True, 'mismatch: the dimension of your model output fits a dataset composed of ' + str(output_shape[-1]) + ' while your dataset contains ' + str(self.labels_quantity)
            return False, ModelError.LABELS_OUTPUT_MATCH.value 
        except RuntimeError as e:
            return  True, str(e)

    def check_labels_quantity(self):
        if self.labels_quantity == 0:
            return True, ModelError.LABELS_NOT_EXIST.value
        return False, ModelError.LABELS_EXISTS.value

    def checks_items_quantity(self):
        if self.items_quantity == 0:
            return True, ModelError.ITEMS_NOT_EXIST.value
        return False, ModelError.ITEMS_EXISTS.value

    def run_model(self):
        # try to run the model for one epoch
        batch_size = min(self.items_quantity, 32)
        epoch = 1
        
        # try out feed forward process
        input = torch.zeros(2, 3, self.project.height, self.project.width).cuda()
        try:
            output_shape = self.model(input)
        except RuntimeError as e:
            return True, str(e)
        except NameError as e:
            return True, ModelError.NAME_ERROR_RUN + " " + str(e)
        except ImportError as e:
            return True, ModelError.MODULE_NOT_FOUND.value
        except ModuleNotFoundError as e:
            return True, ModelError.MODULE_NOT_FOUND.value
        except Exception as e:
            return True, str(e)

        # load dataset into memory
        dataset_id = get_project_dataset(self.project.id)
        items = items_records(dataset_id)
        labels = labels_dictionary(dataset_id) 
        dataset = load_dataset(items, labels, self.project.height, self.project.width)
        train_set, dev_set, test_set = divide_dataset(dataset, self.project.train_percentage, self.project.dev_percentage)
        request = {
            'run': -1,
            'project': self.project.id,
            'parameters': {
                'epochs': epoch,
                'batch_size': batch_size,
                'optimizer': {
                    'learning_rate': 0.001,
                    'optimizer': 1,
                    'weight_decay': 0.01,
                },
                'loss_type': 1
            }
        }

        # create train object and use it to train user model
        try:
            train_obj = train.ModelTrain(model=self.model, train_set=train_set, dev_set=dev_set, test_set=test_set, 
            run_request=request, labels_quantity=self.labels_quantity)
            train_obj.train()
            return False, ModelError.RUN_SUCCESS.value
        except RuntimeError as e:
            return True, ModelError.RUN_ERROR.value + str(e)
        except NameError as e:
            return True, ModelError.NAME_ERROR_RUN.value + " " + str(e)
        except ImportError as e:
            return True, ModelError.MODULE_NOT_FOUND.value
        except Exception as e:
            if 'but got num_samples=0' in str(e):
                return True, ModelError.NOT_ENOUGH_SAMPLES.value
            return True, ModelError.RUN_ERROR.value + str(e)

