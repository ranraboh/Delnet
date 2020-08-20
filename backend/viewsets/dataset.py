from rest_framework import viewsets, permissions
from rest_framework import generics
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import PageNumberPagination
from backend.submodels.dataset import *
from backend.serializers.dataset import *
from backend.actions.dataset import *
from backend.analyze.dataset import *
from backend.actions.notifications import *
import urllib.request
from django.conf import settings
import os

class DatasetViewSet(viewsets.ModelViewSet):
    queryset = Dataset.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = DataSetSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        dataset = Dataset.objects.order_by('-id')[0]
        DatasetCollectors.objects.create(dataset=dataset, user=get_user('ranraboh'), role="Dataset Manager", presmissions=5)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

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

    @action(detail=False)
    def dataset_header(self, request, *args, **kwargs):
        dataset = get_dataset(kwargs['id'])
        items_amount = DataItem.objects.filter(dataset=dataset).count()
        labels_amount = DataLabel.objects.filter(dataset=dataset).count()
        collectors_amount = DatasetCollectors.objects.filter(dataset=dataset).count()
        return Response({ 'items': items_amount, 'labels': labels_amount, 'collectors': collectors_amount })

    @action(detail=True, methods=['post'], name='Update Dataset')
    def update_dataset(self, request, *args, **kwargs):
        print (request.data)
        # extract request data
        id = request.data['id']
        dataset= Dataset.objects.get(id=id)
        name = dataset.name
        public_view = request.data['public_view']
        old_public_view = dataset.public_view
        enable_offer = request.data['enable_offer']
        old_enable_offer = dataset.enable_offer
        username = request.data['username']
        description = dataset.description
        dataset.name = request.data['name']
        dataset.description = request.data['description']
        if public_view == True or public_view == 'true':
            dataset.public_view = True
        else:  
            dataset.public_view = False
        if enable_offer == True or enable_offer == 'true':
            dataset.enable_offer = True
        else:  
            dataset.enable_offer = False
        dataset.save()      
        notify_dataset_settings_change(dataset_id=id, username=username, name=name, description=description)
        notify_public_view(dataset_id=id, username=username, public_view=dataset.public_view, old_public_view=old_public_view)
        notify_enable_offers(dataset_id=id, username=username, enable_offer=dataset.enable_offer, old_enable_offer=old_enable_offer)
        return Response({'status': 'the status of the dataset is update'})

class DataLabelViewSet(viewsets.ModelViewSet):
    queryset = DataLabel.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = DataLabelSerializer
    
    def create(self, request, *args, **kwargs):
        notify_new_label(dataset_id=request.data['dataset'], username=request.data['insert_by'], label=request.data['name'])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    

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

    def destroy(self, request, *args, **kwargs):
        print (self.kwargs)
        instance = self.get_object()
        notify_items_removed(dataset=instance.dataset, username=self.kwargs['username'], label=instance.label.name)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

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
        username = request.data['username']
        item = request.data['item']
        # upload item to server and add item records into database
        if label == -1 or label == '-1':
            add_unlabeled(insert_by=user, dataset=dataset, image_url=item)
            notify_new_unlabeled_items(dataset_id=dataset, username=username, quantity=1)
        else:
            add_item(label=label, insert_by=user, dataset=dataset, image_url=item)
            label_object = DataLabel.objects.get(pk=label)
            if request.data['tag'] == True:
                notify_tag_items(dataset_id=dataset, username=username, quantity=1, label=label_object.name)
            elif request.data['offer'] == True:
                notify_offer_items(dataset_id=dataset, username=username, quantity=1, label=label_object.name)
            else:
                notify_new_items(dataset_id=dataset, username=username, quantity=1, label=label_object.name)
        return Response({ 'status': 'item added successfully' })

    @action(detail=True, methods=['post'], name='upload items')
    def upload_items(self, request, *args, **kwargs):
        # extract request data
        label = request.data['label']
        user = request.data['insert_by']
        dataset = request.data['dataset']
        items_quantity = int(request.data['items_quantity'])

        # upload item to server and add item records into database
        if label == -1 or label == '-1':
            upload_unlabeled_list(insert_by=user, dataset=dataset, items_quantity=items_quantity, items_list=request.data)
            notify_new_unlabeled_items(dataset_id=dataset, username=user, quantity=items_quantity)
        else:
            upload_items_list(label=label, insert_by=user, dataset=dataset, items_quantity=items_quantity, items_list=request.data)
            label_object = DataLabel.objects.filter(pk=label)[0]
            notify_new_items(dataset_id=dataset, username=user, quantity=items_quantity, label=label_object.name)
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

    def create(self, request, *args, **kwargs):
        notify_new_collector(dataset_id=request.data['dataset'], username=request.data['user'], role=request.data['role'])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def destroy(self, request, *args, **kwargs):
        team_member = DatasetCollectors.objects.get(pk=kwargs['pk'])
        notify_delete_collector(dataset=team_member.dataset, user=team_member.user)
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['get'], name='Get Dataset Premissions')
    def get_premissions(self, request, *args, **kwargs):
        dataset_id = self.kwargs['id']
        username = self.kwargs['username']
        dataset = Dataset.objects.get(pk=dataset_id)
        user = User.objects.get(pk=username)
        permissions = DatasetCollectors.objects.filter(dataset=dataset, user=user)
        if permissions.count() <= 0:
            return Response({'premissions': 0})
        return Response({'premissions': permissions[0].presmissions})

    @action(detail=True, methods=['post'], name='Update Member')
    def update_member(self, request, *args, **kwargs):
        id = request.data['id']
        role = request.data['role']
        premissions = request.data['premissions']
        member_record = DatasetCollectors.objects.get(pk=id)
        member_record.role = role
        member_record.presmissions = premissions
        member_record.save()
        return Response({'status': 'member has been updated'})

    

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

class DataSetNotificationViewSet(viewsets.ModelViewSet):
    queryset = DatesetNotifcation.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = DatasetNotifcationSerializer

    @action(detail=False)
    def notification_headerDataset(self, request,  *args, **kwargs):
        query = []
        dataset = self.kwargs['id']
        groupSameDataset = DatesetNotifcation.objects.filter(dataset=dataset).order_by('-date', '-time')     
        for oneOfGroup in groupSameDataset:
            query.append({
                'image': oneOfGroup.user.image, 'content': oneOfGroup.content,
                'user': oneOfGroup.user.username, 'topic': oneOfGroup.topic,
                'date': oneOfGroup.date, 'time': oneOfGroup.time
            })
        return Response(query)

class DatasetFollowersViewSet(viewsets.ModelViewSet):
    queryset = DatasetFollowers.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = DatasetFollowerSerializer

class UnlabeledSamplesViewSet(viewsets.ModelViewSet):
    queryset = UnlabeledSamples.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = UnlabeledSamplesSerializer
    
