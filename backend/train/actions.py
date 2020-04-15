from backend.submodels.project import *
from backend.submodels.model import *
from backend.actions.dataset import * 
from backend.actions.model import *
from backend.train import train
from django.conf import settings
import torchvision.models as models
import torchvision
import importlib
import random

# run the project model and store up the results in dataset
def run_model(request):
    print (request)
    model = create_model_instance(request['project'])

    # load dataset into memory
    dataset_id = get_project_dataset(request['project'])
    items = items_records(dataset_id)
    labels = labels_dictionary(dataset_id) 
    dataset = load_dataset(items, labels)
    train_set, dev_set, test_set = divide_dataset(dataset)

    # create train object and use it to train user model
    train_obj = train.ModelTrain(model=model, train_set=train_set, dev_set=dev_set, test_set=test_set, 
        run_request=request, labels_quantity=len(labels))
    train_obj.train()

    # evaluate \ test model and save results in database
    total_results = train_obj.evaluate_over_test()
    labels_list = DataLabel.objects.filter(dataset_id=dataset_id)
    save_total(total_results, request['run'], labels_list)
    print('saving..')

def create_model_instance(project):
    model = models.resnet18().cuda()
    num_features = model.fc.in_features
    model.fc = torch.nn.Linear(num_features, 2).cuda()
    return model
    '''
    import_model = __import__('media.projects.' + str(project), fromlist=['model'])
    model = import_model.model
    return model.Model()
    '''

def save_epoch(epoch, train_results, dev_results, num_of_epochs, run_id):
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

def save_total(total_results, run_id, labels):
    # update total results over test set
    run = ProjectRuns.objects.filter(id=run_id)[0]
    run.accuracy = total_results['accuracy']
    run.loss = total_results['loss']
    store_confusion_matrix(total_results, labels, run)

    # update progess
    run.progress = 100
    run.save()

def divide_dataset(dataset):
    # shuffle dataset before division
    dataset_size = len(dataset)
    random.shuffle(dataset)

    # divide dataset into three subsets train, validation and test
    partitions = [ int(dataset_size * 0.7), int(dataset_size * 0.8), dataset_size] 
    return dataset[0 : partitions[0]], dataset[partitions[0] + 1: partitions[1]], dataset[partitions[1] + 1: partitions[2]] 