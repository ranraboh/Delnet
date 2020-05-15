from backend.actions.project import *
from backend.actions.dataset import *
from backend.actions.runs import *
from backend.actions.model import *
from backend.actions.amb import *
from backend.analyze.model import ModelAnalyzer
from backend.analyze.results import ResultsAnalysis
from backend.analyze.dataset import DatasetAnalyzer
from backend.analyze.enums import AccruacyClass
from backend.analyze.text import ModelObstacle
import math

class Recommendations():
    def __init__(self, project_id):
        # read crucial data from database
        self.project = project_by_id(project_id)
        self.dataset = get_project_dataset(self.project.id)

    def anlyzers_results(self):        
        # create analysis objects
        self.runs_analyzer = ResultsAnalysis(self.project)
        self.dataset_analyzer = DatasetAnalyzer(self.dataset.id)

        # examinations of project 
        runs = self.runs_analyzer.analyze_runs()
        self.model_analyzer = ModelAnalyzer(self.project, runs)
        model = self.model_analyzer.analyze()
        dataset = self.dataset_analyzer.analyze()
        
        # returns examinations results
        return {
            'model': model,
            'dataset': dataset,
            'runs': self.runs_analyzer.format_response(runs),
        }


    def analysis(self):
        self.project_analysis = self.anlyzers_results()
        labels_quantity = self.project_analysis['dataset']['labels_quantity']
        best_result = self.project_analysis['runs']['best_result']        
        overfitting_rate = self.project_analysis['runs']['fitting_rate']['overfitting']
        underfitting_rate = self.project_analysis['runs']['fitting_rate']['underfitting']

        # evaluate the model status
        if best_result['train']['result'] < 1 / labels_quantity + 0.05:
            problem = ModelObstacle.NOT_LEARN
        elif best_result['train']['result'] < 0.8 and underfitting_rate > 0.65:
            problem = ModelObstacle.UNDERFITTING
        elif best_result['test']['result'] < 0.75 and overfitting_rate > 0.65:
            problem = ModelObstacle.OVERFITTING
        elif best_result['test']['result'] < 0.85:
            problem = ModelObstacle.GOOD
        else:
            problem = ModelObstacle.EXCELLENT
        self.project_analysis['status'] = {
            'obstacle': problem.name,
            'text': problem.value,
            'not_learn': self.not_learn(),
        }
        return self.project_analysis

    def not_learn(self):
        solve_techniques = []
        solve_techniques.extend(self.dataset_analyzer.report_imperfections())
        solve_techniques.extend(self.model_analyzer.report_imperfections())
        
        return solve_techniques
        
        