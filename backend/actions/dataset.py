
from backend.submodels.dataset import *
from backend.submodels.project import Project
from backend.actions.general import create_dirs_along_path
from django.db.models import Avg, Max, Min, Sum, Count
from django.conf import settings
import matplotlib.image as mpimg
from PIL import Image as pil
import matplotlib.pyplot as plt
from django.core.files.images import get_image_dimensions
import urllib.request
from enum import Enum
import torch.nn
import numpy as np
import os

# returns dataset object by its identification number
def dataset_by_id(dataset_id):
    return Dataset.objects.filter(id=dataset_id)[0]

# upload the project dataset into memory 
def load_dataset(dataitems, labels):
    dataset = []
    for item in dataitems:
        image = pil.open(item.item)
        image = image.resize((64, 64))
        plt.imshow(image)
        image_data = torch.as_tensor(np.asarray(image), dtype=torch.float).permute(2, 1, 0).cuda()
        dataset.append((image_data, labels[item.label.name]))
    return dataset

# convert from image into model input sample format
def image_to_sample(image):
    image = pil.open(image)
    image = image.resize((64, 64))
    plt.imshow(image)
    image_data = torch.as_tensor(np.asarray(image), dtype=torch.float).permute(2, 1, 0).cuda()    
    return image_data.view(1, 3, 64, 64)


# load labels records of project dataset
def labels_dictionary(dataset_id):
    labels_map = {}
    labels_records = DataLabel.objects.filter(dataset=dataset_id)
    for index, label in enumerate(labels_records):
        labels_map[label.name] = index  
    return labels_map

# load items records of project dataset
def items_records(dataset_id):
    return DataItem.objects.filter(dataset_id=dataset_id)

# returns the number of items for praticular dataset
def compute_items_quantity(dataset_id):
    return DataItem.objects.filter(dataset_id=dataset_id).count()

def upload_items_list(label, insert_by, dataset, items_quantity, items_list):
    label = DataLabel.objects.filter(id=label)[0]
    user = User.objects.filter(username=insert_by)[0]
    dataset = Dataset.objects.filter(id=dataset)[0]
    save_to = settings.MEDIA_ROOT + '/datasets/' + str(dataset.id) + '/' + str(label.id) + '/'
    create_dirs_along_path(path=save_to)
    for i in range(items_quantity):
        item = items_list[str(i)]
        item_path = save_to + item.name
        img = pil.open(item.file)
        img.save(item_path, "PNG")
        DataItem.objects.create(label=label, insert_by=user, dataset=dataset, item=item_path)
    
# upload new image-item into server and add corresponding record into database
def add_item(label, insert_by, dataset, image_url):
    label = DataLabel.objects.filter(id=label)[0]
    user = User.objects.filter(username=insert_by)[0]
    dataset = Dataset.objects.filter(id=dataset)[0]
    save_to = settings.MEDIA_ROOT + '/datasets/' + str(dataset.id) + '/' + str(label.id) + '/'
    name = os.path.join(save_to, image_url.split('/')[-1])
    create_dirs_along_path(path=save_to)
    urllib.request.urlretrieve(image_url, name)
    DataItem.objects.create(label=label, insert_by=user, dataset=dataset, item=name)

# load datasets records of praticular user
def user_datasets(username):
    return Dataset.objects.filter(user=username)

# count the number of dataset of user
def user_datasets_quantity(username):
    return Dataset.objects.filter(user=username).count()

# returns number of items for each dataset for praticular user.
def items_per_user_datasets(username):
    records = []
    user_datasets = Dataset.objects.filter(user=username)
    dataset_items_amount = user_datasets.annotate(models.Count('dataitem'))
    for dataset in dataset_items_amount:
        records.append({ 'id': dataset.id, 'name': dataset.name, 'items_quantity': dataset.dataitem__count })
    return records

# load labels records of project dataset
def labels_records(dataset_id):
    return DataLabel.objects.filter(dataset_id=dataset_id)

# returns expanded records of labels for praticular dataset including number of items per label
def labels_expand_data(dataset_id):
    records = []
    labels = items_per_label(dataset_id)
    colors = [ 'red', 'blue', 'green', 'purple' , 'yellow', 'cyan', 'orange' ]
    colors_amount = len(colors)
    for index, label in enumerate(labels):
        records.append({ 'id': label.id, 'name': label.name, 'description': label.description , 'insert_by': label.insert_by.username, 
            'insertion_date': label.insertion_date, 'count': label.items_quantity, 'color' : colors[index % colors_amount] })
    return records

# computes quantity of labels of praticular dataset
def compute_labels_quantity(dataset_id):
    return DataLabel.objects.filter(dataset_id=dataset_id).count()

# computes quantity of items per label for praticular dataset
def items_per_label(dataset_id):
    labels_dataset = DataLabel.objects.filter(dataset_id=dataset_id)
    datalabels = labels_dataset.annotate(items_quantity=models.Count('dataitem'))
    return datalabels

# user contributions items uploading of praticular dataset
def items_per_user(dataset_id):
    users = []
    dataset_items = DataItem.objects.filter(dataset=dataset_id)
    user_grouped = dataset_items.values('insert_by').annotate(items_quantity=Count('insert_by'))
    for record in user_grouped:
        users.append({ 'user': record['insert_by'], 'items_quantity': record['items_quantity']  })
    return users

# computes quantity of items per date for praticular dataset
def items_per_date(dataset_id):
    dates = []
    dataset_items = DataItem.objects.filter(dataset=dataset_id)
    date_grouped = dataset_items.values('insert_date').annotate(items_quantity=Count('insert_date'))
    for record in date_grouped:
        dates.append({ 'date': record['insert_date'], 'items_quantity': record['items_quantity']  })
    return dates

def models_results(dataset_id):
    project_results = []
    projects = Project.objects.filter(dataset=dataset_id)
    for project in projects:
        project_results.append({ 'id': project.id, 'name': project.project_name, 'result': project.result })
    return project_results

def models_count(dataset_id):
    return models_results(dataset_id).count()

# get dataset identification of given project
def get_project_dataset(project_id):
    project = Project.objects.filter(id=project_id)[0]
    return project.dataset