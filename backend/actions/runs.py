from django.db.models import Avg, Max, Min, Sum, Count
from backend.submodels.model import *
from backend.actions.dataset import labels_records
from backend.actions.general import float_precision
from backend.actions.general import create_dirs_along_path
from django.conf import settings


# returns the results of specific run
def get_run_results(run_code):
    return RunResult.objects.filter(run=run_code)

# returns the path of file storing the best or the lastest model parameters 
def get_run_file(project_id, state):
    path = settings.MEDIA_ROOT + "/projects/" + str(project_id) + "/runs/" + state
    create_dirs_along_path(path)
    return path

# returns run records of praticular project 
def project_run_records(project, finished):
    runs_records = ProjectRuns.objects.filter(project=project)
    if finished == True:
        return runs_records.filter(progress=100)
    return runs_records

# returns full results for all runs of praticular project
def project_run_results(project):
    results = {}
    run_records = project_run_records(project, finished=True)
    for record in run_records:
        results[record.id] = { 't': {}, 'd': {} }
        for result in RunResult.objects.filter(run_id=record.id):
            results[record.id][result.set][result.epoch] = result
    return results

# returns confusion matrix of praticular run
def confusion_matrix(run_code):
    # read records from database
    confusion_matrix = {}
    records = LabelsMetrics.objects.filter(run=run_code)   
    
    # arrange data in matrix/dictionary
    for record in records:
        confusion_matrix[(record.label, record.prediction)] = record.value
    return confusion_matrix

def confusion_matrix_records(run_code):
    # read confusion matrix records from database
    records = LabelsMetrics.objects.filter(run=run_code)   
    return records

# returns recall evaluation of praticular run
def recall(run_code):
    # read crucial data to compute recall score
    c_matrix = confusion_matrix(run_code)
    dataset = dataset_of_run(run_code)
    labels = labels_records(dataset.id)

    # compute recall using confusion matrix
    recall = []
    for label in labels:
        numerator = c_matrix[(label, label)]
        denomirator = 0
        for prediction in labels:
            denomirator += c_matrix[(label, prediction)]
        if denomirator == 0:
            recall.append({'name': label.name, 'recall': 0})
        else:
            recall.append({'name': label.name, 'recall': (numerator / denomirator) * 100 } )
    return recall
        
# returns precision evaluation of praticular run
def precision(run_code):
    # read data to help compute the recall
    c_matrix = confusion_matrix(run_code)
    dataset = dataset_of_run(run_code)
    labels = labels_records(dataset.id)

    # compute recall using confusion matrix
    precision = []
    for label in labels:
        numerator = c_matrix[(label, label)]
        denomirator = 0
        for prediction in labels:
            denomirator += c_matrix[(prediction, label)]
        if denomirator == 0:
            precision.append({'name': label.name, 'precision': 0})
        else:
            precision.append({'name': label.name, 'precision': (numerator / denomirator) * 100 } )
    return precision

# returns f1 evaluation of praticular run
def f_one(run_code):
    f_scores = []
    recall_results = recall(run_code=run_code)
    precision_results = precision(run_code=run_code)
    for p_label, r_label in zip(precision_results, recall_results):
        if r_label['recall'] + p_label['precision'] != 0:
            score = 2 * (r_label['recall'] * p_label['precision']) / (r_label['recall'] + p_label['precision'])
        else:
            score = 0
        f_scores.append({ 'name': r_label['name'], 'score': score })
    return f_scores


# returns dataset object of praticular run
def dataset_of_run(run_code):
    run = ProjectRuns.objects.filter(id=run_code)[0]
    return run.project.dataset

# store confusion matrix results in database
def store_confusion_matrix(total_results, labels, run):
    confusion_matrix = total_results['confusion_matrix']
    labels_quantity = len(labels)
    i = 0
    for i in range(labels_quantity):
        label = labels[i]
        for j in range(labels_quantity):
            prediction = labels[j]
            LabelsMetrics.objects.create(label=label, prediction=prediction, run=run, value=confusion_matrix[i, j])

def accuracy_range(project):
    range = [
        { 'range':'0-10', 'frequency':0 }, { 'range':'10-20', 'frequency':0 },
        { 'range':'20-30', 'frequency':0 }, { 'range':'30-40', 'frequency':0 },
        { 'range':'40-50', 'frequency':0 }, { 'range':'50-60', 'frequency':0 },
        { 'range':'60-70', 'frequency':0 }, { 'range':'70-80', 'frequency':0 },
        { 'range':'80-90', 'frequency':0 }, { 'range':'90-100', 'frequency':0 },
    ]
    run_records = project_run_records(project, True)
    for run_record in run_records:
        accuracy = run_record.accuracy * 100
        index = int(accuracy / 10)
        range[index]['frequency'] += 1
    return range

# get favorite value for given hyper-parameter
def favorite_parameter(results, category):
    grouped_results = results.values(category).annotate(favorite=Count(category)).order_by('-favorite').first()
    return {
        category: grouped_results[category],
        'count': grouped_results['favorite'],
    }

"""
methods which analyze the run results behavior
"""
# check if loss value increased during the train process
def trainLossIncrease(train_results):
    increase = 0
    # count the number of epoches the loss have increased
    for epoch in range(len(train_results) - 1):
        if train_results[epoch + 1].loss > train_results[epoch].loss:
            increase += 1
    
    # returns true if 30% percent of epoches the loss have increased
    # this quantity of loss upwards is raising a red flag
    increase_probability = increase / len(train_results)
    return increase_probability > 0.3 

# check if the effective training has stopped
# that is, at some point in the training process, The loss dropped at a minimal rate or stopped to decrease
def effectiveTrainingStopped(train_results):
    stopped_reduce = False
    increase_in_row = 0
    for epoch in range(len(train_results) - 1):
        if increase_in_row == 3:
            return { 'etStopped': True, 'epochStopped': epoch - 3 }
        if train_results[epoch + 1].loss + 0.001 >= train_results[epoch].loss:
            increase_in_row = increase_in_row + 1
    return { 'etStopped': False }

# check if the loss slightly decrease,
# i.e the loss value has dropped in minimal rate
def lossSlightlyDecrease(train_results):
    slight_decrease = 0
    epochs = len(train_results)

    # count the number of epochs the loss has dropped at minimal rate 
    for epoch in range(epochs - 1):
        if abs(train_results[epoch + 1].loss - train_results[epoch].loss) <= 0.05:
            slight_decrease = slight_decrease + 1
    
    # if the loss dropped slightly in 70% of the epoches return true
    if slight_decrease / epochs > 0.7:
        return True
    return False

# evaluate if the model have reach state of overfitting
def compute_overfitting(train_results, dev_results):
    dev_upward = 0
    epochs = len(train_results)
    # if train total accuracy less then 90 then the model is not is overfitting state
    if train_results[epochs - 1].accuracy_rate < 0.9 or dev_results[epochs - 1].accuracy_rate > 0.9:
        return False
    
    # count the number of upwards in dev results during evaluation process
    for epoch in range(epochs - 1):
        # if the number of upwards is greater then 3 while the train accuracy is top-notch
        # implies the model is in overfitting state 
        if dev_upward >= 3:
            return True
        if dev_results[epoch + 1].loss >= dev_results[epoch].loss:
            dev_upward = dev_upward + 1
        else: 
            dev_upward = 0
    return False

# evaluate if the model have reach state of underfitting
def compute_underfitting(train_results):
    # if the model didn't reach accuracy rate of 85 percent over the test set
    if train_results[len(train_results) - 2].accuracy_rate < 0.85:
        return True
    return False

def fitting_rate(self, project):
    # compute number of overfitting and underfitting
    runs = project_run_results(project)
    runs_quantity = len(runs)
    for _, run in runs.items():
        train = run['t']
        dev = run['d']
        if compute_overfitting(train, dev) == True:
            overfitting = overfitting + 1
        elif compute_underfitting(train) == True:
            underfitting = underfitting + 1
    return { 
        'overfitting': {
            'rate': overfitting / runs_quantity,
            'quantity': overfitting
        },
        'underfitting': {
            'rate': underfitting / runs_quantity,
            'quantity': underfitting
        }
    }

def model_statics():
    # number of layers, most used activation function, use count for each module, etc..
    pass

''''
def parameters_used(parameter):
    grouped_results = results.values(category).annotate(favorite=Count(category)).order_by('-favorite')
    return grouped_results
'''