from backend.submodels.user import *

def get_user(username):
    return User.objects.filter(username=username)[0]

def update_user(user):
    user = User.objects.filter(username=user['username'])[0]
    user.firstname = user['firstname']
    user.lastname = user['lastname']
    user.email = user['email']
    user.occupation = user['occupation']
    user.gender = user['gender']
    user.image = user['image']
    user.save()

def update_image(username, image_url):
    user = User.objects.filter(username=username)[0]
    user.image = image_url
    user.save()

def users_quantity():
    return User.objects.count()