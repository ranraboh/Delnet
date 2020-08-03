from backend.analyze.run import RunAnalysis
from backend.actions.runs import project_run_records, project_run_results
from backend.analyze.enums import ParameterModify, AccuracyClass
from backend.actions.dataset import compute_labels_quantity, compute_items_quantity
from backend.actions.model import optimizers_dictionary, loss_dictionary
from backend.analyze.text import ParameterConclusion, OptimizerFactor, LossTypeFactor
from backend.actions.general import list_to_string
from copy import deepcopy
import math
class ResultsAnalysis():
    def __init__(self, project):
        # load project runs information
        self.project = project
        self.run_records = project_run_records(project, finished=True)
        self.run_results = project_run_results(project)
        self.labels_quantity = compute_labels_quantity(self.project.dataset)
        self.items_quantity = compute_items_quantity(self.project.dataset)
        self.optimizers = optimizers_dictionary()
        self.loss_types = loss_dictionary()
        self.status_points = {
            'INCREASE_VALUE_HR': 2,
            'INCREASE_VALUE': 1,
            'KEEP_VALUE': 0,
            'CHANGE_VALUE': 0,
            'DECREASE_VALUE': -1,
            'DECREASE_VALUE_HR': -2
        }

    # report texutally the selected hyper-parameters imperfections 
    def report_imperfections(self):
        # if model analysis didn't triggered yet
        if not self.runs_analysis_data:
            self.analyze()
        
        critical = []
        warnings = []
        # check out the status for any hyper parameter
        # and report in any case of imperfection
        for name, parameter in self.runs_analysis_data['parameters'].items():
            urgency = abs(parameter['conclusion']['urgency'])
            if parameter['conclusion']['conclusion_text']['status'] in [ 'TOO_LOW_VALUES', 'TOO_HIGH_VALUES' ] and urgency >= 1.25:
                critical.append(name + ":" + parameter['conclusion']['conclusion_text']['description'])
            elif parameter['conclusion']['conclusion_text']['status'] in [ 'TOO_LOW_VALUES', 'TOO_HIGH_VALUES' ] and urgency > 0.5 and urgency < 1.25:
                warnings.append(name + ":" + parameter['conclusion']['conclusion_text']['description'])
            elif parameter['conclusion']['conclusion_text']['status'] == 'VERSATILE':
                warnings.append(name + ":" + parameter['conclusion']['conclusion_text']['description'])
        return {
            'critical': critical,
            'warnings': warnings
        }

    def analyze_specific_run(self, run_code):
        run_record = self.run_records.filter(id=run_code)[0]
        results = self.run_results[run_record.id]
        run_analysis = RunAnalysis(run_record=run_record, run_results=results, optimizers=self.optimizers, loss_types=self.loss_types, items_quantity=self.items_quantity)
        return run_analysis.analyze()

    def analyze_runs(self):
        runs = {}
        last_runs = {}
        last_runs_amount = 6

        # iterate through run records and examine each run results
        for record in self.run_records.order_by('-date', '-time'):
            results = self.run_results[record.id]
            run_analysis = RunAnalysis(run_record=record, run_results=results, optimizers=self.optimizers, loss_types=self.loss_types, items_quantity=self.items_quantity)
            runs[record.id] = run_analysis.analyze()
            if last_runs_amount >= 0:
                last_runs[record.id] = runs[record.id]
                last_runs_amount -= 1
        best_runs = self.best_runs(runs)
        best_result = self.best_result(best_runs[0])
        # runs analysis full information
        self.runs_analysis_data = {
            'best_result': best_result,
            'best_runs': best_runs,
            'runs_quantity': self.runs_quantity(),
            'runs_status': self.runs_status(runs),
            'last-runs-status': self.runs_status(last_runs),
            'parameters': {
                'epoch': self.epoch(runs),
                'batch_size': self.batch_size(runs),
                'learning_rate': self.learning_rate(runs),
                'optimizer': self.optimizer(runs, best_result['test']),
                'loss_type': self.loss_type(runs, best_result['test']),
                'weight_decay': self.weight_decay(runs)
            },
            'runs': runs,
        }
        return self.format_response()
    
    def best_result(self, best_run):
        results = best_run[1]['results']
        return {
            'train': self.result_category(results['train']),
            'dev': self.result_category(results['dev']),
            'test': self.result_category(results['test'])
        }

    def result_category(self, result):
        if result > AccuracyClass.EXCELLENT.value:
            category = AccuracyClass.EXCELLENT
        elif result > AccuracyClass.GOOD.value:
            category = AccuracyClass.GOOD
        elif result > AccuracyClass.MEDIOCRE.value:
            category = AccuracyClass.MEDIOCRE
        elif result > AccuracyClass.NEED_IMPROVEMENT.value:
            category = AccuracyClass.NEED_IMPROVEMENT
        elif result > AccuracyClass.BAD.value:
            category = AccuracyClass.BAD
        else:
            category = AccuracyClass.VERY_BAD
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

    def runs_status(self, runs):
        runs_quantity = len(runs)
        not_learn, underfitting, overfitting = 0, 0, 0
        mediocre, good, excellent = 0, 0, 0 

        # compute number of overfitting and underfitting
        for _, run in runs.items():
            if run['results']['train'] < 1 / self.labels_quantity + 0.05:
                not_learn = not_learn + 1
            if run['overfitting'] == True:
                overfitting = overfitting + 1
            if run['underfitting'] == True:
                underfitting = underfitting + 1
            if run['results']['train'] > 0.85:
                if run['results']['test'] >= 0.6 and run['results']['test'] < 0.8:
                    mediocre = mediocre + 1
                elif run['results']['test'] >= 0.8 and run['results']['test'] < 0.9:
                    good = good + 1
                elif run['results']['test'] >= 0.9:
                    excellent = excellent + 1
            
        return { 
            'overfitting': {
                'quantity': overfitting,
                'rate': overfitting / runs_quantity
            },
            'underfitting': {
                'quantity': underfitting,
                'rate': underfitting / runs_quantity
            },
            'not_learn': {
                'quantity': not_learn,
                'rate': not_learn / runs_quantity
            },
            'mediocre': {
                'quantity': mediocre,
                'rate': mediocre / runs_quantity
            },
            'good': {
                'quantity': good,
                'rate': good / runs_quantity
            },
            'excellent': {
                'quantity': excellent,
                'rate': excellent / runs_quantity
            }
        }

    def hyper_parameter_summery(self, runs, parameter_name):
        used = set()
        summary = { }
        runs_quantity = self.run_records.count()
        for _, run in runs.items():
            parameter = run['parameters'][parameter_name]['value']
            status = run['parameters'][parameter_name]['status']
            factor = run['parameters'][parameter_name]['factor']
            result = run['results']['test']
            used.add(parameter)

            # build container to hold parameter inforamtion
            if parameter not in summary:
                summary[parameter] = { 'status': {}, 'factor': {}, 'frequency': 0, 'average': 0, 'max': 0, 'min': 100  }
            if status.name not in summary[parameter]['status']:
                summary[parameter]['status'][status.name] = { 'status': status, 'frequency': 0 }
            if factor.name not in summary[parameter]['factor']:
                summary[parameter]['factor'][factor.name] = { 'factor': factor, 'frequency' : 0 }
            
            # update parameter statics
            if result > summary[parameter]['max']:
                summary[parameter]['max'] = result
            if result < summary[parameter]['min']:
                summary[parameter]['min'] = result
            summary[parameter]['average'] += result
            summary[parameter]['frequency'] += 1
            summary[parameter]['status'][status.name]['frequency'] += 1
            summary[parameter]['factor'][factor.name]['frequency'] += 1
        
        for _, parameter in summary.items():
            status_sum = 0
            factor_sum = 0
            # compute frequency rate for each parameter status
            for _, status in parameter['status'].items():
                status_sum = status_sum + status['frequency']
            for _, status in parameter['status'].items():
                status['rate'] = status['frequency'] / status_sum
            parameter['average'] = parameter['average'] / parameter['frequency']
            parameter['frequncy_rate'] = parameter['frequency'] / runs_quantity

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

    def format_response(self):
        analysis = deepcopy(self.runs_analysis_data)
        for _, result in analysis['best_result'].items():
            result['category'] = result['category'].name
        for _, parameter_type in analysis['parameters'].items():
            for _, parameter  in parameter_type['summary'].items():
                for _, status in parameter['status'].items():
                    status['status'] = status['status'].name
                for _, factor in parameter['factor'].items():
                    factor['factor'] = factor['factor'].name
        for _, run in analysis['runs'].items():
            early_stopping = run['early_stopping']
            early_stopping['should_early_stop'] = early_stopping['should_early_stop'].name
            early_stopping['factor'] = early_stopping['factor'].name
            for _,parameter in run['parameters'].items():
                parameter['text'] = parameter['factor'].value
                parameter['factor'] = parameter['factor'].name
                parameter['status'] = parameter['status'].name
        return analysis

    def loss_type_conclusion(self, summary, test_result):
        factor = LossTypeFactor.REASONABLE_VALUE
        best_accuracy = test_result['result']
        if len(summary['summary']) >= 3 and best_accuracy < 0.8:
            factor = LossTypeFactor.MANY_OPTIONS_FAIL
        if 'Cross Entropy' not in summary['summary']:
            factor = LossTypeFactor.CROSS_ENTROPY
        if best_accuracy >= 0.8:
            factor = LossTypeFactor.SUCCESS
        summary['conclusion']['conclusion_text']['status'] = factor.name
        summary['conclusion']['conclusion_text']['description'] = factor.value
        return summary

    def optimizer_conclusion(self, summary, test_results):
        status = OptimizerFactor.REASONABLE_VALUE
        best_accuracy = test_results['result']
        if len(summary['summary']) >= 3 and best_accuracy < 0.8:
            status = OptimizerFactor.MANY_OPTIONS_FAIL
        elif 'Adam' not in summary['summary']:
            status = OptimizerFactor.ADAM
        elif best_accuracy < 0.7:
            status = OptimizerFactor.UNDERFITTING
        elif best_accuracy >= 0.8:
            status = OptimizerFactor.SUCCESS
        print (status)
        summary['conclusion']['conclusion_text']['status'] = status.name
        summary['conclusion']['conclusion_text']['description'] = status.value
        return summary

    def conclusion(self, summary):
        too_low = []
        too_high = []
        reasonable_values = []
        general_average = 0
        for value, parameter in sorted(summary['summary'].items()):
            # compute frequency rate for each parameter status
            average = 0
            for status, frequency in parameter['status'].items():
                average += self.status_points[status] * frequency['rate']
            if average >= 1.5:
                too_low.append(value)
                status = ParameterModify.INCREASE_VALUE_HR
            elif average >= 0.2:
                too_low.append(value)
                status = ParameterModify.INCREASE_VALUE
            elif abs(average) < 0.2:
                reasonable_values.append(value)
                status = ParameterModify.KEEP_VALUE
            elif average < -1.5:
                too_high.append(value)
                status = ParameterModify.DECREASE_VALUE_HR
            elif average <= -0.2:
                too_high.append(value)
                status = ParameterModify.DECREASE_VALUE
            general_average = general_average + average

            # compute max frequency
            max_frequency = 0
            for factor, frequency in parameter['factor'].items():
                if frequency['rate'] > max_frequency:
                    max_frequency = frequency['rate']
                    max_factor = frequency['factor']
            parameter['conclusion'] = {
                'max_factor': max_factor.name,
                'text': max_factor.value,
                'status': status.name,
            }
        summary['conclusion'] = {
            'too_low': too_low,
            'too_high': too_high,
            'reasonable': reasonable_values,
            'urgency': general_average / len(summary['summary']),
            'conclusion_text': self.build_parameter_summary_message(reasonable_values, too_low, too_high, len(summary['summary']))
        }
        return summary

    def best_runs(self, runs):
        max_runs = 3
        if len(runs) < 3:
            max_runs = len(runs)
        return sorted(runs.items(), key=lambda x: x[1]['results']['test'], reverse=True)[:max_runs]
    
    def build_parameter_summary_message(self, reasonable, too_low, too_high, values_quantity):
        message = ''
        status = ParameterConclusion.BLANK
        if values_quantity <= 1:
            status = ParameterConclusion.VERSTILE
        elif len(too_low) / values_quantity >= 0.7:
            status = ParameterConclusion.TOO_LOW_VALUES
        elif len(too_high) / values_quantity >= 0.7:
            status = ParameterConclusion.TOO_HIGH_VALUES
        elif len(reasonable) / values_quantity >= 0.7:
            status = ParameterConclusion.REASONABLE
        
        message = status.value
        as_options = ''
        if len(reasonable) > 0:
            as_options = 'as ' + list_to_string(reasonable)
        if len(too_low) > 0 and len(too_high) > 0 and status != ParameterConclusion.REASONABLE:
            message += 'try to use values in the range from ' + max(too_low) + ' to ' + min(too_high) + as_options + ' and examine the model performence and analysis '
        elif status == ParameterConclusion.TOO_LOW_VALUES:
            message += 'use values higher then ' + str(max(too_low)) + " " + as_options + ' and examine the model performence and analysis' 
        elif status == ParameterConclusion.TOO_HIGH_VALUES:
            message += 'use values lower then ' + str(min(too_high)) + " " + as_options + ' and examine the model performence and analysis'
        
        too_low_message =  'Too low values: '
        too_high_message = 'Too high values: '
        reasonable_message = 'Reasonable values: '
        if len(too_low) == 0:
            too_low_message += 'None'
        else:
            too_low_message += list_to_string(too_low)
        if len(too_high) == 0:
            too_high_message += 'None'
        else:
            too_high_message += list_to_string(too_high)
        if len(reasonable) == 0:
            reasonable_message += 'None'
        else:
            reasonable_message += list_to_string(reasonable)
        return {
            'too_low': too_low_message,
            'too_high': too_high_message,
            'reasonable': reasonable_message,
            'status': status.name,
            'description': message
        }

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
    
    def optimizer(self, runs, result):
        summary = self.hyper_parameter_summery(runs, 'optimizer')
        conclusion = self.conclusion(summary)
        return self.optimizer_conclusion(conclusion, result)
    
    def loss_type(self, runs, result):
        print (result)
        summary = self.hyper_parameter_summery(runs, 'loss_type')
        conclusion = self.conclusion(summary)
        return self.loss_type_conclusion(conclusion, result)
