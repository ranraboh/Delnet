from backend.submodels.user import *

def authentication(username, password):
    user = get_user(username)
    if user.username == username and user.password == password:
        return user
    return None 
    
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
    # user.password = user['password']
    user.save()

def update_image(username, image_url):
    user = User.objects.filter(username=username)[0]
    user.image = image_url
    user.save()

def user_is_exist(user):
    return User.objects.filter(username=user).count()>0

def users_quantity():
    return User.objects.count()