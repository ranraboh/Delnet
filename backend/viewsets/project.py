from rest_framework import viewsets, permissions
from rest_framework import generics
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from ..submodels.project import *
from ..serializers.project import *
from ..submodels.dataset import Dataset
from ..actions.project import *
import json
from ..train import train

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = ProjectSerializer

    # action which update the user credentials
    # /api/projects/update
    @action(detail=True, methods=['put'], name='Update Project')
    def update_project(self, request, pk=None):
        update_project(project_data=request.data)
        return Response({'status': 'user credentails set'})

    # action which returns the number of projects in the system
    # url: /api/projects/quantity
    @action(detail=False)
    def quantity(self, request):
        count = Project.objects.count()
        content = {'quantity': count}
        return Response(content)

class ProjectTeamViewSet(viewsets.ModelViewSet):
    queryset = ProjectTeam.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = ProjectTeamSerializer

class ProjectFilesViewSet(viewsets.ModelViewSet):
    queryset = ProjectFiles.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = ProjectFilesSerializer

    # action which returns the number of files of praticular project
    # url: /api/project/[id]/files/quantity
    @action(detail=False)
    def project_files_quantity(self, request, *args, **kwargs):
        project_id = self.kwargs['id']
        count = project_files_quantity(project_id)
        return Response({ 'count': count })

    # action which returns the content of given file
    # url: /api/file/[id]/content
    @action(detail=False)
    def file_content(self, request, *args, **kwargs):
        file_id = self.kwargs['id']
        return Response({ 'content': get_file_content(file_id) })

    # action which update the file content
    # /api/file/[id]/content
    @action(detail=True, methods=['put'], name='Update File Content')
    def update_file_content(self, request, pk=None):
        file_id = request.data['id']
        updated_content = request.data['content']
        update_file_content(file_id, updated_content)
        return Response({'status': 'user credentails set'})

    
class UploadFilesViewSet(generics.ListAPIView):
    queryset = ProjectFiles.objects.all()
    serializer_class = ProjectFilesSerializer

    def post(self, request, *args, **kwargs):
        files_quantity = int(request.data['files_quantity'])
        project = request.data['project']
        user = request.data['user']
        upload_file(files_quantity=files_quantity, files_list=request.data, project_id=project, username=user)
        return Response({'status': 'files uploaded'})