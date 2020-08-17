from django.db import models
from .user import User
from .project import Project
from .dataset import DataLabel

class LossTypes(models.Model):
    loss_type = models.TextField(null=False, blank=False)
    def __str__(self):
        return self.loss_type

class Optimizer(models.Model):
    optimizer = models.TextField(null=False, blank=False)
    def __str__(self):
        return self.optimizer

class KnownModels(models.Model):
    name = models.TextField()
    description = models.TextField()
    image = models.TextField()
    def __str__(self):
        return self.name

# used to store the results for each run in the system.
# the project team can evaluate their algorithm performance and 
# monitor their progress over time
class ProjectRuns(models.Model):
    # general info about run
    project = models.ForeignKey(Project,default=None, on_delete=models.CASCADE)
    user = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    progress = models.FloatField(blank=False)

    # hyper parameters
    batch_size = models.IntegerField(blank=False)
    epochs = models.IntegerField(blank=False)
    learning_rate = models.FloatField(blank=False)
    weight_decay = models.FloatField(blank=False)
    loss_type = models.ForeignKey(LossTypes, default=None, on_delete=models.CASCADE)
    optimizer = models.ForeignKey(Optimizer, default=None, on_delete=models.CASCADE)

    # total metrics results (over test set)
    accuracy = models.FloatField(default=0)
    loss = models.FloatField(default=0)

    def __str__(self):
        return str(self.id) + " "  + self.project.project_name

class LabelsMetrics(models.Model):
    label = models.ForeignKey(DataLabel,default=None, on_delete=models.CASCADE, related_name="label")
    prediction = models.ForeignKey(DataLabel, default=None, on_delete=models.CASCADE, related_name="prediction")
    run = models.ForeignKey(ProjectRuns,default=None, on_delete=models.CASCADE)
    value = models.FloatField(default=0)

class RunResult(models.Model):
    SET_CHOICES = (
        ('t', 'Train Set'),
        ('d', 'Dev Set'),
    )
    run = models.ForeignKey(ProjectRuns, default=None, on_delete=models.CASCADE)
    set = models.CharField(max_length=1, choices=SET_CHOICES, default='t')
    epoch = models.IntegerField(blank=False)
    accuracy_rate = models.FloatField(blank=False)
    loss = models.FloatField(blank=False)

    def __str__(self):
        return 'run: ' + str(self.run.id) + ' set: ' + self.set + ' epoch: ' + str(self.epoch) + ' results: ' + str(self.accuracy_rate) + " , " + str(self.loss)

class ProjectKnownModel(models.Model):
    project = models.ForeignKey(Project,default=None, on_delete=models.CASCADE)
    known_model = models.ForeignKey(KnownModels, default=None, on_delete=models.CASCADE)