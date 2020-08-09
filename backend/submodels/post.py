from django.db import models
from .user import User

class Post(models.Model):
    TYPE_CHOICES = (
        ('a', 'Article'),
        ('v', 'Video'),
        ('q', 'Quetstion'),
    )
    title = models.TextField()
    description = models.TextField()
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=1, choices=TYPE_CHOICES, default='a')
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)

class PostFollowed(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    content = models.TextField(default='')

class Group(models.Model):
    name = models.TextField()
    description = models.TextField()

class GroupFollowed(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

class PostGroups(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)


