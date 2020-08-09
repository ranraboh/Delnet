from backend.submodels.post import *
from rest_framework import serializers

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

class GroupFollowedSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupFollowed
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class PostFollowedSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostFollowed
        fields = '__all__'

class PostGroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostGroups
        fields = '__all__'