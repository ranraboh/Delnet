from backend.actions.project import *
from backend.actions.dataset import *
from backend.actions.runs import *
from backend.actions.model import *
from backend.actions.amb import *
from backend.analyze.model import ModelAnalyzer
from backend.analyze.results import ResultsAnalysis
from backend.analyze.dataset import DatasetAnalyzer
from backend.analyze.text import ProjectStatus
import math

class Recommendations():
    def __init__(self, project_id):
        # read crucial data from database
        self.project = project_by_id(project_id)
        self.dataset = get_project_dataset(self.project.id)
    
    def analysis(self):
        # create analysis objects
        self.project_analysis = {}
        
        # runs analysis
        self.runs_analyzer = ResultsAnalysis(self.project)
        runs = self.runs_analyzer.analyze_runs()
        self.project_analysis['runs'] = runs
        
        # dataset analysis
        self.dataset_analyzer = DatasetAnalyzer(self.dataset.id)
        dataset = self.dataset_analyzer.analyze()
        self.project_analysis['dataset'] = dataset

        # project status
        project_status = self.project_status()
        self.project_analysis['status'] = project_status

        # examinations of project 
        try:
            self.model_analyzer = ModelAnalyzer(self.project, project_status ,runs)
            model = self.model_analyzer.analyze()
            self.project_analysis['model'] = model
        except Exception:  
            self.project_analysis['model'] = None
            self.model_analyzer = None

        # imperfections
        imperfections = self.report_imperfections()
        self.project_analysis['status']['imperfections'] = imperfections
        return self.project_analysis

    # evaluate the project situation based on the analysis 
    def project_status(self):
        if self.project_analysis['runs'] == None:
           return {
            'status': 'Unknown',
            'text': 'you havent train your neural network yet so your model performence is unknown and cannot be fully evaluated and analyzed',
        }

        # evalaute project status according to six last runs
        labels_quantity = self.project_analysis['dataset']['labels_quantity']
        best_result = self.project_analysis['runs']['best_result']        
        runs_status = self.project_analysis['runs']['last-runs-status']

        # if in three runs the model results were excellent (accuracy rate 90%-100%) 
        # then the project status is EXCELLENT
        if runs_status['excellent']['quantity'] >= 2:
            status = ProjectStatus.EXCELLENT
        # the same hold for good result (accuracy rate 80%-90%),
        # if in two runs the moddel got excellent results, then the model in good state
        elif runs_status['good']['quantity'] > 3:
            status = ProjectStatus.GOOD
        # the project earned status of overfitting, not_learn or underfitting
        # if in 50% of the runs, the model was in this state
        elif runs_status['overfitting']['rate'] >= 0.5:
            status = ProjectStatus.OVERFITTING
        elif runs_status['not_learn']['rate'] >= 0.5:
            status = ProjectStatus.NOT_LEARN
        elif runs_status['underfitting']['rate'] >= 0.5:
            status = ProjectStatus.UNDERFITTING
        else:
            status = ProjectStatus.MEDIOCRE
        text = status.value
        if runs_status['excellent']['quantity'] == 1:
            text += ProjectStatus.GOOD_EXCELLENT.value
        return {
            'status': status.name,
            'text': text,
        }

    def report_imperfections(self):
        dataset = self.dataset_analyzer.report_imperfections()
        if self.model_analyzer == None:
            model = { 'critical': '', 'warnings': '' }
        else:
            model = self.model_analyzer.report_imperfections()
        results = self.runs_analyzer.report_imperfections()
        return {
            'critical': {
                'dataset': dataset['critical'],
                'model': model['critical'],
                'parameters': results['critical']
            },
            'warnings': {
                'dataset': dataset['warnings'],
                'model': model['warnings'],
                'parameters': results['warnings']
            }
        }
