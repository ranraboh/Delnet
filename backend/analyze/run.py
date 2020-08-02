from backend.actions.project import *
from backend.actions.dataset import *
from backend.actions.runs import *
from backend.actions.model import *
from backend.actions.amb import *
from backend.analyze.enums import ParameterModify
from backend.analyze.text import *
import math

class RunAnalysis():
    def __init__(self, run_record, run_results):
        # load run information
        self.run_record = run_record
        self.train_results = run_results['t']
        self.dev_results = run_results['d']
        
        # evaluate overfitting and underfitting state which used in other tests
        self.overfitting = compute_overfitting(self.train_results, self.dev_results)
        self.underfitting = not self.overfitting and compute_underfitting(self.train_results)
        self.earlystopping()

    def analyze(self):
        epochs_quantity = self.run_record.epochs
        return  {
            'results': {
                'train': self.train_results[epochs_quantity - 1].accuracy_rate,
                'dev': self.dev_results[epochs_quantity - 1].accuracy_rate,
                'test': self.run_record.accuracy
            },
            'overfitting': self.overfitting,
            'underfitting': self.underfitting,
            'early_stopping': self.earlystopping_object,
            'parameters': {
                'epoch' :  self.epochs(),
                'learning_rate' : self.learningRate(),
                'weight_decay': self.weightDecay(),
                'batch_size': self.batch_size(),
                'optimizer': self.optimizer(),
                'loss_type': self.loss_type()
            },
        }

    # evluate epoch size hyper-parameter  
    def epochs(self):
        epochs_quantity = self.run_record.epochs
        analysis = {
            'value': epochs_quantity,
            'status': ParameterModify.KEEP_VALUE,
            'factor': EpochFactor.REASONABLE_VALUE,
            'text': ''
        }

        # conditions which indicate states to increase or decrease epochs quantity 
        if epochs_quantity < 3 and self.train_results[epochs_quantity - 1].accuracy_rate < 0.9:
            analysis['status'] = ParameterModify.INCREASE_VALUE_HR
            analysis['factor'] = EpochFactor.VALUE_TOO_SMALL
        elif self.overfitting:
            if epochs_quantity > 15:
                analysis['status'] = ParameterModify.DECREASE_VALUE_HR
                analysis['factor'] = EpochFactor.OVERFITTING_HR
            elif epochs_quantity > 10:
                analysis['status'] = ParameterModify.DECREASE_VALUE
                analysis['factor'] = EpochFactor.OVERFITTING
        elif not effectiveTrainingStopped(self.train_results)['etStopped']:
            if epochs_quantity <= 5:
                analysis['status'] = ParameterModify.INCREASE_VALUE_HR
                analysis['factor'] = EpochFactor.EFFECTIVE_TRAINNING_HR
            elif epochs_quantity <= 10:
                analysis['status'] = ParameterModify.INCREASE_VALUE
                analysis['factor'] = EpochFactor.EFFECTIVE_TRAINNING
        else:
            analysis['status'] = self.earlystopping()
            if analysis['status'] != ParameterModify.KEEP_VALUE:
                analysis['factor'] = self.earlystopping_object['factor']
        return analysis

    # evaluate learning rate value hyper-parameter
    def learningRate(self):
        learning_rate = self.run_record.learning_rate
        analysis = {
            'value': learning_rate,
            'status': ParameterModify.KEEP_VALUE,
            'factor': LearningRateFactor.REASONABLE_VALUE,
            'text': ''
        }

        # conditions which indicate states to increase or decrease leaning rate value 
        if trainLossIncrease(self.train_results):
            analysis['status'] = ParameterModify.DECREASE_VALUE_HR
            analysis['factor'] =  LearningRateFactor.TRAIN_LOSS_INCREASE
        elif effectiveTrainingStopped(self.train_results)['etStopped']:
            analysis['status'] = ParameterModify.DECREASE_VALUE
            analysis['factor'] = LearningRateFactor.EFFECTIVE_TRAINNING
        elif lossSlightlyDecrease(self.train_results):
            analysis['status'] = ParameterModify.INCREASE_VALUE
            analysis['factor'] = LearningRateFactor.LOSS_TAKES_LONG_TO_CONVERGE
        return analysis
    
    # evaluate weight decay value hyper-parameter
    def weightDecay(self):
        weight_decay = self.run_record.weight_decay
        analysis = {
            'value': weight_decay,
            'status': ParameterModify.KEEP_VALUE,
            'factor': WeightDecayFactor.REASONABLE_VALUE,
            'text': ''
        }
        # conditions which indicate states to increase or decrease weight decay value 
        train_analysis = effectiveTrainingStopped(self.train_results)
        if train_analysis['etStopped'] and train_analysis['epochStopped'] >= 3:
            analysis['status'] = ParameterModify.INCREASE_VALUE
        elif lossSlightlyDecrease(self.train_results):
            analysis['status'] = ParameterModify.DECREASE_VALUE
            analysis['factor'] = WeightDecayFactor.LOSS_TAKES_LONG_TO_CONVERGE
        return analysis

    # check if the model should early stop 
    def earlystopping(self):
        max_epoch = 0
        max_value = 0
        last_epoch = len(self.train_results) - 1
        stop = ParameterModify.KEEP_VALUE
        
        # get max accuracy rate among epochs results
        for epoch, record in self.train_results.items():
            if record.accuracy_rate > max_value:
                max_value = record.accuracy_rate 
                max_epoch = epoch

        # if max value epoch is greater of the final epoch, the model should stop earlier
        difference = max_value - self.train_results[last_epoch - 1].accuracy_rate
        factor = EpochFactor.REASONABLE_VALUE
        if difference >= 0.5:
            stop = ParameterModify.DECREASE_VALUE_HR
            factor = EpochFactor.EARLY_STOPPING_HR
        elif difference >=  0.2:
            stop = ParameterModify.DECREASE_VALUE
            factor = EpochFactor.EARLY_STOPPING
        self.earlystopping_object = {
            'max': {
                'value': max_value,
                'epoch': max_epoch,
                'difference': difference
            },
            'should_early_stop': stop,
            'factor': factor
        }
        return stop
    
    def batch_size(self):
        batch_size = self.run_record.batch_size
        return {
            'value': batch_size,
            'status': ParameterModify.KEEP_VALUE,
            'factor': BatchSizeFactor.REASONABLE_VALUE,
            'text': BatchSizeFactor.REASONABLE_VALUE
        }
    
    def optimizer(self):
        analysis =  {
            'value': self.run_record.optimizer.id,
            'status': ParameterModify.KEEP_VALUE,
            'factor': OptimizerFactor.REASONABLE_VALUE
        }
        if self.underfitting:
            analysis['status'] = ParameterModify.CHANGE_VALUE
        return analysis
    
    def loss_type(self):
        analysis =  {
            'value': self.run_record.loss_type.id,
            'status': ParameterModify.KEEP_VALUE,
            'factor': LossTypeFactor.REASONABLE_VALUE
        }
        if self.underfitting:
            analysis['status'] = ParameterModify.CHANGE_VALUE
        return analysis
