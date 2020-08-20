from backend.actions.model import *
from backend.actions.amb import *
from backend.analyze.text import ProjectStatus
from backend.analyze.enums import ParameterModify
from backend.analyze.text import ModelStructure, DropoutFactor, ActivationsFactor, ConvolutionFactor
from backend.train.actions import extract_layers
import copy
class ModelAnalyzer():
    def __init__(self, project, project_status, runs_data):
        # load essential data for analysis
        self.project = project
        self.project_status = project_status
        if project.user_upload() or project.popular_model():
            layers_object = extract_layers(self.project)
        else:
            layers_file = get_file_layers(self.project.id)
            layers_object = read_layers(layers_file)
        if layers_object['valid']:
            self.layers = layers_object['layers']
        else:
            self.layers = []
        
        # holds underfitting and overfitting rates for model analysis
        self.runs_data = runs_data
        self.underfitting_rate, self.overfitting_rate = self.runs_data['runs_status']['underfitting']['rate'], self.runs_data['runs_status']['overfitting']['rate']
        
    # report texutally the model structure imperfections 
    def report_imperfections(self):
        # if model analysis didn't triggered yet
        if not self.model_analysis:
            self.analyze()
        
        critical = []
        warnings = []
        critical_case = [ ParameterModify.INCREASE_VALUE_HR, ParameterModify.DECREASE_VALUE_HR, ParameterModify.ADD_MODULE ]
        warning_case = [ ParameterModify.INCREASE_VALUE, ParameterModify.DECREASE_VALUE ]
        # check out the status for different parts of model examination
        # and report in any case of imperfection 
        self.examinations = [
            { 'status': self.model_analysis['structure']['status'], 'text': self.model_analysis['structure']['text'], 'critical_case': [ ModelStructure.MODEL_EXTREMELY_SIMPLE, ModelStructure.MODEL_SIMPLE ], 'warning_case': [ ModelStructure.PARAMETERS_TOO_SMALL, ModelStructure.LAYERS_TOO_SMALL ]  },
            { 'status': self.model_analysis['modules']['convolution']['quantity']['factor'], 'text': self.model_analysis['modules']['convolution']['quantity']['text'] , 'critical_case': [ ConvolutionFactor.GREAT_SHORTAGE_CONVOLUTION, ConvolutionFactor.NO_CONVOLUTION ], 'warning_case': [ ConvolutionFactor.SHORTAGE_CONVOLUTION ] },
            { 'status': self.model_analysis['modules']['dropout']['status'], 'text': self.model_analysis['modules']['dropout']['text'], 'critical_case': critical_case, 'warning_case': warning_case },
            { 'status': self.model_analysis['modules']['batch_normalization']['status'], 'text': 'batch normalization', 'critical_case': critical_case, 'warning_case': warning_case},
            { 'status': self.model_analysis['modules']['activations']['usage']['status'], 'text': self.model_analysis['modules']['activations']['usage']['text'], 'critical_case': critical_case, 'warning_case': warning_case },
        ]
                
        for examination in self.examinations:
            if examination['status'] in examination['critical_case']:
                critical.append(examination['text'])
            elif examination['status'] in examination['warning_case']:
                warnings.append(examination['text'])
        if self.model_analysis['modules']['activations']['type']['status'] != ActivationsFactor.REASONABLE_TYPE:
            warnings.append(self.model_analysis['modules']['activations']['type']['text'])
        return {
            'critical': critical,
            'warnings': warnings
        }
    
    # convert analysis infromation into valid response format
    def format_response(self):
        # in case analyze didn't triggered yet
        if not self.model_analysis:
            self.analyze()

        # response format can't include enums type
        # convert enums entries to string types
        analysis = copy.deepcopy(self.model_analysis)
        analysis['structure']['status'] = analysis['structure']['status'].name
        analysis['structure']['parameters']['status'] = analysis['structure']['parameters']['status'].name
        analysis['structure']['layers_quantity']['status'] = analysis['structure']['layers_quantity']['status'].name
        analysis['modules']['dropout']['status'] = analysis['modules']['dropout']['status'].name
        analysis['modules']['dropout']['factor'] = analysis['modules']['dropout']['factor'].name
        analysis['modules']['convolution']['quantity']['factor'] = analysis['modules']['convolution']['quantity']['factor'].name
        analysis['modules']['batch_normalization']['status'] = analysis['modules']['batch_normalization']['status'].name
        analysis['modules']['activations']['usage']['status'] =  analysis['modules']['activations']['usage']['status'].name
        analysis['modules']['activations']['type']['status'] =  analysis['modules']['activations']['type']['status'].name
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
        
        # in case the model in good state
        if layers_quantity < 20:
            layers_status = ParameterModify.INCREASE_VALUE_HR
        elif layers_quantity < 35:
            layers_status = ParameterModify.INCREASE_VALUE
        dimension_status = layers_status

        # evaluate model structure status
        structure_status = ModelStructure.REASONABLE_STRUCTURE
        if layers_status == ParameterModify.INCREASE_VALUE_HR and dimension_status == ParameterModify.INCREASE_VALUE_HR:
            structure_status = ModelStructure.MODEL_EXTREMELY_SIMPLE
        elif layers_status in [ ParameterModify.INCREASE_VALUE_HR, ParameterModify.INCREASE_VALUE ] and dimension_status in [ParameterModify.INCREASE_VALUE_HR, ParameterModify.INCREASE_VALUE ]:
            structure_status = ModelStructure.MODEL_SIMPLE
        elif layers_status == ParameterModify.KEEP_VALUE and dimension_status in [ ParameterModify.INCREASE_VALUE_HR, ParameterModify.INCREASE_VALUE ]:
            structure_status = ModelStructure.PARAMETERS_TOO_SMALL
        elif dimension_status == ParameterModify.KEEP_VALUE and layers_status in [ ParameterModify.INCREASE_VALUE_HR, ParameterModify.INCREASE_VALUE ]:
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
        if self.project_status in [ ProjectStatus.UNDERFITTING, ProjectStatus.NOT_LEARN ] and batch_norm['exist'] == 0:
            batch_norm['status'] = ParameterModify.ADD_MODULE
        return batch_norm
    
    def dropout(self):
        # returns the number of times dropout appeared        
        dropout = dropout_exists(self.layers)
        # set initial status 
        dropout['status'] = ParameterModify.KEEP_VALUE
        if dropout['exist'] == 0:
            dropout['factor'] = DropoutFactor.UNUSED_REASONABLE_VALUE
        else:
            dropout['factor'] = DropoutFactor.REASONABLE_VALUE

        # in case the project is in overfitting rate
        if self.project_status == ProjectStatus.OVERFITTING:
            if dropout['exist']:  
                # if dropout module exists, evalatue dropout constant
                if max(dropout['dropout_constant']) < 0.3:
                    dropout['status'] = ParameterModify.INCREASE_VALUE
                    dropout['factor'] = DropoutFactor.RISE_DROPOUT_CONSTANT
            else:
                # otherwise recommend to add dropout module into model architecture
                dropout['status'] = ParameterModify.ADD_MODULE
                dropout['factor'] = DropoutFactor.ADD_MODULE 
        elif self.project_status in [ ProjectStatus.UNDERFITTING, ProjectStatus.NOT_LEARN ] and dropout['exist']:
            # in case underfitting rate across the different runs is grater then 50 percent
            # the model is too much regularized and therefore recommend to decrease dropout constant value
            dropout['status'] = ParameterModify.DECREASE_VALUE
            dropout['factor'] = DropoutFactor.REDUCE_DROPOUT_CONSTANT
        dropout['text'] = dropout['factor'].value
        return dropout 
    
    def convolution(self):
        convolution_data = convolution_info(self.layers)
        quantity_status = stride_status = kernel_status = ParameterModify.KEEP_VALUE
        factor = ConvolutionFactor.REASONABLE_USAGE

        # evaluate status in case the project in good state
        if convolution_data['quantity'] == 0:
            quantity_status = ParameterModify.INCREASE_VALUE_HR
            factor = ConvolutionFactor.NO_CONVOLUTION
        elif convolution_data['quantity'] < 6:
            quantity_status = ParameterModify.INCREASE_VALUE
            factor = ConvolutionFactor.GREAT_SHORTAGE_CONVOLUTION
        
        # evaluate status when the project in underfitting state
        elif self.project_status in [ ProjectStatus.UNDERFITTING, ProjectStatus.NOT_LEARN ]:
            # evaluate kernel status
            kernel_status = ParameterModify.CHANGE_VALUE 

            # evaluate stride status
            if convolution_data['stride_avg'] > 10:
                stride_status = ParameterModify.INCREASE_VALUE
            elif convolution_data['stride_avg'] > 5:
                stride_status = ParameterModify.INCREASE_VALUE_HR
            
            # evaluate frequency usage of convolution module
            if convolution_data['quantity'] < 12 * self.underfitting_rate:
                quantity_status = ParameterModify.INCREASE_VALUE_HR
                factor = ConvolutionFactor.GREAT_SHORTAGE_CONVOLUTION
            elif convolution_data['quantity'] < 20 * self.underfitting_rate:
                quantity_status = ParameterModify.INCREASE_VALUE
                factor = ConvolutionFactor.SHORTAGE_CONVOLUTION
        elif self.project_status == ProjectStatus.OVERFITTING:
            quantity_status = ParameterModify.DECREASE_VALUE
            factor = ConvolutionFactor.OVERUSED_CONVOLUTION
        return {
            'quantity': {
                'value': convolution_data['quantity'],
                'status': quantity_status,
                'factor': factor,
                'text': factor.value
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
        activations, activations_quantity = activations_used(self.layers)
        status = ParameterModify.KEEP_VALUE
        factor = ActivationsFactor.REASONABLE_TYPE

        # analyze activation frequency usage
        size_factor = ActivationsFactor.REASONABLE_USAGE

        # in case model in good state
        if activations_quantity == 0:
            status = ParameterModify.INCREASE_VALUE_HR
            factor = ActivationsFactor.NO_ACTIVATIONS
        elif activations_quantity < 5:
            status = ParameterModify.INCREASE_VALUE
            factor = ActivationsFactor.LACK_OF_ACTIVATIONS

        # in case model in underfitting state
        if self.project_status in [ ProjectStatus.UNDERFITTING, ProjectStatus.NOT_LEARN ]:
            if activations_quantity < 5:
                status = ParameterModify.INCREASE_VALUE_HR
                factor = ActivationsFactor.GREAT_LACK_OF_ACTIVATIONS
            elif activations_quantity < 10: 
                status = ParameterModify.INCREASE_VALUE
                factor = ActivationsFactor.LACK_OF_ACTIVATIONS
        elif self.project_status == ProjectStatus.OVERFITTING:
            if activations_quantity > 20:
                status = ParameterModify.DECREASE_VALUE
                factor = ActivationsFactor.OVERUSE_ACTIVATIONS
            elif activations_quantity > 30:
                status = ParameterModify.DECREASE_VALUE_HR
                factor = ActivationsFactor.OVERUSE_ACTIVATIONS

        # analyze activations types used
        activations_rate = use_rate_activation(activations)
        try_use = []
        type_status = ActivationsFactor.REASONABLE_TYPE
        
        # overuse relu activations function can lead to dead relu phenomenon
        if get_activation_value('Relu', activations_rate) > 0.5 and activations_rate['Relu'] > 5:
            try_use = [ 'LeakyRelu', 'PRelu' ]
            type_status = ActivationsFactor.OVERUSE_RELU
        if get_activation_value('Sigmoid', activations_rate) + get_activation_value('HardTanh', activations_rate) > 0.5:
            try_use =  [ 'Tanh', 'Relu', 'LeakyRelu' ]
            type_status = ActivationsFactor.SIGMOID_TANH_USE
        return {
            'activations_list': activations,
            'activations_rate': activations_rate,
            'max_used': max_used_activation(activations_rate),
            'usage': {
                'activations_quantity': activations_quantity,
                'status': status,
                'factor': factor.name,
                'text': factor.value,
            },
            'type': {
                'try_use': try_use,
                'status': type_status,
                'text': type_status.value
            }
        }