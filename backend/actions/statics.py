from backend.analyze.recommendations import Recommendations
from backend.actions.general import float_precision
from backend.actions.runs import favorite_parameter
from backend.submodels.model import ProjectRuns
from backend.submodels.project import ProjectFiles, ProjectTeam
from backend.actions.project import get_total_size, most_query
from django.db.models import Avg, Max, Min, Sum, Count

class ProjectStatics():
    def __init__(self, project):
        self.project = project
        self.recommendations_object = Recommendations(project.id)
        self.analysis = self.recommendations_object.analysis()

    def get_statics(self):
        return {
            'model': self.model_statics(),
            'runs': self.runs_statics(),
            'team': self.team_statics(),
            'files': self.files_statics(),
        }

    def model_statics(self):
        return {
            'parameters': self.analysis['model']['structure']['parameters']['quantity'],
            'layers': self.analysis['model']['structure']['layers_quantity']['quantity'],
            'batchnorm': self.analysis['model']['modules']['batch_normalization']['exist'],
            'dropout': self.analysis['model']['modules']['dropout']['exist'],
            'convolution': self.analysis['model']['modules']['convolution']['quantity']['value'],
            'activations': {
                'max_used': self.analysis['model']['modules']['activations']['max_used']['activation'],
                'value': self.analysis['model']['modules']['activations']['max_used']['value'],
                'quantity': self.analysis['model']['modules']['activations']['usage']['activations_quantity']
            },
        }

    def runs_statics(self):
        results = ProjectRuns.objects.filter(project=self.project).filter(progress=100)
        accuracy_decimal_digits = 6
        loss_decimal_digits = 4
        statics = {
            # add time sum, time average, time max and min
            'qunatity': results.count(),
            'in_run': ProjectRuns.objects.filter(project=self.project).filter(progress__lt=100).count(),
            'total_epoches': results.aggregate(Sum('epochs'))['epochs__sum'],
            'accuracy_average': float_precision(results.aggregate(Avg('accuracy'))['accuracy__avg'], accuracy_decimal_digits),
            'loss_average': float_precision(results.aggregate(Avg('loss'))['loss__avg'], loss_decimal_digits),
            'accuracy_max': float_precision(results.aggregate(Max('accuracy'))['accuracy__max'], accuracy_decimal_digits),
            'accuracy_min': float_precision(results.aggregate(Min('accuracy'))['accuracy__min'], accuracy_decimal_digits),
            'loss_min': float_precision(results.aggregate(Min('loss'))['loss__min'], loss_decimal_digits),
            'loss_max': float_precision(results.aggregate(Max('loss'))['loss__max'], loss_decimal_digits),
            'favorite_params': {
                'batch_size': favorite_parameter(results, 'batch_size'),
                'loss': favorite_parameter(results, 'loss_type'),
                'optimizer': favorite_parameter(results, 'optimizer'),
                'weight_decay': favorite_parameter(results, 'weight_decay'),
                'learning_rate': favorite_parameter(results, 'learning_rate'),
                'epochs': favorite_parameter(results, 'epochs'),
            },
            'most_runner': favorite_parameter(results, 'user'),
            'date_most_runs': favorite_parameter(results, 'date'),
            'overfitting': self.analysis['runs']['runs_status']['overfitting'],
            'underfitting': self.analysis['runs']['runs_status']['underfitting'],
        }
        return statics

    def files_statics(self):
        files = ProjectFiles.objects.filter(project=self.project.id)
        if files.count() > 0:
            most_uploader = most_query(files, 'insert_by')
            most_file_uploads = most_query(files, 'insertion_date')
        else:
            most_uploader = { 'insert_by': 'None', 'count': 0 }
            most_file_uploads = { 'insertion_date': 'None', 'count': 0 }
        statics = {
            'files_quantity' : files.count(),
            'total_size': get_total_size(files),
            'most_uploader': most_uploader,
            'most_file_uploads': most_file_uploads,
        }
        return statics
   
    def team_statics(self):
        team = ProjectTeam.objects.filter(project=self.project)
        statics = {
            "team_size": team.count(),
            "managers": team.filter(presmissions=5).count()
        }
        return statics