from django.db import models

# represent a user in system, contains personal infromation about the user such as 
# name, email, occupation and so on.
class User(models.Model):
    GENDER = (
        ('m', 'Male'),
        ('f', 'Female'),
    )
    username = models.TextField(primary_key=True,unique=True, blank=False, default='user')
    firstname = models.TextField(unique=False, blank=False, default='user')
    lastname = models.TextField(unique=False, blank=False, default='user')
    gender = models.CharField(max_length=1, choices=GENDER, default='m')
    email = models.EmailField(unique=True, blank=False, default='example@email.com')
    occupation = models.TextField(unique=False, default='undefined occupation')
    image = models.TextField(unique=False, null=True, blank=True, default='./static/images/default-image.jpg')
    join_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return "{}, {} {}".format(self.username, self.email, self.join_date)

def nameFile(instance, filename):
    return '/'.join(['users', instance.user.username, filename])

class UploadImage(models.Model):
    user = models.ForeignKey(User,default=None, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=nameFile, max_length=254, blank=True, null=True)

    def __str__(self):
        return str(self.image)