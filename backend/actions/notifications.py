from backend.submodels.dataset import DatesetNotifcation
from backend.submodels.project import ProjectNotifcation
from backend.actions.project import get_project
from backend.actions.user import get_user
from backend.actions.dataset import get_dataset

####################### Project #############################
def notify_project_settings_change(settings, oldsettings):
    project = get_project(settings.project)
    user = get_user(settings.username)
    fields = ''
    modifications = ''
    if settings.name != oldsettings.name:
        fields = fields + "project name, "
        modifications = modifications + settings.name + ", "
    if settings.description == oldsettings.description:
        fields = fields + "description, "
        modifications = modifications + settings.description + ", "
    if fields == '':
        return
    ProjectNotifcation.objects.create(topic='settings in ' + project.project_name + ' has been modified', user=user, project=project, 
        content='the fields ' + fields[:-2] + " in project" + oldsettings.name + ' has been changed into ' + modifications + " respictively")

def project_dataset_changed(settings):
    project = get_project(settings.project)
    user = get_user(settings.username)
    dataset = get_dataset(settings.dataset)
    ProjectNotifcation.objects.create(topic='dataset project has been changed', user=user, project=project, 
        content="the dataset of project " + project.project_name + " has been changed into " + dataset.name)

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
def notify_dataset_settings_change(settings, oldsettings):
    dataset = get_dataset(settings.dataset)
    user = get_user(settings.username)
    fields = ''
    modifications = ''
    if settings.name != oldsettings.name:
        fields = fields + "dataset name, "
        modifications = modifications + settings.name + ", "
    if settings.description == oldsettings.description:
        fields = fields + "description, "
        modifications = modifications + settings.description + ", "
    if fields == '':
        return
    DatesetNotifcation.objects.create(topic='settings in ' + dataset.name + ' has been modified', user=user, dataset=dataset, 
        content='the fields ' + fields[:-2] + " in project" + oldsettings.name + ' has been changed into ' + modifications + " respictively")

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

def new_items(settings):
    dataset = get_dataset(settings.dataset)
    user = get_user(settings.username)
    DatesetNotifcation.objects.create(topic='new items has been appended', user=user, dataset=dataset, 
        content="a " + settings.quantity + " new samples labeled as " + settings.label + " has been attached into the dataset")

def new_unlabeled_items(settings):
    dataset = get_dataset(settings.dataset)
    user = get_user(settings.username)
    DatesetNotifcation.objects.create(topic='new items has been appended', user=user, dataset=dataset, 
        content="a " + settings.quantity + " new samples with undefined label has been attached into the dataset, you can tag them using interactive and friendly interface through Tag Samples tab ")

def new_unlabeled_items(settings):
    dataset = get_dataset(settings.dataset)
    user = get_user(settings.username)
    DatesetNotifcation.objects.create(topic='new items has been appended', user=user, dataset=dataset, 
        content="a " + settings.quantity + " new samples with undefined label has been attached into the dataset, you can tag them using interactive and friendly interface through Tag Samples tab ")
