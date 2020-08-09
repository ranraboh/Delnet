# general imports
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers

# import views, filters and view-sets api
from . import views
from backend.viewsets.user import *
from backend.viewsets.project import *
from backend.viewsets.dataset import *
from backend.viewsets.model import *
from backend.filters import *
from backend.viewsets.posts import *

# routing of static data
static_routing = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# routing for views: for distinct pages in the application
pages_url = [
    path('', views.LoginView.as_view()),
    path('home/', views.HomeView, name='home'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('profile/', views.ProfileView, name='profile'),
    path('register/', views.SignupView, name='register'),
    path('projects/', views.ProjectsView, name="projects"),
    path('project/', views.ProjectView, name='project'),
    path('datasets/', views.DatasetsView, name='datasets'),
    path('dataset/', views.DatasetView, name="dataset"),
    path('automated/', views.AutomatedModelBuilderView, name="automated"),
    path('community/', views.CommunityView, name="community"),
    path('upload/', ImageViewSet.as_view(), name='upload'),
    path('upload/project', UploadFilesViewSet.as_view(), name="project files")
]

updates_url = [
    path('api/users/update', UserViewSet.as_view({"put": "update_user"})),
    path('api/users/image/update', UserViewSet.as_view({"put": "update_user_image"})),
    path('api/projects/update', ProjectViewSet.as_view({"put": "update_project"}))
]

# routing of view sets api
router = routers.DefaultRouter()
router.register('api/users', UserViewSet, 'users')
router.register('api/projects', ProjectViewSet, 'projects')
router.register('api/team/projects', ProjectTeamViewSet, 'project-team')
router.register('api/runs', ProjectRunsViewSet, 'project-runs')
router.register('api/optimizers', OptimizersViewSet, 'optimizers')
router.register('api/run/result', RunsResultViewSet, 'run')
router.register('api/datasets', DatasetViewSet, 'datasets')
router.register('api/dataitems', DataItemViewSet, 'dataitems')
router.register('api/messages', MessageViewSet, 'message')
router.register('api/checkList', CheckListViewSet, 'checkListViewSet')
router.register('api/datalabels', DataLabelViewSet, 'datalabels')
router.register('api/datacollectors', DatasetCollectorsViewSet, 'datacollectors')
router.register('api/projects/files', ProjectFilesViewSet, 'projects-files')
router.register('api/loss/types', LossTypeViewSet, 'loss types')
router.register('api/results/labels', LabelsMetricsViewSet, 'labels metrics')
router.register('api/known', KnownModelsViewSet, 'known models')
router.register('api/projects/known', ProjectKnownModelsViewSet, 'project known models mapper')
router.register('api/dataset/Notification', DateSateNotificationViewSet, 'datasrt notification viewSet')
router.register('api/notifications/projects', ProjectNotificationViewSet, 'project notification viewSet')
router.register('api/unlabled', UnlabeledSamplesViewSet, 'unlabeled samples')
router.register('api/followers/datasets', DatasetFollowersViewSet, 'dataset followers')
router.register('api/groups', GroupViewSet, 'groups')
router.register('api/posts', PostsViewSet, 'posts')
router.register('api/comments', CommentsViewSet, 'comments')
router.register('api/likes', LikeViewSet, 'likes')
router.register('api/followed/groups', GroupFollowedViewSet, 'followed posts')
router.register('api/followed/posts', PostsFollowedViewSet, 'followed groups')
router.register('api/postsgroups', PostsGroupViewSet, 'postsgroups')


# routing for filters and queries
queries_url = [
    path('api/projects/user/<slug:username>', ProjectsByUserFilter.as_view(), name='login'),
    path('api/messages/sender/<slug:sender>', MessageSenderFilter.as_view(), name='sender'),
    path('api/projectCheckList/complete/<slug:id>', AllTheTaskDone.as_view(), name='id'),
    path('api/projectCheckList/notComplete/<slug:id>', AllTheTaskNotDone.as_view(), name='id'),
    path('api/messages/receiver/<slug:receiver>', MessageReceiverFilter.as_view(), name='receiver'),
    path('api/project/<int:id>/statics', ProjectViewSet.as_view({ "get": "project_statics" })),
    path('api/project/<int:id>/test', ProjectViewSet.as_view({ "get": "project_tester" })),
    path('api/project/<int:id>/recommendations', ProjectViewSet.as_view({ "get": "get_recommendations" })),
    path('api/project/<int:id>/analysis/model', ProjectViewSet.as_view({ "get": "model_analysis" })),
    path('api/team/project/<int:id>', ProjectTeamFilter.as_view(), name='project_team'),
    path('api/runs/project/<int:id>', ProjectRunsFilter.as_view(), name='project_runs'),
    path('api/datasets/user/<slug:username>', DataSetUserFilter.as_view(), name='datasets_user'),
    path('api/datasets/user/<slug:username>/quantity', DatasetViewSet.as_view({"get": "user_quantity"})),
    path('api/dataset/<int:id>/analyze', DatasetViewSet.as_view({"get": "dataset_analyze"})),
    path('api/team/dataset/<int:id>', DatasetTeamFilter.as_view()),
    path('api/dataset/<int:id>/labels', DataLabelViewSet.as_view({"get": "labels_dataset"})),
    path('api/dataset/<int:id>/labels/quantity', DataLabelViewSet.as_view({"get": "labels_quantity"})),
    path('api/dataset/<int:id>/items/quantity', DataItemViewSet.as_view({"get": "items_quantity"})),
    path('api/datasets/user/<slug:username>/items/quantity', DataItemViewSet.as_view({"get": "user_datasets"})),
    path('api/dataset/<int:id>/items/', DataItemsListView.as_view()),
    path('api/project/<int:id>/files/quantity', ProjectFilesViewSet.as_view({ 'get': 'project_files_quantity' })),
    path('api/project/<int:id>/files', ProjectFilesFilter.as_view()),
    path('api/project/<int:id>/layers', ProjectViewSet.as_view({ 'get' : 'get_layers'})),
    path('api/layers/save', ProjectViewSet.as_view({ 'post' : 'save_layers' })),
    path('api/dataset/update', DatasetViewSet.as_view({ 'post' : 'update_dataset' })),

    path('api/file/<int:id>/content', ProjectFilesViewSet.as_view({ 'get' : 'file_content'})),
    path('api/file/content', ProjectFilesViewSet.as_view({ 'put' : 'update_file_content'})),
    path('api/run/model', ProjectRunsViewSet.as_view({ 'post' : 'run_model' })),
    path('api/deploy/model', RunsResultViewSet.as_view({ 'post' : 'deploy_model' })),
    path('api/file/<int:id>/info', SpecificFileFilter.as_view()),
    path('api/run/<int:id>/results', RunsResultsFilter.as_view()),
    path('api/run/<int:id>/results/train', RunsTrainResultsFilter.as_view()),
    path('api/run/<int:id>/results/dev', RunsDevResultsFilter.as_view()),
    path('api/projects/files/<int:pk>/user/<slug:username>', ProjectFilesViewSet.as_view({ 'delete' : 'destroy'})),
    path('api/project/<int:id>/runs', RunsProjectFilter.as_view()),
    path('api/items/add', DataItemViewSet.as_view({ 'post': 'add_item' }) ),
    path('api/items/upload', DataItemViewSet.as_view({ 'post': 'upload_items' }) ),
    path('api/amb/create', ProjectViewSet.as_view({ 'post' : 'amb_create'})),
    path('api/checkList/changeComplete', CheckListViewSet.as_view({ 'post' : 'changeComplete'})),
    path('api/checkList/task/update', CheckListViewSet.as_view({ 'post' : 'update_task'})),
    path('api/project/<int:id>/accuracy/range', ProjectViewSet.as_view({ "get" : "accuracy_range" })),
    path('api/runs/<int:id>/full', RunRecordFilter.as_view()),
    path('api/project/<int:id>/runs/unfinished', UnfinishedRunsFilter.as_view()),
    path('api/run/<int:id>/results/confusionmatrix', LabelsMetricsViewSet.as_view({ 'get' : 'confusion_matrix'})),
    path('api/run/<int:id>/results/recall', LabelsMetricsViewSet.as_view({ 'get' : 'recall'})),
    path('api/run/<int:id>/results/precision', LabelsMetricsViewSet.as_view({ 'get' : 'precision'})),
    path('api/run/<int:id>/results/f1', LabelsMetricsViewSet.as_view({ 'get' : 'f_one'})),
    path('api/dataset/<int:id>/date', DataItemViewSet.as_view({ 'get' : 'date_distribution'})),
    path('api/dataset/<int:id>/team/contributions', DataItemViewSet.as_view({ 'get' : 'user_contributions'})),
    path('api/dataset/<int:id>/projects', DatasetViewSet.as_view({ 'get' : 'dataset_projects_results'})),
    path('api/run/<int:id>/analysis', ProjectRunsViewSet.as_view({ 'get' : 'run_analysis'})),
    path('api/project/<int:id>/analysis/runs', ProjectRunsViewSet.as_view({ 'get' : 'projects_runs_analysis'})),
    path('api/messages/header/<slug:receiver>', MessageViewSet.as_view({ 'get' : 'messages_header'})),
    path('api/notifications/header/<slug:username>', UserViewSet.as_view({ 'get' : 'notifications_header'})),
    path('api/messages/addMessage', MessageViewSet.as_view({ 'post' : 'messageAdd' })),
    path('api/projects/header/<int:id>', ProjectNotificationViewSet.as_view({ 'get' : 'notification_headerProject'})),
    path('api/dataset/header/<int:id>', DateSateNotificationViewSet.as_view({ 'get' : 'notification_headerDataset'})),
    path('api/project/<int:id>/checkList', CheckListViewSet.as_view({ 'get' : 'checkList_header'})),
    path('api/user/<slug:username>/exist', UserViewSet.as_view({ 'get' : 'user_exist'})),

    path('api/datasets/public/view/<slug:username>', PublicDataSetFilter.as_view()),
    path('api/dataset/<int:id>/unlabeled', UnlabeledDatasetFilter.as_view()),
    path('api/datasets/search/<slug:name>/user/<slug:username>', DatasetNameFilter.as_view()),
    path('api/dataset/<int:id>/offers', DatasetOffersFilter.as_view()),
    path('api/posts/user/<slug:username>/page/<int:page>', PostsViewSet.as_view({ 'get' : 'user_posts' })),
    path('api/questions/user/<slug:username>/page/<int:page>', PostsViewSet.as_view({ 'get' : 'user_questions' })),
    path('api/post/update', PostsViewSet.as_view({ 'post' : 'update_post' })),
    path('api/comment/update', CommentsViewSet.as_view({ 'post' : 'update_comment' })),
    path('api/posts/feed/user/<slug:username>/page/<int:page>', PostsViewSet.as_view({ 'get' : 'posts_feed' })),
    path('api/questions/feed/user/<slug:username>/page/<int:page>', PostsViewSet.as_view({ 'get' : 'questions_feed' })),
    path('api/videos/feed/user/<slug:username>/page/<int:page>', PostsViewSet.as_view({ 'get' : 'videos_feed' })),
    path('api/posts/group/<int:group>/user/<slug:username>/page/<int:page>', PostsViewSet.as_view({ 'get' : 'group_posts' })),
    path('api/questions/group/<int:group>/user/<slug:username>/page/<int:page>', PostsViewSet.as_view({ 'get' : 'group_questions' })),
    path('api/videos/group/<int:group>/user/<slug:username>/page/<int:page>', PostsViewSet.as_view({ 'get' : 'group_videos' })),
    path('api/posts/groups/assigned', PostsViewSet.as_view({ 'post' : 'post_group_assigned' })),
    path('api/followed/posts/user/<slug:username>/page/<int:page>', PostsViewSet.as_view({ 'get' : 'followed_posts' })),
    path('api/followed/questions/user/<slug:username>/page/<int:page>', PostsViewSet.as_view({ 'get' : 'followed_questions' })),
    path('api/followed/videos/user/<slug:username>/page/<int:page>', PostsViewSet.as_view({ 'get' : 'followed_videos' })),

]

urlpatterns = router.urls + static_routing + pages_url + queries_url + updates_url
