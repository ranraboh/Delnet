from rest_framework import serializers
from ..submodels.user import User, UploadImage, Message

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadImage
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'