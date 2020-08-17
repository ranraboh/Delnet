from backend.submodels.dataset import DatesetNotifcation
from backend.submodels.project import ProjectNotifcation
from backend.actions.project import get_project
from backend.actions.user import get_user
from backend.actions.dataset import get_dataset
import datetime

####################### Project #############################
def notify_project_settings_change(project_id, username, project_name, description):
    project = get_project(project_id)
    user = get_user(username)
    fields = ''
    modifications = ''
    if project.project_name == project_name and project.description == description:
        return
    elif project.project_name != project_name and project.description == description:
        content = "the project name has been changed into " + "\"" + project.project_name + "\"" 
    elif project.project_name == project_name and project.description != description:
        content = "a new up-to-date description has been provided for the project : \" " + project.description + "\""
    else:
        content = "the following fields project name, description has been changed into " + project.project_name + ", " + project.description + " respectively"
    ProjectNotifcation.objects.create(topic='general settings has been modified', user=user, project=project, content=content)

def notify_dataset_changed(project, username, dataset, dataset_old):
    user = get_user(username)
    if dataset == None and dataset_old != None:
        old_dataset_object = get_dataset(dataset_old)
        ProjectNotifcation.objects.create(topic='dataset is longer associated with the project', user=user, project=project, 
            content="the dataset " + old_dataset_object.name + " is not longer associate with this project. the project has no official dataset to train on")
        return
    if (dataset == None and dataset_old == None) or (dataset.id == dataset_old):   
        return
    ProjectNotifcation.objects.create(topic='dataset project has been changed', user=user, project=project, 
        content="the dataset of project " + project.project_name + " has been changed into " + dataset.name)

def notify_project_type(project, username, old_type):
    print (project.model_type, old_type)
    if project.model_type == old_type:
        return
    content = "the project build type has been changed from " + old_type + " to " + project.model_type + ". "
    if project.model_type == 'k':
        content = "you are able to select a well known model that fit your classification problem"
    elif project.model_type == 'c':
        content = "you are able to build the model architecture through a friendly interface. you only need to define the architecture of the neural network and the application automatically generate the code for you"
    else:
        content = "you are able to upload your own code"
    user = get_user(username)
    ProjectNotifcation.objects.create(topic='project build type has been changed', user=user, project=project, content=content)

def notify_size_change(project, username, width, height):
    if project.width == width and project.height == height:
        return
    user = get_user(username)
    ProjectNotifcation.objects.create(topic='the dataset images size has been changed', user=user, project=project, 
        content="the dataset images used as samples to train the model on has been resized to (" + str(project.height) + ", " + str(project.width) + ")")

def notify_division_rule_change(project, username, train_percentage, dev_percentage, test_percentage):
    if project.train_percentage == train_percentage and project.dev_percentage == dev_percentage and project.test_percentage == test_percentage:
        return
    user = get_user(username)
    ProjectNotifcation.objects.create(topic='the dataset images size has been changed', user=user, project=project, 
        content="the dataset samples division rule has been changed. " + str(project.train_percentage) + "% of it used to train the model on, " + str(project.dev_percentage) + "% of it used as validation set and " + str(project.test_percentage) + "% of it used as test set to evaluate the model on.")

def notify_file_delete(project, username, file_name):
    user = get_user(username)
    ProjectNotifcation.objects.create(topic="a file code has been removed", user=user, project=project, 
        content="a code file named " + file_name + " has been removed")

def notify_file_upload(project_id, username, quantity, files):
    project = get_project(project_id)
    user = get_user(username)
    names = ''
    for i in range(quantity):
        names = names + files[str(i)].name + ", "
    ProjectNotifcation.objects.create(topic='new files has been upload', user=user, project=project, 
        content=str(quantity) + " new code files named " + names[:-2] + " has been uploaded")

def file_edit(project, username, file_name):
    user = get_user(username)
    ProjectNotifcation.objects.create(topic='code file has been modified', user=user, project=project, 
        content="the code file denoted as " + file_name + " has been modified by project team member")

def file_delete(settings):
    project = get_project(settings.project)
    user = get_user(settings.username)
    ProjectNotifcation.objects.create(topic='code file has been removed by project team member', user=user, project=project, 
        content="the code file denoted as " + settings.file_name + " has been removed")

def notify_add_task(project_id, username, task):
    project = get_project(project_id)
    user = get_user(username)
    ProjectNotifcation.objects.create(topic='a new task has been inserted', user=user, project=project, 
        content="the new task \"" + task + "\" has been added into project check list" )

def notify_task_assigned(project, username, task):
    user = get_user(username)
    ProjectNotifcation.objects.create(topic='task assigned into project team member', user=user, project=project, 
        content="the task \"" + task + "\" has been assigned to " + user.username )

def notify_task_complete(project, username, task):
    user = get_user(username)
    ProjectNotifcation.objects.create(topic='task is complete', user=user, project=project, 
        content="the task \"" + task + "\" accomplished" )

def model_architecture(settings):
    project = get_project(settings.project)
    user = get_user(settings.username)
    ProjectNotifcation.objects.create(topic='model architecture has been changed', user=user, project=project, 
        content="the model architecture has been changed, you can view the changes in architecture tab " )

def train_model(settings):
    project = get_project(settings.project)
    user = get_user(settings.username)
    ProjectNotifcation.objects.create(topic='a new instance of model has been trained', user=user, project=project, 
        content="you can view the outcomes, analysis and different metrics to evaluate the new trained model")

def train_model(settings):
    project = get_project(settings.project)
    user = get_user(settings.username)
    ProjectNotifcation.objects.create(topic='a new instance of model has been trained', user=user, project=project, 
        content="you can view the outcomes, analysis and different metrics to evaluate the new trained model")

def notify_new_member(project_id, username, role):
    project = get_project(project_id)
    user = get_user(username)
    ProjectNotifcation.objects.create(topic='a new member has been recuited', user=user, project=project, 
        content="a new member " + username + " has been added into the project team, and his role is: " + role)

def notify_delete_member(project, user):
    ProjectNotifcation.objects.create(topic='a team member has been removed', user=user, project=project, 
        content="the user " + user.username + " has been removed off the project team members")

####################### Dataset #############################
def notify_dataset_settings_change(dataset_id, username, name, description):
    dataset = get_dataset(dataset_id)
    user = get_user(username)
    fields = ''
    modifications = ''
    print (dataset.name, name, dataset.description, description)
    if dataset.name == name and dataset.description == description:
        return
    elif dataset.name != dataset and dataset.description == description:
        content = "the dataset name has been changed into " + "\"" + dataset.name + "\"" 
    elif dataset.name == name and dataset.description != description:
        content = "a new up-to-date description has been provided for the dataset : \" " + dataset.description + "\""
    else:
        content = "the following fields dataset name, description has been changed into " + dataset.name + ", " + dataset.description + " respectively"
    DatesetNotifcation.objects.create(topic='general settings has been modified', user=user, dataset=dataset, content=content)

def notify_public_view(dataset_id, username, public_view, old_public_view):
    if public_view == old_public_view:
        return
    dataset = get_dataset(dataset_id)
    user = get_user(username)
    if public_view == True:
        DatesetNotifcation.objects.create(topic='dataset enabled for public view', user=user, dataset=dataset, 
            content="the dataset settings has been changed and enabled for the public users to view the dataset contents")
    else:
        DatesetNotifcation.objects.create(topic='dataset is disabled for public view', user=user, dataset=dataset, 
            content="the dataset settings has been changed and now the public users are no longer able to view the dataset contents")

def notify_enable_offers(dataset_id, username, enable_offer, old_enable_offer):
    if enable_offer == old_enable_offer:
        return
    dataset = get_dataset(dataset_id)
    user = get_user(username)
    if enable_offer == True:
        DatesetNotifcation.objects.create(topic='dataset enabled offer samples option', user=user, dataset=dataset, 
            content="the dataset settings has been changed and enabled the system to offer its samples to another dataset owners.")
    else:
        DatesetNotifcation.objects.create(topic='dataset is disabled for offer samples option', user=user, dataset=dataset, 
            content="the dataset settings has been changed and now the system is no longer able to offer its samples to another dataset owners.")

def notify_new_collector(dataset_id, username, role):
    dataset = get_dataset(dataset_id)
    user = get_user(username)
    DatesetNotifcation.objects.create(topic='a new collector has been recuited', user=user, dataset=dataset, 
        content="a new member " + username + " has been added into the project team, and his role is: " + role)

def notify_delete_collector(dataset, user):
    DatesetNotifcation.objects.create(topic='a team collector has been removed', user=user, dataset=dataset, 
        content="the user " + user.username + " has been removed off the dataset collectors team")

def dataset_new_member(settings):
    dataset = get_dataset(settings.dataset)
    user = get_user(settings.username)
    DatesetNotifcation.objects.create(topic='a new collector has been recuited', user=user, dataset=dataset, 
        content="a new member " + settings.name + " has been added into the dataset team, and his role is: " + settings.role)

def dataset_delete_member(settings):
    dataset = get_dataset(settings.dataset)
    user = get_user(settings.username)
    DatesetNotifcation.objects.create(topic='a team member has been removed', user=user, dataset=dataset, 
        content="the user " + settings.name + " has been removed off the dataset team members")

def new_label(settings):
    dataset = get_dataset(settings.dataset)
    user = get_user(settings.username)
    DatesetNotifcation.objects.create(topic='a new label has been added', user=user, dataset=dataset, 
        content="a new label" + settings.name + " has been added into the dataset, currently the label has no items associated with it. it is importent to add or map items with the new label")

def extract_quantity(content):
    quantity = 0
    for i in range(2, len(content)):
        if content[i] < '0' or content[i] > '9':
            break
        quantity = quantity * 10 + int(content[i])
    return quantity

def notify_new_items(dataset_id, username, quantity, label):
    dataset = get_dataset(dataset_id)
    user = get_user(username)
    today_min = datetime.datetime.combine(datetime.date.today(), datetime.time.min)
    today_max = datetime.datetime.combine(datetime.date.today(), datetime.time.max)
    old_notification = DatesetNotifcation.objects.filter(topic='new item has been appended', user=user, dataset=dataset, date__range=(today_min, today_max), content__contains=label)
    print (DatesetNotifcation.objects.filter(topic='new item has been appended', user=user, dataset=dataset, date__range=(today_min, today_max), content__contains=label).count(), DatesetNotifcation.objects.filter(topic='new item has been appended', user=user, dataset=dataset, date__range=(today_min, today_max)).count(), DatesetNotifcation.objects.filter(topic='new item has been appended', user=user, dataset=dataset, content__contains=label).count())
    if old_notification.count() >= 1:
        quantity = quantity + 1
        old_notification[0].delete()
    old_notification = DatesetNotifcation.objects.filter(topic='new items has been uploaded', user=user, dataset=dataset, date__range=(today_min, today_max), content__contains=label)
    if old_notification.count() >= 1:
        quantity = quantity + extract_quantity(old_notification[0].content)
        old_notification[0].delete()
    if quantity == 1:
        DatesetNotifcation.objects.create(topic='new item has been appended', user=user, dataset=dataset, 
        content="a new sample labeled as " + label + " has been attached into the dataset")
    else:
        DatesetNotifcation.objects.create(topic='new items has been uploaded', user=user, dataset=dataset, 
            content="a " + str(quantity) + " new samples labeled as " + label + " has been attached into the dataset")

def notify_new_unlabeled_items(dataset_id, username, quantity):
    dataset = get_dataset(dataset_id)
    user = get_user(username)
    today_min = datetime.datetime.combine(datetime.date.today(), datetime.time.min)
    today_max = datetime.datetime.combine(datetime.date.today(), datetime.time.max)
    old_notification = DatesetNotifcation.objects.filter(topic='new unlabeled item has been appended', user=user, dataset=dataset, date__range=(today_min, today_max))
    if old_notification.count() >= 1:
        quantity = quantity + 1
        old_notification[0].delete()
    old_notification = DatesetNotifcation.objects.filter(topic='new unlabeled items has been uploaded', user=user, dataset=dataset, date__range=(today_min, today_max))
    if old_notification.count() >= 1:
        quantity = quantity + extract_quantity(old_notification[0].content)
        old_notification[0].delete()
    if quantity == 1:
        DatesetNotifcation.objects.create(topic='new unlabeled item has been appended', user=user, dataset=dataset, 
        content="a new unlabeled sample has been attached into the dataset, you can tag it and more unlabeled samples using interactive and friendly interface through Tag Samples tab")
    else:
        DatesetNotifcation.objects.create(topic='new unlabeled items has been uploaded', user=user, dataset=dataset, 
            content="a " + str(quantity) + " new unlabeled samples has been attached into the dataset, you can tag them using interactive and friendly interface through Tag Samples tab")

def notify_tag_items(dataset_id, username, quantity, label):
    dataset = get_dataset(dataset_id)
    user = get_user(username)
    today_min = datetime.datetime.combine(datetime.date.today(), datetime.time.min)
    today_max = datetime.datetime.combine(datetime.date.today(), datetime.time.max)
    old_notification = DatesetNotifcation.objects.filter(topic='new item has been tagged', user=user, dataset=dataset, date__range=(today_min, today_max), content__contains=label)
    if old_notification.count() >= 1:
        quantity = quantity + 1
        old_notification[0].delete()
    old_notification = DatesetNotifcation.objects.filter(topic='new items has been tagged', user=user, dataset=dataset, date__range=(today_min, today_max), content__contains=label)
    if old_notification.count() >= 1:
        quantity = quantity + extract_quantity(old_notification[0].content)
        old_notification[0].delete()
    if quantity == 1:
        DatesetNotifcation.objects.create(topic='new item has been tagged', user=user, dataset=dataset, 
        content="a new sample has been labeled as " + label + " and attached into the dataset collection")
    else:
        DatesetNotifcation.objects.create(topic='new items has been tagged', user=user, dataset=dataset, 
            content="a " + str(quantity) + " samples has been labeled as " + label + " and attached into the dataset")

def notify_offer_items(dataset_id, username, quantity, label):
    dataset = get_dataset(dataset_id)
    user = get_user(username)
    today_min = datetime.datetime.combine(datetime.date.today(), datetime.time.min)
    today_max = datetime.datetime.combine(datetime.date.today(), datetime.time.max)
    old_notification = DatesetNotifcation.objects.filter(topic='new item has been appended', user=user, dataset=dataset, date__range=(today_min, today_max), content__contains=label)
    if old_notification.count() >= 1:
        quantity = quantity + 1
        old_notification[0].delete()
    old_notification = DatesetNotifcation.objects.filter(topic='new items has been appended', user=user, dataset=dataset, date__range=(today_min, today_max), content__contains=label)
    if old_notification.count() >= 1:
        quantity = quantity + extract_quantity(old_notification[0].content)
        old_notification[0].delete()
    if quantity == 1:
        DatesetNotifcation.objects.create(topic='new item has been appended', user=user, dataset=dataset, 
        content="a new sample has been attached into the dataset collection through offer samples tool. the new item was labeled as " + label + " and attached into the dataset collection")
    else:
        DatesetNotifcation.objects.create(topic='new items has been appended', user=user, dataset=dataset, 
            content="a " + str(quantity) + " new samples has been attached into the dataset collection through offer samples tool. the new item was labeled as " + label + " and attached into the dataset collection")

def notify_items_removed(dataset, username, label):
    user = get_user(username)
    quantity = 1
    today_min = datetime.datetime.combine(datetime.date.today(), datetime.time.min)
    today_max = datetime.datetime.combine(datetime.date.today(), datetime.time.max)
    old_notification = DatesetNotifcation.objects.filter(topic='an item has been removed', user=user, dataset=dataset, date__range=(today_min, today_max), content__contains=label)
    if old_notification.count() >= 1:
        quantity = quantity + 1
        old_notification[0].delete()
    old_notification = DatesetNotifcation.objects.filter(topic='items has been removed', user=user, dataset=dataset, date__range=(today_min, today_max), content__contains=label)
    if old_notification.count() >= 1:
        quantity = quantity + extract_quantity(old_notification[0].content)
        old_notification[0].delete()
    if quantity == 1:
        DatesetNotifcation.objects.create(topic='an item has been removed', user=user, dataset=dataset, 
        content="a new sample has been attached into the dataset collection through offer samples tool. the new item was labeled as " + label + " and attached into the dataset collection")
    else:
        DatesetNotifcation.objects.create(topic='items has been removed', user=user, dataset=dataset, 
            content="a " + str(quantity) + " samples labeled as " + label + " has been removed from the dataset collection")

def notify_new_label(dataset_id, username, label):
    dataset = get_dataset(dataset_id)
    user = get_user(username)
    DatesetNotifcation.objects.create(topic='a new label has been added', user=user, dataset=dataset, 
        content="a new label named as " + label + " has been appended into the dataset, currently the label has no items associated with it. it is importent to add or map items with the new label")

def new_unlabeled_items(settings):
    dataset = get_dataset(settings.dataset)
    user = get_user(settings.username)
    DatesetNotifcation.objects.create(topic='new items has been appended', user=user, dataset=dataset, 
        content="a " + settings.quantity + " new samples with undefined label has been attached into the dataset, you can tag them using interactive and friendly interface through Tag Samples tab ")
