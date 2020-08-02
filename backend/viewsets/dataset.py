from rest_framework import viewsets, permissions
from rest_framework import generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import PageNumberPagination
from backend.submodels.dataset import *
from backend.serializers.dataset import *
from backend.actions.dataset import *
from backend.analyze.dataset import *
import urllib.request
from django.conf import settings
import os

class DatasetViewSet(viewsets.ModelViewSet):
    queryset = Dataset.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = DataSetSerializer

    # action which returns the number of datasets in the system
    # url: /api/datasets/quantity
    @action(detail=False)
    def quantity(self, request):
        count = Dataset.objects.count()
        content = {'quantity': count}
        return Response(content)
    
    # action which returns the number of datasets of each user
    # url: /api/datasets/[username]/quantity 
    @action(detail=False)
    def user_quantity(self, request, *args, **kwargs):
        username = kwargs['username']
        dataset_quantity = user_datasets_quantity(username)
        return Response({ "username":username, "quantity":dataset_quantity })

    # action which returns dataset analysis details
    # url: /api/dataset/[id]/analyze 
    @action(detail=False)
    def dataset_analyze(self, request, *args, **kwargs):
        dataset_id = kwargs['id']
        analyzer = DatasetAnalyzer(dataset_id)
        return Response(analyzer.analyze())

    # action which returns the number of datasets of each user
    # url: /api/dataset/[id]/projects 
    @action(detail=False)
    def dataset_projects_results(self, request, *args, **kwargs):
        dataset_id = kwargs['id']
        models = models_results(dataset_id)
        return Response(models)


class DataLabelViewSet(viewsets.ModelViewSet):
    queryset = DataLabel.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = DataLabelSerializer

    # action which returns the number of labels of praticular dataset
    # url: /api/dataset/[id]/labels/quantity
    @action(detail=False)
    def labels_quantity(self, request, *args, **kwargs):
        dataset_id = self.kwargs['id']
        labels_quantity = compute_labels_quantity(dataset_id)
        return Response({ 'count': labels_quantity })

    @action(detail=False)
    # action which returns data labels of a preticular dataset (by its id)
    # url: /api/dataset/[id]/labels
    def labels_dataset(self, request, *args, **kwargs):
        dataset_id = self.kwargs['id']
        return Response(labels_expand_data(dataset_id))


class DataItemViewSet(viewsets.ModelViewSet):
    queryset = DataItem.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = DataItemSerializer

    # action which returns the number of items of praticular dataset
    # url: /api/dataset/[id]/items/quantity
    @action(detail=False)
    def items_quantity(self, request, *args, **kwargs):
        dataset_id = self.kwargs['id']
        items_quantity = compute_items_quantity(dataset_id)
        return Response({ 'count':items_quantity })

    @action(detail=False)
    # action which returns number of items for each dataset of user.
    # url: /api/datasets/[username]/items/quantity
    def user_datasets(self, request, *args, **kwargs):
        username = self.kwargs['username']
        return Response(items_per_user_datasets(username))
        
    @action(detail=False)
    # action which returns items of particular label
    # url: /api/dataset/[id]/labels/[label]/items/all
    def label_items(self, request, *args, **kwargs):
        dataset_id = self.kwargs['id']
        label = self.kwargs['label']
        return Response(DataItemSerializer(DataItem.objects.filter(dataset_id=dataset_id, label=label)))

    @action(detail=False)
    # action which returns items of particular label
    # url: /api/dataset/[id]/labels/[label]/items
    def label_items(self, request, *args, **kwargs):
        dataset_id = self.kwargs['id']
        label = self.kwargs['label']
        return DataItem.objects.filter(dataset_id=dataset_id, label=label)

    @action(detail=True, methods=['post'], name='Add Item')
    def add_item(self, request, *args, **kwargs):
        # extract request data
        label = request.data['label']
        user = request.data['insert_by']
        dataset = request.data['dataset']
        item = request.data['item']

        # upload item to server and add item records into database
        add_item(label=label, insert_by=user, dataset=dataset, image_url=item)
        return Response({ 'status': 'item added successfully' })

    @action(detail=True, methods=['post'], name='upload items')
    def upload_items(self, request, *args, **kwargs):
        # extract request data
        print(request.data)
        label = request.data['label']
        user = request.data['insert_by']
        dataset = request.data['dataset']
        items_quantity = int(request.data['items_quantity'])

        # upload item to server and add item records into database
        upload_items_list(label=label, insert_by=user, dataset=dataset, items_quantity=items_quantity, items_list=request.data)
        return Response({ 'status': 'item added successfully' })

    # action which returns the number of datasets of each user
    # url: /api/dataset/[id]/team/contributions 
    @action(detail=False)
    def user_contributions(self, request, *args, **kwargs):
        dataset_id = kwargs['id']
        models = items_per_user(dataset_id)
        return Response(models)

    # action which returns the number of datasets of each user
    # url: /api/dataset/[id]/date
    @action(detail=False)
    def date_distribution(self, request, *args, **kwargs):
        dataset_id = kwargs['id']
        models = items_per_date(dataset_id)
        return Response(models)
    

class DatasetCollectorsViewSet(viewsets.ModelViewSet):
    queryset = DatasetCollectors.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = DatasetCollectorsSerializer

class DataItemsListView(generics.ListAPIView):
    serializer_class = DataItemSerializerDepth
    authentication_classes = (TokenAuthentication,)
    permissions_classes = (IsAuthenticated,)
    pagination_class = PageNumberPagination
    
    # action which returns the number of items of praticular dataset
    # url: /api/dataset/[id]/items/quantity
    @action(detail=False)
    def get_queryset(self):
        dataset_id = self.kwargs['id']
        items = items_records(dataset_id)
        return items
class DateSateNotificationViewSet(viewsets.ModelViewSet):
    queryset = DatesetNotifcation.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = DatasetNotifcationSerializer


    @action(detail=False)
    def notification_headerDataset(self, request,  *args, **kwargs):
        query = []
        dataset = self.kwargs['id']
        groupSameDataset = DatesetNotifcation.objects.filter(dataset=dataset)     
        for oneOfGroup in groupSameDataset:
            query.append({
                'image': oneOfGroup.user.image, 'content': oneOfGroup.content,
                'user': oneOfGroup.user.username, 'topic': oneOfGroup.topic,
                'date': oneOfGroup.date, 'time': oneOfGroup.time
            })
        return Response(query)