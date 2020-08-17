from rest_framework import serializers
from ..submodels.dataset import *
from django.db import models


class DataSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = '__all__'

class DataSetFollowSerializer(serializers.ModelSerializer):
    follow = serializers.BooleanField()
    follow_id = serializers.IntegerField()
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

class DataIteExtendedSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataItem
        fields = '__all__'
        depth=1

class DataLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataLabel
        fields = '__all__'

class DatasetCollectorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatasetCollectors
        fields = '__all__'

class DatasetCollectorsExtendedSerializer(serializers.ModelSerializer):
    firstname = serializers.CharField(max_length=None, min_length=None, allow_blank=True, trim_whitespace=True)
    lastname = serializers.CharField(max_length=None, min_length=None, allow_blank=True, trim_whitespace=True)
    image = serializers.CharField(max_length=None, min_length=None, allow_blank=True, trim_whitespace=True)
    class Meta:
        model = DatasetCollectors
        fields = '__all__'

class DatasetNotifcationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatesetNotifcation
        fields = '__all__' 


class DatasetFollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatasetFollowers
        fields = '__all__'

class UnlabeledSamplesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnlabeledSamples
        fields = '__all__'
