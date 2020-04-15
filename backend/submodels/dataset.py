from django.db import models
from .user import User

# represent a dataset in system, contains infromation about the dataset such as 
# dataset name, description, creation date, user who created it so on.
class Dataset(models.Model):
    name = models.TextField(default="unamed dataset")
    description = models.TextField(default='none description')
    user = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    create_date = models.DateField(auto_now_add=True)

# represent a label of particular dataset
# contains infromation such as the relevant dataset, label name insertion date, description and so on. 
class DataLabel(models.Model):
    dataset = models.ForeignKey(Dataset, default=None, on_delete=models.CASCADE)
    name = models.TextField(default='unamed label')
    description = models.TextField(default='none description')
    insertion_date = models.DateField(auto_now_add=True)
    insert_by = models.ForeignKey(User, default=None, on_delete=models.CASCADE)

    def __str__(self):
        return  str(self.id) + " " + self.name

# represent a item of particular dataset
# contains infromation such as the relevant dataset, item data, insertion date, description and so on. 
class DataItem(models.Model):
    dataset = models.ForeignKey(Dataset, default=None, on_delete=models.CASCADE)
    item = models.TextField(default='item')
    label = models.ForeignKey(DataLabel, default=None, on_delete=models.CASCADE)
    insert_date = models.DateField(auto_now_add=True)
    insert_by = models.ForeignKey(User, default=None, on_delete=models.CASCADE)

# used to store the team which take part in building the dataset.
# contains role, presmmisions, join-date and more data for each user in team.
class DatasetCollectors(models.Model):
    dataset = models.ForeignKey(Dataset, default=None, on_delete=models.CASCADE)
    user = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    role = models.TextField(default='unknown role')
    presmissions = models.IntegerField(default=1)
    join_date = models.DateField(auto_now_add=True)
