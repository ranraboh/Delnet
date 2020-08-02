from backend.actions.model import *
from backend.actions.amb import *
from backend.analyze.enums import ParameterModify
from backend.analyze.text import ModelStructure, DropoutFactor
import copy
class ModelAnalyzer():
    def __init__(self, project, runs_data):
        # load essential data
        self.project = project
        layers_file = get_file_layers(self.project.id)
        layers_object =  read_layers(layers_file)
        if layers_object['valid']:
            self.layers = layers_object['layers']
        else:
            self.layers = []

        # compute overfitting and underfitting rate used for model examination
        self.runs_data = runs_data
        self.runs_quantity = runs_data['runs_quantity']['value']
        self.overfitting_rate, self.underfitting_rate = runs_data['fitting_rate']['overfitting'] / self.runs_quantity, runs_data['fitting_rate']['underfitting'] / self.runs_quantity

    def report_imperfections(self):
        if not self.model_analysis:
            self.analyze()
        imperfections = []
        if self.model_analysis['structure']['status'] != ParameterModify.KEEP_VALUE:
            imperfections.append('number of parameters is too low')
        if self.model_analysis['structure']['layers_quantity']['status'] != ParameterModify.KEEP_VALUE:
            imperfections.append('number of layers is too low')
        if self.model_analysis['modules']['dropout']['status'] != ParameterModify.KEEP_VALUE:
            imperfections.append('dropout')
        if self.model_analysis['modules']['batch_normalization']['status'] != ParameterModify.KEEP_VALUE:
            imperfections.append('batch normalization')
        if self.model_analysis['modules']['convolution']['quantity']['status'] != ParameterModify.KEEP_VALUE:
            imperfections.append('convolution')
        if self.model_analysis['modules']['activations']['status'] != ParameterModify.KEEP_VALUE:
            imperfections.append('activations')
        return imperfections
    
    def format_response(self):
        if not self.model_analysis:
            self.analyze()
        analysis = copy.deepcopy(self.model_analysis)
        analysis['structure']['status'] = analysis['structure']['status'].name
        analysis['structure']['parameters']['status'] = analysis['structure']['parameters']['status'].name
        analysis['structure']['layers_quantity']['status'] = analysis['structure']['layers_quantity']['status'].name
        analysis['modules']['dropout']['status'] = analysis['modules']['dropout']['status'].name
        analysis['modules']['dropout']['factor'] = analysis['modules']['dropout']['factor'].name
        analysis['modules']['batch_normalization']['status'] = analysis['modules']['batch_normalization']['status'].name
        analysis['modules']['activations']['status'] =  analysis['modules']['activations']['status'].name
        for _, record in analysis['modules']['convolution'].items():
            record['status'] = record['status'].name
        return analysis

    def analyze(self):
        self.model_analysis = {
            'structure': self.structure(),
            'modules': {
                'batch_normalization': self.batchNormalization(),
                'dropout': self.dropout(),
                'convolution': self.convolution(),
                'activations': self.activations()
            }
        }
        return self.format_response()

    def structure(self):
        parameters_size = parameters_quantity(self.layers)
        layers_quantity = len(self.layers)

        # examine model structure
        dimension_status = ParameterModify.KEEP_VALUE
        layers_status = ParameterModify.KEEP_VALUE
       
        if self.overfitting_rate < 0.5:
            # evaluate status of layers quantity
            if layers_quantity < 40 * self.underfitting_rate:
                layers_status = ParameterModify.INCREASE_VALUE_HR
            elif layers_quantity < 70 * self.underfitting_rate:
                layers_status = ParameterModify.INCREASE_VALUE
            
        dimension_status = layers_status
        # evaluate model structure status
        structure_status = ModelStructure.REASONABLE_STRUCTURE
        if layers_status == ParameterModify.INCREASE_VALUE_HR and dimension_status == ParameterModify.INCREASE_VALUE_HR:
            structure_status = ModelStructure.MODEL_EXTREMELY_SIMPLE
        elif layers_status in [ParameterModify.INCREASE_VALUE_HR, ParameterModify.INCREASE_VALUE ]  and dimension_status == [ParameterModify.INCREASE_VALUE_HR, ParameterModify.INCREASE_VALUE ]:
            structure_status = ModelStructure.MODEL_SIMPLE
        elif layers_status == ParameterModify.KEEP_VALUE:
            structure_status = ModelStructure.PARAMETERS_TOO_SMALL
        elif dimension_status == ParameterModify.KEEP_VALUE:
            structure_status = ModelStructure.LAYERS_TOO_SMALL
        return {
            'parameters': {
                'quantity': parameters_size,
                'status': dimension_status
            },
            'layers_quantity': {
                'quantity': layers_quantity,
                'status': layers_status
            },
            'status': structure_status,
            'text': structure_status.value
        }

    def batchNormalization(self):
        batch_norm = {
            'exist': batchnormn_exists(self.layers),
            'status': ParameterModify.KEEP_VALUE
        }
        if self.underfitting_rate > 0.5 and batch_norm['exist'] == 0:
            batch_norm['status'] = ParameterModify.ADD_MODULE
        return batch_norm
    
    def dropout(self):
        ###todo: check the amount of times it appeared
        dropout = dropout_exists(self.layers)
        dropout['status'] = ParameterModify.KEEP_VALUE
        dropout['factor'] = DropoutFactor.REASONABLE_VALUE
        if self.overfitting_rate > 0.5:
            if dropout['exist']:
                if max(dropout['dropout_constant']) < 0.3:
                    dropout['status'] = ParameterModify.INCREASE_VALUE
                    dropout['factor'] = DropoutFactor.RISE_DROPOUT_CONSTANT
            else:
                dropout['status'] = ParameterModify.ADD_MODULE
                dropout['factor'] = DropoutFactor.ADD_MODULE 
        elif self.underfitting_rate > 0.5 and dropout['exist']:
            dropout['status'] = ParameterModify.DECREASE_VALUE
            dropout['factor'] = DropoutFactor.REDUCE_DROPOUT_CONSTANT
        dropout['text'] = dropout['factor'].value
        return dropout 
    
    def convolution(self):
        convolution_data = convolution_info(self.layers)
        quantity_status = stride_status = kernel_status = ParameterModify.KEEP_VALUE
        if self.underfitting_rate > 0.5:
            # evaluate kernel status
            kernel_status = ParameterModify.CHANGE_VALUE 

            # evaluate stride status
            if convolution_data['stride_avg'] > 10:
                stride_status = ParameterModify.INCREASE_VALUE
            elif convolution_data['stride_avg'] > 5:
                stride_status = ParameterModify.INCREASE_VALUE_HR
            
            # evaluate 
            if convolution_data['quantity'] < 6 * self.underfitting_rate:
                quantity_status = ParameterModify.INCREASE_VALUE_HR
            elif convolution_data['quantity'] < 20 * self.underfitting_rate:
                quantity_status = ParameterModify.INCREASE_VALUE
        elif self.overfitting_rate > 0.5:
            quantity_status = ParameterModify.DECREASE_VALUE
        return {
            'quantity': {
                'value': convolution_data['quantity'],
                'status': quantity_status
            },
            'stride': {
                'average': convolution_data['stride_avg'],
                'status': stride_status
            },
            'kernel_size': {
                'average': convolution_data['kernel_size_avg'],
                'status': kernel_status
            }
        }
    
    def activations(self):
        activations = activations_used(self.layers)
        
        # analyze activation quantity
        activations_quantity = len(activations)
        if activations_quantity < 5:
            status = ParameterModify.INCREASE_VALUE_HR
        elif activations_quantity < 10: 
            status = ParameterModify.INCREASE_VALUE
        
        # analyze actiovations types used
        activations_rate = use_rate_activation(activations)
        try_use = []
        if get_activation_value('Relu', activations_rate) > 0.5:
            try_use = [ 'LeakyRelu', 'PRelu' ]
        if get_activation_value('Sigmoid', activations_rate) + get_activation_value('HardTanh', activations_rate) > 0.5:
            try_use =  [ 'Tanh', 'Relu', 'LeakyRelu' ]
        return {
            'activations_list': activations,
            'activations_quantity': activations_quantity,
            'status': status,
            'activations_rate': activations_rate,
            'try_use': try_use,
            'max_used': max_used_activation(activations_rate)
        }