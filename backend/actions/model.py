from ..submodels.model import *
from backend.actions.dataset import labels_records

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
    print(c_matrix)
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

# 
def store_confusion_matrix(total_results, labels, run):
    confusion_matrix = total_results['confusion_matrix']
    labels_quantity = len(labels)
    i = 0
    for i in range(labels_quantity):
        label = labels[i]
        for j in range(labels_quantity):
            prediction = labels[j]
            LabelsMetrics.objects.create(label=label, prediction=prediction, run=run, value=confusion_matrix[i, j])