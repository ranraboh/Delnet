from rest_framework import viewsets, permissions
from rest_framework import generics
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from django.core import serializers
import json

# import objects/models
from backend.submodels.model import *
from backend.submodels.dataset import Dataset
from backend.serializers.model import *

# import actions
from backend.tasks import run_model, celery_test
from backend.actions.model import *
from backend.actions.project import *
from backend.actions.runs import *
from backend.train.actions import deploy_model
from backend.analyze.run import RunAnalysis
from backend.analyze.results import ResultsAnalysis

class ProjectRunsViewSet(viewsets.ModelViewSet):
    queryset = ProjectRuns.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = ProjectRunsSerializer

    # analyze model run
    # /api/run/[id]/analysis
    def run_analysis(self, request, *args, **kwargs):
        run_code = self.kwargs['id']
        run_record = ProjectRuns.objects.filter(id=run_code)[0]
        analysis = ResultsAnalysis(run_record.project)
        return Response(analysis.analyze_specific_run(run_code))
    
    # analyze the project model by its runs results
    # /api/project/[id]/analysis/runs
    def projects_runs_analysis(self, request, *args, **kwargs):
        project_id = self.kwargs['id']
        project = Project.objects.filter(id=project_id)[0]
        analysis = ResultsAnalysis(project)
        analysis_results = analysis.analyze_runs()
        return Response(analysis.format_response(analysis_results))

    # action which update the file contents
    # /api/run/model
    @action(detail=True, methods=['post'], name='Run Model')
    def run_model(self, request, pk=None):
        print('run model')
        celery_test.delay()
        run_model.delay(request.data)
        return Response({'status': 'user credentails set'})

class RunsResultViewSet(viewsets.ModelViewSet):
    queryset = RunResult.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = RunsResultSerializer
    
    # deploy your own model
    # /api/project/[id]/deploy
    @action(detail=True, methods=['post'], name='Deploy Model')
    def deploy_model(self, request):
        # read request info
        project = project_by_id(project_id=request.data['project'])
        state = request.data['state']
        images_quantity = request.data['images_quantity']

        # deploy requested trained model
        model_pred = deploy_model(project=project , state=state , images=request.data, images_quantity=images_quantity)
        return Response(model_pred)

class LabelsMetricsViewSet(viewsets.ModelViewSet):
    queryset = LabelsMetrics.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = LabelsMetricsSerializer
    
    @action(detail=False)
    def recall(self, request, *args, **kwargs):
        run_id = self.kwargs['id']
        return Response(recall(run_id))
    
    @action(detail=False)
    def precision(self, request, *args, **kwargs):
        run_id = self.kwargs['id']
        return Response(precision(run_id))

    def f_one(self, request, *args, **kwargs):
        run_id = self.kwargs['id']
        return Response(f_one(run_id))

    @action(detail=False)
    def confusion_matrix(self, request, *args, **kwargs):
        run_id = self.kwargs['id']
        queryset = confusion_matrix_records(run_id)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class LossTypeViewSet(viewsets.ModelViewSet):
    queryset = LossTypes.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = LossTypesSerializer

class OptimizersViewSet(viewsets.ModelViewSet):
    queryset = Optimizer.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = OptimizersSerializer

class KnownModelsViewSet(viewsets.ModelViewSet):
    queryset = KnownModels.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = KnownModelsSerializer

class ProjectKnownModelsViewSet(viewsets.ModelViewSet):
    queryset = ProjectKnownModel.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = ProjectKnownModelsSerializer

