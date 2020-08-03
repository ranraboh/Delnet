from backend.submodels.project import *
from backend.submodels.model import *
from backend.actions.dataset import * 
from backend.actions.model import *
from backend.actions.amb import *
from backend.actions.project import *
from backend.actions.runs import *
from backend.actions.general import float_precision
from backend.train.known import ObtainKnownModel
from backend.train import train
from django.conf import settings
from backend.train.model import Model
import torchvision.models as models
from backend.actions.layersextractor import LayersExtractor
from backend.actions.project import get_project_model_file
import torchvision
import importlib
import random
import torch

# run the project model and store up the results in dataset
def run_model(request):
    print (request)
    project = Project.objects.filter(id=request['project'])[0]

    # load dataset into memory
    dataset_id = get_project_dataset(request['project'])
    items = items_records(dataset_id)
    labels = labels_dictionary(dataset_id) 
    dataset = load_dataset(items, labels)
    train_set, dev_set, test_set = divide_dataset(dataset)
    model = create_model_instance(project, len(labels))

    # create train object and use it to train user model
    train_obj = train.ModelTrain(model=model, train_set=train_set, dev_set=dev_set, test_set=test_set, 
        run_request=request, labels_quantity=len(labels))
    train_obj.train()

    # evaluate \ test model and save results in database
    total_results = train_obj.evaluate_over_test()
    labels_list = DataLabel.objects.filter(dataset_id=dataset_id)
    save_total(results=total_results, run_code=request['run'], labels=labels_list)
    project_best_result(project=project, run_accuracy=total_results['accuracy'])
    save_model_parameters(model=model, project_id=project.id, state='latest')
    if total_results['accuracy'] == project.best_model_saved:
        save_model_parameters(model=model, project_id=project.id, state='best')
    print('saving..')  

def create_model_instance(project, labels_quantity):
    if project.model_type == 'u':
        import_model = __import__('media.projects.' + str(project.id), fromlist=['model'])
        model = import_model.model
        return model.Model()
    elif project.model_type == 'c':
        layers_file = get_file_layers(project.id)
        layers = read_layers(layers_file)['layers']
        return Model(layers)
    else:
        known_model = ProjectKnownModel.objects.filter(project=project.id)[0].known_model.name
        model = ObtainKnownModel(known_model, labels_quantity)
        return model



def save_epoch(epoch, train_results, dev_results, num_of_epochs, run_id):
    # for tests
    if run_id == -1:
        return
    
    # save results in runresult model
    run = ProjectRuns.objects.filter(id=run_id)[0]
    RunResult.objects.create(run=run, epoch=epoch, accuracy_rate=train_results['accuracy'], loss=train_results['loss'],set='t')
    RunResult.objects.create(run=run, epoch=epoch, accuracy_rate=dev_results['accuracy'], loss=dev_results['loss'], set='d')
    print(str(epoch) + " finished!")

    # update progress
    if epoch == num_of_epochs:
        run.progress = 99
    else:
        run.progress = ((epoch + 1) / num_of_epochs) * 100
    run.save()

def save_total(results, run_code, labels):
    # update total results over test set
    run = ProjectRuns.objects.filter(id=run_code)[0]
    run.accuracy = results['accuracy']
    run.loss = results['loss']
    store_confusion_matrix(results, labels, run)

    # update progess
    run.progress = 100
    run.save()

def save_model_parameters(model, project_id, state):
    model_file = get_run_file(project_id, state)
    save_parameters(model, model_file)

def project_best_result(project, run_accuracy):
    current_result = float_precision(run_accuracy, 4) * 100
    if project.result < current_result:
        project.result = current_result
    if project.best_model_saved < run_accuracy:
        project.best_model_saved = run_accuracy
    project.save()

def divide_dataset(dataset):
    # shuffle dataset before division
    dataset_size = len(dataset)
    random.shuffle(dataset)

    # divide dataset into three subsets train, validation and test
    partitions = [ int(dataset_size * 0.7), int(dataset_size * 0.8), dataset_size] 
    return dataset[0 : partitions[0]], dataset[partitions[0] + 1: partitions[1]], dataset[partitions[1] + 1: partitions[2]] 

def deploy_model(project, state, images, images_quantity):
    # load the model and crucial data for model deployement
    labels = DataLabel.objects.filter(dataset_id=project.dataset)
    model = create_model_instance(project, len(labels))
    path = get_run_file(project.id, state)
    load_parameters(model, path)

    # predict each sample
    results = []
    for i in range(int(images_quantity)):
        image = images[str(i)]
        sample = image_to_sample(image)
        output_vector = model(sample)
        prediction = torch.argmax(output_vector)
        current_prediction = {
            'id': prediction,
            'name': labels[int(prediction)].name,
            'image': save_deploy_image(project_id=project.id, image=image)
        }
        results.append(current_prediction)
    return results

def save_parameters(model, path):
    torch.save(model.state_dict(), path)

def load_parameters(model, path):
    model.load_state_dict(torch.load(path))

def extract_layers(project):
    exratctor = LayersExtractor()
    labels_quantity = compute_labels_quantity(project.dataset)
    model = create_model_instance(project, labels_quantity)
    file_path = get_project_model_file(project)
    layers = exratctor.extractLayers(file_path, model)
    return {
        'valid': True,
        'layers': layers
    }
