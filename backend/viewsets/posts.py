from rest_framework import viewsets, permissions
from rest_framework import generics
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
import json

# import data objects/models
from backend.submodels.post import *
from backend.serializers.posts import *
from backend.actions.posts import *

class PostsViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = PostsSerializer

    @action(detail=True, methods=['post'], name='Post group assigned')
    def post_group_assigned(self, request, *args, **kwargs):
        groups = request.data['groups']
        post = request.data['id']
        post_assigns_groups(post, groups)
        return Response({'status': 'given groups has been associated with the post'})

    @action(detail=True, methods=['get'], name='Get User Posts')
    def user_posts(self, request, *args, **kwargs):
        user = self.kwargs['username']
        page = int(self.kwargs['page'])
        user_posts = Post.objects.filter(user=user)
        return Response(getPostsDetails(user_posts, page - 1, user))

    @action(detail=True, methods=['get'], name='Get Group Posts')
    def group_posts(self, request, *args, **kwargs):
        page = int(self.kwargs['page'])
        group = self.kwargs['group']
        user = self.kwargs['username']
        return Response(getGroupPosts(group, page - 1, user, 'a'))
    
    @action(detail=True, methods=['get'], name='Get Group Videos')
    def group_videos(self, request, *args, **kwargs):
        page = int(self.kwargs['page'])
        group = self.kwargs['group']
        user = self.kwargs['username']
        return Response(getGroupPosts(group, page - 1, user, 'v'))

    @action(detail=True, methods=['get'], name='Get Group Questions')
    def group_questions(self, request, *args, **kwargs):
        page = int(self.kwargs['page'])
        group = self.kwargs['group']
        user = self.kwargs['username']
        return Response(getGroupPosts(group, page - 1, user, 'q'))

    @action(detail=True, methods=['get'], name='Get Followed Posts')
    def followed_posts(self, request, *args, **kwargs):
        page = int(self.kwargs['page'])
        username = self.kwargs['username']
        return Response(get_followed_posts(username, page - 1, 'a'))

    @action(detail=True, methods=['get'], name='Get Followed Videos')
    def followed_videos(self, request, *args, **kwargs):
        page = int(self.kwargs['page'])
        username = self.kwargs['username']
        return Response(get_followed_posts(username, page - 1, 'v'))

    @action(detail=True, methods=['get'], name='Get Group Posts')
    def followed_questions(self, request, *args, **kwargs):
        page = int(self.kwargs['page'])
        username = self.kwargs['username']
        return Response(get_followed_posts(username, page - 1, 'q'))

    @action(detail=True, methods=['get'], name='Get Posts')
    def posts_feed(self, request, *args, **kwargs):
        page = int(self.kwargs['page'])
        user = self.kwargs['username']
        return Response(postFeed(page - 1, user, 'a'))
    
    @action(detail=True, methods=['get'], name='Get Posts')
    def questions_feed(self, request, *args, **kwargs):
        page = int(self.kwargs['page'])
        user = self.kwargs['username']
        return Response(postFeed(page - 1, user, 'q'))

    @action(detail=True, methods=['get'], name='Get Videos')
    def videos_feed(self, request, *args, **kwargs):
        page = int(self.kwargs['page'])
        user = self.kwargs['username']
        return Response(postFeed(page - 1, user, 'v'))

    @action(detail=True, methods=['get'], name='Get User Posts')
    def user_questions(self, request, *args, **kwargs):
        user = self.kwargs['username']
        page = int(self.kwargs['page'])
        user_questions = Post.objects.filter(user=user, type='q')
        return Response(getPostsDetails(user_questions, page - 1, user))
    
    @action(detail=True, methods=['post'], name='Update Post')
    def update_post(self, request, *args, **kwargs):
        post = request.data['id']
        title = request.data['title']
        description = request.data['description']
        content = request.data['content']
        updatePost(post_id=post, title=titl, description=description, content=content)
        return Response({'status': 'post has been updated'})
    
    def update_comment(self, request, *args, **kwargs):
        comment = request.data['id']
        content = request.data['content']
        updateComment(comment_id=comment, content=content)
        return Response({'status': 'post has been updated'})
            
    
class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = CommentSerializer

class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = LikeSerializer

class GroupFollowedViewSet(viewsets.ModelViewSet):
    queryset = GroupFollowed.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = GroupFollowedSerializer

class PostsFollowedViewSet(viewsets.ModelViewSet):
    queryset = PostFollowed.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = PostFollowedSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = GroupSerializer    

class PostsGroupViewSet(viewsets.ModelViewSet):
    queryset = PostGroups.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = PostGroupsSerializer