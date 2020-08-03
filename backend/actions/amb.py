from django.conf import settings
import json
import os
from backend.actions.general import create_dirs_along_path
from backend.submodels.model import KnownModels, ProjectKnownModel 

# get the path of the file contains full details on model layers
def get_file_layers(project_id):
    return settings.MEDIA_ROOT + "/projects/" + str(project_id) + '/layers.txt'

# return set of all known models
def get_known_models():
    return KnownModels.objects.all()

# map preticular project to a known model
def map_project_known_model(project, known_model):
    known_model = KnownModels.objects.filters(name=known_model)[0]
    return ProjectKnownModel.objects.create(project=project, known_model=known_model)

# save layers info in dedicated file
def save_layers(layers, file_path):
    create_dirs_along_path(file_path)
    with open(file_path, 'w+') as outfile:
        json.dump(layers, outfile)

# read the model layers full inforamtion
def read_layers(file_path):
    error_return = { 'valid': False }
    # in case the file don't exist 
    if not os.path.exists(file_path):
        return error_return

    # read information from file
    with open(file_path) as json_file:
        try:
            data = json.load(json_file)
            return { 'valid': True, 'layers': data }        
        except:

            return error_return


def get_known_model(known_model):
    return KnownModels.objects.filter(id=known_model)[0]

def get_project_known_model(project):
    return ProjectKnownModel.objects.filter(project=project)[0].known_model

