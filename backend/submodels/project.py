from django.db import models
from .user import User
from .dataset import Dataset

# represent a project in system, contains infromation about the project such as 
# project name, description, code files, user who created it so on.
class Project(models.Model):
    MODEL_TYPE = (
        ('u', 'User Upload'),
        ('c', 'Customizable'),
        ('k', 'Known Model')
    )
    project_name = models.TextField(default='unamed project')
    description = models.TextField(default='none description')
    result = models.FloatField(default=0)
    user = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    project_date = models.DateField(auto_now_add=True)
    dataset = models.ForeignKey(Dataset, default=None, on_delete=models.CASCADE, blank=True, null=True)
    model_type = models.CharField(max_length=1, choices=MODEL_TYPE, default='u')
    best_model_saved = models.FloatField(default=0)    

    def user_upload(self):
        return self.model_type == 'u'

    def popular_model(self):
        return self.model_type == 'k'

    def __str__(self):
        return self.project_name + ": " + self.description + " " + str(self.result) + " " + self.model_type

# used to store the team which take part in each project.
# contains role, presmmisions, join-date and more data for each user in team.
class ProjectTeam(models.Model):
    user = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, default=None, on_delete=models.CASCADE)
    role = models.TextField(default='unknown role')
    presmissions = models.IntegerField(default=1)
    join_date = models.DateField(auto_now_add=True) 

    def __str__(self):
        return self.project.project_name + ": " + self.user.username

def nameFile(instance, filename):
    return '/'.join(['projects', str(instance.project.id) , filename])


class ProjectNotifcation(models.Model):
    topic=models.TextField(unique=False, blank=True, default='')
    user = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, default=None, on_delete=models.CASCADE)
    content=models.TextField(unique=False, blank=True, default='')
    date=models.DateField(auto_now_add=True)
    time=models.TimeField(auto_now_add=True,null=True, blank=True)  


class ProjectCheckList(models.Model):
    executor_task= models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, default=None, on_delete=models.CASCADE)
    task=models.TextField(unique=False, blank=True, default='')
    complete=models.BooleanField(default=False)
    date=models.DateField(auto_now_add=True)
    time=models.TimeField(auto_now_add=True,null=True, blank=True)       

class ProjectFiles(models.Model):
    project = models.ForeignKey(Project,default=None, on_delete=models.CASCADE)
    name = models.TextField(default='unamed')
    type = models.TextField(default='untyped')
    file = models.FileField(upload_to=nameFile, max_length=254, blank=True, null=True)
    insert_by = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    insertion_date = models.DateField(auto_now_add=True)
    main = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.file.name)

