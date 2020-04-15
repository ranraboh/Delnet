from ..submodels.project import *
from ..submodels.user import User

def update_project(project_data):
    project = Project.objects.filter(id=project_data['id'])[0]
    project.project_name = project_data['name']
    project.description = project_data['description']
    project.result = project_data['result']
    project.dataset = Dataset.objects.filter(id=project_data['dataset'])[0]
    project.save()

def project_files_quantity(project_id):
    return ProjectFiles.objects.filter(project=project_id).count()

def get_file_content(file_id):
    file_object = ProjectFiles.objects.filter(id=file_id)[0].file
    file_object.open(mode='rb') 
    content = b"\n".join(line.strip() for line in file_object)  
    return content

def update_file_content(file_id, content):
    file_object = ProjectFiles.objects.filter(id=file_id)[0].file
    file_object.open(mode='w')
    file_object.write(content)
    file_object.close()

def upload_file(files_quantity, files_list, project_id, username):
    files_list = []
    for i in range(files_quantity):
        files_list.append(request.data[str(i)])
    project = Project.objects.filter(id=project_id)[0]
    user = User.objects.filter(username=username)[0]
    for file_model in files_list: 
        ProjectFiles.objects.create(project=project ,file=file_model, insert_by=user, name=file_model.name, type=file_model.content_type)