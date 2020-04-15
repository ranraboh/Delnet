from ..submodels.model import *
from rest_framework import serializers

class ProjectRunsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectRuns
        fields = '__all__'

class ProjectRunsDepthSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectRuns
        fields = '__all__'
        depth = 1

class RunsResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = RunResult
        fields = '__all__'

class LabelsMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabelsMetrics
        fields = '__all__'

class ConfusionMatrixSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabelsMetrics
        fields = [ 'label', 'prediction', 'value' ]
        depth = 1
    
class OptimizersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Optimizer
        fields = '__all__'

class LossTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LossTypes
        fields = '__all__'
