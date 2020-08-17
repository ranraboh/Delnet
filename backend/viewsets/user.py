from rest_framework import viewsets, permissions
from rest_framework import generics
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from django.core.files.uploadedfile import InMemoryUploadedFile
from backend.submodels.user import *
from backend.submodels.post import Post
from backend.submodels.project import ProjectNotifcation, ProjectTeam
from backend.submodels.dataset import DatesetNotifcation, DatasetCollectors
from ..serializers.user import *
from backend.actions.user import*
from backend.tasks import run_model, celery_test
import json


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = UserSerializer

    @action(detail=False)
    def user_activeness(self, request, *args, **kwargs):
        user = get_user(kwargs['username'])
        posts_amount = Post.objects.filter(user=user).count()
        datasets_amount = DatasetCollectors.objects.filter(user=user).count()
        projects_amount = ProjectTeam.objects.filter(user=user).count()
        messages_amount = Message.objects.filter(receiver=user).count()
        return Response({ 'posts': posts_amount, 'datasets': datasets_amount, 'projects': projects_amount, 'messages': messages_amount })

    @action(detail=True, methods=['get'], name='Celery Test')
    def celery_test(self, request, pk=None):
        print('celery test')
        celery_test.delay()
        return Response({'status': 'celery test set'})

    @action(detail=True, methods=['post'], name='Send Email')
    def send_email(self, request, pk=None):
        content = request.data['content']
        topic = request.data['topic']
        name = request.data['name']
        email = request.data['email']
        send_email(topic=topic, content=content, name=name, email=email)
        return Response({'status': 'email have sent'})

    # action which update the user credentials
    # /api/users/update
    @action(detail=True, methods=['put'], name='Update Details')
    def update_user(self, request, pk=None):
        update_user(user_details=request.data)
        return Response({'status': 'user credentails set'})

    # action which update the user image
    # /api/users/update
    @action(detail=True, methods=['put'], name='Update Image')
    def update_user_image(self, request, pk=None):
        username = request.data['username']
        image_url = request.data['image']
        update_image(username, image_url)
        return Response({'status': 'user image set'})
    

    # action which update the user image
    # /api/users/update
    @action(detail=True, methods=['put'], name='Update Image')
    def update_user_password(self, request, pk=None):
        success = update_password(request.data)
        if success == False:
            return Response({'success': False, 'error_message': 'your old password is incorrect'})
        return Response({'success': True, 'error_message': 'your password changed successfully'})

    # action which update the user image
    # /api/authentication/
    @action(detail=True, methods=['post'], name='Authentication')
    def authentication(self, request, pk=None):
        success = authentication(username=request.data['username'], password=request.data['password'])
        if success:
            return Response({'success': True, 'error_message': 'welcome to delnet'})    
        return Response({'success': False, 'error_message': 'your username or password is incorrect'})


    @action(detail=False)
    def notifications_header(self, request,  *args, **kwargs):
        query = []
        user = self.kwargs['username']
        projects = ProjectNotifcation.objects.filter(user=user).order_by('-id')[:2]     
        datasets = DatesetNotifcation.objects.filter(user=user).order_by('-id')[:2]     
        for notification in projects:
            query.append({
                'image': notification.user.image, 'content': notification.content, 'topic': notification.topic, 'project': notification.project.project_name, 'date': notification.date
            })
        for notification in datasets:
            query.append({
                'image': notification.user.image, 'content': notification.content, 'topic': notification.topic, 'project': notification.dataset.name, 'date': notification.date
            })
        sorted_query = sorted(query, key = lambda i: i['date'], reverse=True) 
        print (sorted_query)
        return Response(sorted_query[0:2])

    # action which returns the number users in the system
    @action(detail=False)
    def users_quantity(self, request):
        count = users_quantity()
        content = {'quantity': count}
        return Response(content)

    @action(detail=False)
    def user_exist(self, request,  *args, **kwargs):
        user = self.kwargs['username']
        return Response({
            "is_exist":user_is_exist(user)
        })

class ImageViewSet(generics.ListAPIView):
    queryset = UploadImage.objects.all()
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        image_file = request.data['image']
        user = User.objects.filter(username=request.data['user'])[0]
        image = UploadImage.objects.create(user=user ,image=image_file)
        return HttpResponse(json.dumps({'url': str(image.image)}), status=200)

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = MessageSerializer

    @action(detail=True, methods=['post'], name='MessageAdd')
    def messageAdd (self, request, *args, **kwargs):
        receiver = request.data['receiver']
        sender = request.data['sender']
        content = request.data['content']
        Message.objects.create(receiver=receiver,sender=sender,content=content)
        return HttpResponse(json.dumps({'status':"message added successfuly"}), status=200)
    
    @action(detail=False)
    def messages_header(self, request,  *args, **kwargs):
        query = []
        receiver = self.kwargs['receiver']
        messages = Message.objects.filter(receiver=receiver)[:2]     
        for message in messages:
            query.append({
                'image': message.sender.image, 'content': message.content, 'receiver': message.receiver.username, 'sender': message.sender.username
            })
        return Response(query)