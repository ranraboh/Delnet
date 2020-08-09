from rest_framework import viewsets, permissions
from rest_framework import generics
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from django.core.files.uploadedfile import InMemoryUploadedFile
from ..submodels.user import *
from ..serializers.user import *
from backend.actions.user import*

import json


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = UserSerializer

    # action which update the user credentials
    # /api/users/update
    @action(detail=True, methods=['put'], name='Update Details')
    def update_user(self, request, pk=None):
        update_user(user=request.data)
        return Response({'status': 'user credentails set'})

    # action which update the user image
    # /api/users/update
    @action(detail=True, methods=['put'], name='Update Image')
    def update_user_image(self, request, pk=None):
        username = request.data['username']
        image_url = request.data['image']
        update_user_image(username, image_url)
        return Response({'status': 'user image set'})

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
        print(request.data)
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
        for meessage in messages:
            query.append({
                'image': message.receiver.image, 'content': message.content, 'receiver': message.receiver.username
            })
        return Response(query)
    