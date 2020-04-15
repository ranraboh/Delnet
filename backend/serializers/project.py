from rest_framework import serializers
from ..submodels.project import Project, ProjectTeam, ProjectFiles
from django.db import models

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ProjectTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTeam
        fields = '__all__'

class ExtendedProjectTeamSerializer(serializers.ModelSerializer):
    firstname = serializers.CharField(max_length=None, min_length=None, allow_blank=True, trim_whitespace=True)
    lastname = serializers.CharField(max_length=None, min_length=None, allow_blank=True, trim_whitespace=True)
    image = serializers.CharField(max_length=None, min_length=None, allow_blank=True, trim_whitespace=True)
    class Meta:
        model = ProjectTeam
        fields = '__all__'

class ProjectFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectFiles
        fields = '__all__'

class ExtendedProjectFilesSerializer(serializers.ModelSerializer):
    size = serializers.CharField(max_length=None, min_length=None, allow_blank=True, trim_whitespace=True)
    class Meta:
        model = ProjectFiles
        fields = '__all__'
