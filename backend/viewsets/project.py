from rest_framework import viewsets, permissions
from rest_framework import generics
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
import json

# import data objects/models
from backend.submodels.project import *
from backend.submodels.dataset import Dataset
from backend.serializers.project import *

# import actions
from backend.train import train
from backend.actions.notifications import *
from backend.actions.project import *
from backend.actions.runs import *
from backend.actions.amb import *
from backend.train.actions import extract_layers
from backend.actions.project import *
from backend.actions.runs import *
from backend.actions.amb import *
from backend.actions.tests import Tester
from backend.actions.user import get_user
from backend.actions.dataset import dataset_by_id
from backend.analyze.recommendations import Recommendations
from backend.analyze.model import ModelAnalyzer
from backend.actions.statics import *

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = ProjectSerializer

    # action which update the projects credentials
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
    
    @action(detail=True, methods=['post'], name='Amb Create')
    def amb_create(self, request, *args, **kwargs):
        # extract request data
        details = request.data['details']
        dataset = dataset_by_id(dataset_id=details['dataset'])
        user = get_user(username=details['user'])
        type = request.data['type'][0].lower()

        # store automated project data in database
        project = Project.objects.create(project_name=details['project_name'], description=details['description'], result=0, user=user, dataset=dataset, model_type=type)
        ProjectTeam.objects.create(user=user, project=project, role="Project Manager", presmissions=5)
        if type == 'c':
            layers = request.data['layers']
            layers_file = get_file_layers(project.id)
            save_layers(layers, layers_file)
        else:
            known_model = request.data['known_model']
            ProjectKnownModel.objects.create(project=project, known_model=get_known_model(known_model))
        return Response({'status': 'automated model project created'})
        
    @action(detail=True, methods=['get'], name='Get Layers')
    def get_layers(self, request, *args, **kwargs):
        project = Project.objects.filter(id=self.kwargs['id'])[0]
        if project.user_upload() or project.popular_model():
            layers = extract_layers(project)
            return Response(layers)
        else:
            layers_file = get_file_layers(project.id)
            layers = read_layers(layers_file)
            return Response(layers)
    
    @action(detail=True, methods=['post'], name='Save Layers')
    def save_layers(self, request, *args, **kwargs):
        project = request.data['project']
        layers = request.data['layers']
        layers_file = get_file_layers(project['id'])
        save_layers(layers, layers_file)
        return Response({'status': 'information about layers updated'})

    @action(detail=True, methods=['get'], name='Project Statics')
    def project_statics(self, request, *args, **kwargs):
        project_id = self.kwargs['id']
        project = project_by_id(project_id)
        statics = ProjectStatics(project)
        return Response(statics.get_statics())

    @action(detail=True, methods=['get'], name='Test')
    def project_tester(self, request, *args, **kwargs):
        project_id = self.kwargs['id']
        project = project_by_id(project_id)
        tester = Tester(project)
        return Response(tester.test_project())

    @action(detail=True, methods=['get'], name='Project Recommendations')
    def get_recommendations(self, request, *args, **kwargs):
        project_id = self.kwargs['id']
        recommendations_object = Recommendations(project_id)
        return Response(recommendations_object.analysis())
    
    @action(detail=True, methods=['get'], name='Model Analysis')
    def model_analysis(self, request, *args, **kwargs):
        project_id = self.kwargs['id']
        model_analysis = ModelAnalyzer(Project.objects.filter(id=project_id)[0], None)
        return Response(model_analysis.analyze())
    
    @action(detail=True, methods=['get'], name='Accuracy Range')
    def accuracy_range(self, request, *args, **kwargs):
        project_id = self.kwargs['id']
        range_results = accuracy_range(Project.objects.filter(id=project_id)[0])
        return Response(range_results)

class ProjectTeamViewSet(viewsets.ModelViewSet):
    queryset = ProjectTeam.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = ProjectTeamSerializer

    def create(self, request, *args, **kwargs):
        notify_new_member(project_id=request.data['project'], username=request.data['user'], role=request.data['role'])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def destroy(self, request, *args, **kwargs):
        team_member = ProjectTeam.objects.get(pk=kwargs['pk'])
        notify_delete_member(project=team_member.project, user=team_member.user)
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

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

    def destroy(self, request, *args, **kwargs):
        user = User.objects.get(username=kwargs['username'])
        instance = self.get_object()
        notify_file_delete(instance.project, user.username, instance.name)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    # action which returns the content of given file
    # url: /api/file/[id]/content
    @action(detail=False)
    def file_content(self, request, *args, **kwargs):
        file_id = self.kwargs['id']
        return Response({'content': get_file_content(file_id)})

    # action which update the file content
    # /api/file/[id]/content
    @action(detail=True, methods=['put'], name='Update File Content')
    def update_file_content(self, request, pk=None):
        file_id = request.data['id']
        file = ProjectFiles.objects.get(pk=file_id)
        updated_content = request.data['content']
        update_file_content(file_id, updated_content)
        file_edit(username=request.data['insert_by'], file_name=file.name, project=file.project)
        return Response({'status': 'user credentails set'})

    
class UploadFilesViewSet(generics.ListAPIView):
    queryset = ProjectFiles.objects.all()
    serializer_class = ProjectFilesSerializer

    def post(self, request, *args, **kwargs):
        files_quantity = int(request.data['files_quantity'])
        project = request.data['project']
        user = request.data['user']
        notify_file_upload(project_id=project, username=user, quantity=files_quantity, files=request.data)
        upload_file(files_quantity=files_quantity, files=request.data, project_id=project, username=user)
        return Response({'status': 'files uploaded'})
        
class CheckListViewSet(viewsets.ModelViewSet):
    queryset = ProjectCheckList.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = ProjectCheckListSerializer 

    def create(self, request, *args, **kwargs):
        notify_add_task(project_id=request.data['project'],username=request.data['username'],task=request.data['task'])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=False)
    def checkList_header(self, request,  *args, **kwargs):
        query = []
        project = self.kwargs['id']
        groupProject = ProjectCheckList.objects.filter(project=project)     
        for oneOfGroup in groupProject:
            user = '-'
            if oneOfGroup.executor_task:
                user = oneOfGroup.executor_task.username
            query.append({
                'id': oneOfGroup.id, 'executor_task': user, 'task': oneOfGroup.task, 
                'complete': oneOfGroup.complete, 'date': oneOfGroup.date,'time': oneOfGroup.time
            })
        return Response(query)
    
    @action(detail=True, methods=['post'], name='Toggle Complete')
    def changeComplete(self, request, *args, **kwargs):
        # extract request data
        id = request.data['id']
        executer = request.data['username']
        task=ProjectCheckList.objects.filter(id=id)[0]
        task.complete= not task.complete
        task.save()
        notify_task_complete(project=task.project, username=executer, task=task.task)
        return Response({'status': 'the status of the task is update'})

    @action(detail=True, methods=['post'], name='Update Task')
    def update_task(self, request, *args, **kwargs):
        # extract request data
        id = request.data['id']
        content = request.data['task']
        executer = request.data['executor_task']
        username = request.data['username']
        task=ProjectCheckList.objects.get(id=id)
        task.task = content
        if executer != '-' and executer != None and task.executor_task != executer:
            notify_task_assigned(project=task.project, username=username, task=task.task)
        if executer == '-' or executer == None:
            task.executor_task = None
        else:
            task.executor_task = User.objects.get(username=executer)
        task.save()      
        return Response({'status': 'the status of the task is update'})
   
class ProjectNotificationViewSet(viewsets.ModelViewSet):
    queryset = ProjectNotifcation.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = ProjectNotifcationSerializer

    @action(detail=False)
    def notification_headerProject(self, request,  *args, **kwargs):
        query = []
        project = self.kwargs['id']
        groupSameProject = ProjectNotifcation.objects.filter(project=project).order_by('-date', '-time')     
        for oneOfGroup in groupSameProject:
            query.append({
                'content': oneOfGroup.content,'image': oneOfGroup.user.image,
                'user': oneOfGroup.user.username, 'topic': oneOfGroup.topic,
                'date': oneOfGroup.date, 'time': oneOfGroup.time
            })
        return Response(query)