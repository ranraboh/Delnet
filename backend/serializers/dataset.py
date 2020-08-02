from rest_framework import serializers
from ..submodels.dataset import *
from django.db import models


class DataSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = '__all__'

class DataItemSerializerDepth(serializers.ModelSerializer):
    class Meta:
        model = DataItem
        fields = '__all__'
        depth = 1

class DataItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataItem
        fields = '__all__'

class DataLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataLabel
        fields = '__all__'

class DatasetCollectorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatasetCollectors
        fields = '__all__'
class DatasetNotifcationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatesetNotifcation
        fields = '__all__' 