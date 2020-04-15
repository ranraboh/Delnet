from rest_framework import viewsets, permissions
from rest_framework import generics
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from ..submodels.model import *
from ..serializers.model import *
from ..submodels.dataset import Dataset
import json
from backend.tasks import run_model, celery_test
from backend.actions.model import *
from django.core import serializers

class ProjectRunsViewSet(viewsets.ModelViewSet):
    queryset = ProjectRuns.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = ProjectRunsSerializer

class RunsResultViewSet(viewsets.ModelViewSet):
    queryset = RunResult.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = RunsResultSerializer

    # action which update the file content
    # /api/run/model
    @action(detail=True, methods=['post'], name='Run Model')
    def run_model(self, request, pk=None):
        print('run model')
        celery_test.delay()
        run_model.delay(request.data)
        return Response({'status': 'user credentails set'})


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