from backend.train.actions import *
from backend.actions.dataset import compute_items_quantity, compute_labels_quantity
from backend.analyze.text import ModelError
import sys

class Tester():
    def __init__(self, project):
        self.project = project

    def test_model_create(self):
        try:
            self.model = create_model_instance(project, self.labels_quantity)
            self.create_model_error = { 'is_error': False, 'error_message': ModelError.CREATE_MODEL_SUCCESS.value }
        except Exception as e:
            self.create_model_error = { 'is_error':True, 'error': ModelError.CREATE_MODEL.value + str(e) }  
        except RuntimeError as e:
            self.create_model_error = { 'is_error':True, 'error': ModelError.CREATE_MODEL.value + str(e) }  

    def test_project(self):
        dataset_exist = self.dataset_load()
        if dataset_exist:
            items_check = self.checks_items_quantity()
            labels_check = self.check_labels_quantity()
            test_model_create()
            dataset_exists_error = ModelError.DATASET_EXIST.value
            if self.create_model_error['is_error'] == False:
                labels_output_check = self.check_model_output()
                run_check = self.run_model()
            else:
                labels_output_check = { 'is_error': True, 'error_message': ModelError.CANT_LABELS_OUTPUT.value }
                run_check = { 'is_run': False, 'error_message': ModelError.RUN_CREATE_PROBLEMS.value }
        else:
            dataset_exists_error = ModelError.DATASET_NOT_EXIST.value
            items_check = { 'is_error': True, 'error_message': ModelError.DATASET_FAIL_ITEMS.value }
            labels_check = { 'is_error': True, 'error_message': ModelError.CANT_LABELS_OUTPUT.value }
            labels_output_check = { 'is_error': True, 'error_message': ModelError.DATASET_FAIL_LABELS.value }
            run_check = { 'is_run': False, 'error_message': ModelError.RUN_DATASET_PROBLEMS.value }
        return {
            'model': {
                'create_model': self.create_model_error,
                'run_model': {
                    'is_error': not run_check['is_run'],
                    'error_message': str(run_check['error_message'])
                }
            },
            'dataset': {
                'exists': {
                    'is_error':  not dataset_exist,
                    'error_message': dataset_exists_error
                },
                'items': items_check,
                'labels': labels_check,
                'output_match': labels_output_check,
            }
        }

    def dataset_load(self):
        if not self.project.dataset.id > 0:
            return False
        self.labels_quantity = compute_labels_quantity(self.project.dataset)
        self.items_quantity = compute_items_quantity(self.project.dataset)
        return True

    def check_model_output(self):
        input = torch.zeros(1, 3, 64, 64).cuda()
        output_shape = self.model(input).shape
        if output_shape[-1] != self.labels_quantity:
            return { 'is_error': True, 'error_message': 'mismatch: the dimension of your model output fits a dataset composed of ' + str(output_shape[-1]) + ' while your dataset contains ' + str(self.labels_quantity) }
        return { 'is_error': False, 'error_message': ModelError.LABELS_OUTPUT_MATCH.value }
    
    def check_labels_quantity(self):
        if self.labels_quantity == 0:
            return { 'is_error': True, 'error_message': ModelError.LABELS_NOT_EXIST.value }
        return { 'is_error': False, 'error_message': ModelError.LABELS_EXISTS.value }

    def checks_items_quantity(self):
        if self.items_quantity == 0:
            return { 'is_error': True, 'error_message': ModelError.ITEMS_NOT_EXIST.value }
        return { 'is_error': False, 'error_message': ModelError.ITEMS_EXISTS.value }

    def run_model(self):
        # try to run the model for one epoch
        batch_size = min(self.items_quantity, 32)
        epoch = 1

        # load dataset into memory
        dataset_id = get_project_dataset(self.project.id)
        items = items_records(dataset_id)
        labels = labels_dictionary(dataset_id) 
        dataset = load_dataset(items, labels)
        train_set, dev_set, test_set = divide_dataset(dataset)
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
            return { 'is_run':True, 'error_message': ModelError.RUN_SUCCESS.value }
        except Exception as e:
            return { 'is_run':False, 'error_message': ModelError.RUN_ERROR.value + str(e) }  