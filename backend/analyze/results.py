from backend.analyze.run import RunAnalysis
from backend.actions.runs import project_run_records, project_run_results
from backend.analyze.enums import ParameterModify, AccruacyClass
class ResultsAnalysis():
    def __init__(self, project):
        # load project runs information
        self.project = project
        self.run_records = project_run_records(project, finished=True)
        self.run_results = project_run_results(project)
        self.status_points = {
            'INCREASE_VALUE_HR': 2,
            'INCREASE_VALUE': 1,
            'KEEP_VALUE': 0,
            'CHANGE_VALUE': 0,
            'DECREASE_VALUE': -1,
            'DECREASE_VALUE_HR': -2
        }

    def analyze_specific_run(self, run_code):
        run_record = self.run_records.filter(id=run_code)[0]
        results = self.run_results[run_record.id]
        run_analysis = RunAnalysis(run_record=run_record, run_results=results)
        return run_analysis.analyze()

    def analyze_runs(self):
        runs = {}

        # iterate through run records and examine each run results
        for record in self.run_records:
            results = self.run_results[record.id]
            run_analysis = RunAnalysis(run_record=record, run_results=results)
            runs[record.id] = run_analysis.analyze()
        best_runs = self.best_runs(runs)
        return {
            'best_result': self.best_result(best_runs[0]),
            'best_runs': best_runs,
            'runs_quantity': self.runs_quantity(),
            'fitting_rate': self.fitting_rate(runs),
            'parameters': {
                'epoch': self.epoch(runs),
                'batch_size': self.batch_size(runs),
                'learning_rate': self.learning_rate(runs),
                'optimizer': self.optimizer(runs),
                'loss_type': self.loss_type(runs),
                'weight_decay': self.weight_decay(runs)
            },
            'runs': runs,
        }
    
    def best_result(self, best_run):
        print(best_run)
        results = best_run[1]['results']
        return {
            'train': self.result_category(results['train']),
            'dev': self.result_category(results['dev']),
            'test': self.result_category(results['test'])
        }

    def result_category(self, result):
        if result > AccruacyClass.EXCELLENT.value:
            category = AccruacyClass.EXCELLENT
        elif result > AccruacyClass.GOOD.value:
            category = AccruacyClass.GOOD
        elif result > AccruacyClass.MEDIOCRE.value:
            category = AccruacyClass.MEDIOCRE
        elif result > AccruacyClass.NEED_IMPROVEMENT.value:
            category = AccruacyClass.NEED_IMPROVEMENT
        elif result > AccruacyClass.BAD.value:
            category = AccruacyClass.BAD
        else:
            category = AccruacyClass.VERY_BAD
        return {
            'result': result,
            'category': category
        }

    def runs_quantity(self):
        # number of runs
        runs_quantity = self.run_records.count()
        status = ParameterModify.KEEP_VALUE
        if runs_quantity < 10:
            status = ParameterModify.INCREASE_VALUE_HR
        elif runs_quantity < 20:
            status = ParameterModify.INCREASE_VALUE
        return {
            'value': runs_quantity,
            'status': status.name
        }

    def fitting_rate(self, runs):
        overfitting = 0
        underfitting = 0
        nor = 0
        # compute number of overfitting and underfitting
        for _, run in runs.items():
            if run['overfitting'] == True:
                overfitting = overfitting + 1
            elif run['underfitting'] == True:
                underfitting = underfitting + 1
            else:
                nor = nor + 1  
        return { 
            'overfitting': overfitting, 
            'underfitting': underfitting,
            'nor': nor
        }

    def hyper_parameter_summery(self, runs, parameter_name):
        used = set()
        summary = { }
        for _, run in runs.items():
            parameter = run['parameters'][parameter_name]['value']
            status = run['parameters'][parameter_name]['status'].name
            factor = run['parameters'][parameter_name]['factor'].name
            used.add(parameter)
            if parameter not in summary:
                summary[parameter] = { 'status': {}, 'factor': {}  }
            if status not in summary[parameter]['status']:
                summary[parameter]['status'][status] = { 'frequency': 0 }
            if factor not in summary[parameter]['factor']:
                summary[parameter]['factor'][factor] = { 'frequency' : 0 }
            summary[parameter]['status'][status]['frequency'] += 1
            summary[parameter]['factor'][factor]['frequency'] += 1

        
        for _, parameter in summary.items():
            status_sum = 0
            factor_sum = 0
            # compute frequency rate for each parameter status
            for _, status in parameter['status'].items():
                status_sum = status_sum + status['frequency']
            for _, status in parameter['status'].items():
                status['rate'] = status['frequency'] / status_sum
            
            # compute frequency rate for each factor
            for _, factor in parameter['factor'].items():
                factor_sum = factor_sum + factor['frequency']
            for _, factor in parameter['factor'].items():
                factor['rate'] = factor['frequency'] / factor_sum
            
        return {
            'diversity': len(used),
            'used': used,
            'summary': summary
        }

    def format_response(self, analysis):
        for _, result in analysis['best_result'].items():
            result['category'] = result['category'].name
        for _, run in analysis['runs'].items():
            early_stopping = run['early_stopping']
            early_stopping['should_early_stop'] = early_stopping['should_early_stop'].name
            early_stopping['factor'] = early_stopping['factor'].name
            for _,parameter in run['parameters'].items():
                parameter['text'] = parameter['factor'].value
                parameter['factor'] = parameter['factor'].name
                parameter['status'] = parameter['status'].name
        return analysis
        
    def conclusion(self, summary):
        for _, parameter in summary['summary'].items():
            # compute frequency rate for each parameter status
            average_case = 0
            for status, frequency in parameter['status'].items():
                average_case += self.status_points[status] * frequency['rate']
            
            # compute frequency rate for each factor
            max_frequency = 0
            for factor, frequency in parameter['factor'].items():
                if frequency['rate'] > max_frequency:
                    max_frequency = frequency['rate']
                    max_factor = factor
            parameter['conclusion'] = {
                'average_case': average_case,
                'max_factor': max_factor,
            }
        return summary

    def best_runs(self, runs):
        max_runs = 3
        if len(runs) < 3:
            max_runs = len(runs)
        return sorted(runs.items(), key=lambda x: x[1]['results']['test'], reverse=True)[:max_runs]

    def epoch(self, runs):
        epoch_summary = self.hyper_parameter_summery(runs, 'epoch')
        return self.conclusion(epoch_summary)

    def learning_rate(self, runs):
        summary = self.hyper_parameter_summery(runs, 'learning_rate')
        return self.conclusion(summary)
    
    def weight_decay(self, runs):
        summary = self.hyper_parameter_summery(runs, 'weight_decay')
        return self.conclusion(summary)
    
    def batch_size(self, runs):
        summary = self.hyper_parameter_summery(runs, 'batch_size')
        return self.conclusion(summary)
    
    def optimizer(self, runs):
        summary = self.hyper_parameter_summery(runs, 'optimizer')
        return self.conclusion(summary)
    
    def loss_type(self, runs):
        summary = self.hyper_parameter_summery(runs, 'loss_type')
        return self.conclusion(summary)


