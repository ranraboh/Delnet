from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from .submodels.user import User
from .submodels.project import *
from .submodels.model import *
from .submodels.dataset import Dataset
from .serializers.user import UserSerializer
from .serializers.project import *
from .serializers.dataset import *
from .serializers.model import *
from django.core.paginator import Paginator
from .actions.model import *
from backend.actions.dataset import *


class ProjectsByUserFilter(generics.ListAPIView):
    serializer_class = ProjectSerializer

    # action which returns list of all the projects for a preticular user
    # url: /api/projects/user/[username]
    def get_queryset(self):
        projects = []
        username = self.kwargs['username']
        user_in_projects = ProjectTeam.objects.filter(user=username)
        for user_in_project in user_in_projects:
            projects.append(user_in_project.project)
        return projects

class ProjectTeamFilter(generics.ListAPIView):
    serializer_class = ExtendedProjectTeamSerializer

    # action which returns team members for a preticular project (by its id)
    # url: /api/team/project/[id] (id of project)
    def get_queryset(self):
        project_id = self.kwargs['id']
        project_team = ProjectTeam.objects.filter(project=project_id)
        for member in project_team:
            member.firstname = member.user.firstname
            member.lastname = member.user.lastname
            member.image = member.user.image
        return project_team

class ProjectRunsFilter(generics.ListAPIView):
    serializer_class = ProjectRunsSerializer

    # action which returns runs records for any praticular project (by its id)
    # url: api/runs/project/[id] (id of project)
    def get_queryset(self):
        project_id = self.kwargs['id']
        return ProjectRuns.objects.filter(project=project_id)

class DataSetUserFilter(generics.ListAPIView):
    serializer_class = DataSetSerializer

    # action which returns list of all the datasets for a praticular user 
    # url: /api/datasets/user/[username]
    def get_queryset(self):
        username = self.kwargs['username']
        return Dataset.objects.filter(user=username)

class DatasetTeamFilter(generics.ListAPIView):
    serializer_class = DatasetCollectorsSerializer
    # action which returns team members for a preticular dataset (by its id)
    # url: /api/team/dataset/[id] 
    def get_queryset(self):
        dataset_id = self.kwargs['id']
        return DatasetCollectors.objects.filter(dataset_id=dataset_id)    

class ProjectFilesFilter(generics.ListAPIView):
    serializer_class = ExtendedProjectFilesSerializer

    # action which returns set of files of preticular project (by its id)
    # url: /api/project/<int:id>/files
    def get_queryset(self):
        project_id = self.kwargs['id']
        files = ProjectFiles.objects.filter(project=project_id)
        for model_file in files:
            model_file.size = model_file.file.size
        return files

class SpecificFileFilter(generics.ListAPIView):
    serializer_class = ExtendedProjectFilesSerializer

    # action which returns information about a specific file
    # url: /api/file/<int:id>/info
    def get_queryset(self):
        file_id = self.kwargs['id']
        selected_file = ProjectFiles.objects.filter(id=file_id)[0]
        selected_file.size = selected_file.file.size
        return { selected_file }


class DatasetItemFilter(generics.ListAPIView):
    serializer_class = DatasetCollectorsSerializer

    # action which returns items 
    # url: /api/dataset/[id]/items/[page] 
    def get_queryset(self):
        dataset_id = self.kwargs['id']
        page_number = self.kwargs['page']
        items = DataItem.objects.filter(dataset_id=dataset_id)
        paginated_item_list = Paginator(items, 10)
        return paginated_item_list.page(page_number)

class UnfinishedRunsFilter(generics.ListAPIView):
    serializer_class = ProjectRunsDepthSerializer

    # action which returns all run records of specific project that didn't finished yet 
    # url: /api/project/[id]/runs/unfinished
    def get_queryset(self):
        project_id = self.kwargs['id']
        return ProjectRuns.objects.filter(project=project_id, progress__lt=100).order_by('-date', '-time')

class RunsProjectFilter(generics.ListAPIView):
    serializer_class = ProjectRunsDepthSerializer

    # action which returns all run records of specific project 
    # url: /api/project/[id]/runs
    def get_queryset(self):
        project_id = self.kwargs['id']
        return ProjectRuns.objects.filter(project=project_id, progress=100).order_by('-date', '-time')

class RunsResultsFilter(generics.ListAPIView):
    serializer_class = RunsResultSerializer

    # action which returns all run records of specific project 
    # url: /api/run/[id]/results
    def get_queryset(self):
        run_id = self.kwargs['id']
        return RunResult.objects.filter(run=run_id)

class RunsTrainResultsFilter(generics.ListAPIView):
    serializer_class = RunsResultSerializer

    # action which returns all run records of specific project 
    # url: /api/run/[id]/results/train
    def get_queryset(self):
        run_id = self.kwargs['id']
        return RunResult.objects.filter(run=run_id, set='t')

class RunsDevResultsFilter(generics.ListAPIView):
    serializer_class = RunsResultSerializer

    # action which returns all run records of specific project 
    # url: /api/run/[id]/results/dev
    def get_queryset(self):
        run_id = self.kwargs['id']
        return RunResult.objects.filter(run=run_id, set='d')

class RunRecordFilter(generics.ListAPIView):
    serializer_class = ProjectRunsDepthSerializer

    def get_queryset(self):
        run_id = self.kwargs['id']
        return ProjectRuns.objects.filter(id=run_id)

class UnlabeledDatasetFilter(generics.ListAPIView):
    serializer_class = UnlabeledSamplesSerializer

    def get_queryset(self):
        dataset_id = self.kwargs['id']
        return get_unlabeled_items(dataset_id)

class PublicDataSetFilter(generics.ListAPIView):
    serializer_class = DataSetFollowSerializer

    def get_queryset(self):
        user = self.kwargs['username']
        public = public_dataset()
        return follow_record(public, user)

class DatasetNameFilter(generics.ListAPIView):
    serializer_class = DataSetFollowSerializer

    def get_queryset(self):
        user = self.kwargs['username']
        dataset_name = self.kwargs['name']
        return follow_record(dataset_by_name(dataset_name), user)

class DatasetOffersFilter(generics.ListAPIView):
    serializer_class = DataItemSerializer

    def get_queryset(self):
        dataset_id = self.kwargs['id']
        return dataset_labels_offers(dataset_id)    






