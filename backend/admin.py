from django.contrib import admin
from .submodels.user import *
from .submodels.project import *
from .submodels.dataset import *
from .submodels.model import *

# register modelss
admin.site.register(User)
admin.site.register(Project)
admin.site.register(ProjectRuns)
admin.site.register(ProjectTeam)
admin.site.register(Dataset)