from backend.submodels.user import *
from django.core.mail import send_mail

def authentication(username, password):
    user = User.objects.filter(username=username)
    if user.count() == 0 or user[0].password != password:
        return False
    return True
    
def get_user(username):
    return User.objects.filter(username=username)[0]

def update_user(user_details):
    user = User.objects.filter(username=user_details['username'])[0]
    user.firstname = user_details['firstname']
    user.lastname = user_details['lastname']
    user.email = user_details['email']
    user.occupation = user_details['occupation']
    user.gender = user_details['gender']
    user.save()

def update_image(username, image_url):
    user = User.objects.filter(username=username)[0]
    user.image = image_url
    user.save()

def update_password(user_details):
    user = User.objects.filter(username=user_details['username'])[0]
    if user_details['old_password'] != user.password:
        return False
    user.password = user_details['new_password']
    user.save()
    return True

def user_is_exist(user):
    return User.objects.filter(username=user).count()>0

def users_quantity():
    return User.objects.count()

def send_email(topic, content, name, email):
    full_content = content + "\n\n -------------- \n Name: " + name + "\n Email: " + email + "\n"
    send_mail(topic, full_content, 'ranpikachu@gmail.com', ['ranraboh@gmail.com'], fail_silently=False)