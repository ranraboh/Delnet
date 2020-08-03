from backend.actions.computations import *
import re
import torch
import torch.nn

class LayersExtractor():
    def __init__(self):
        self.modules = [
            (torch.nn.Conv1d, 'Convolution'),
            (torch.nn.Conv2d, 'Convolution'),
            (torch.nn.Conv3d, 'Convolution'),
            (torch.nn.Linear, 'Linear'),
            (torch.nn.AvgPool1d, 'Average Pool'),
            (torch.nn.AvgPool2d, 'Average Pool'),
            (torch.nn.AvgPool3d, 'Average Pool'),
            (torch.nn.MaxPool1d, 'Max Pool'),
            (torch.nn.MaxPool2d, 'Max Pool'),
            (torch.nn.MaxPool3d, 'Max Pool'),
            (torch.nn.AdaptiveAvgPool1d, 'Adaptive Average Pool'),
            (torch.nn.AdaptiveAvgPool2d, 'Adaptive Average Pool'),
            (torch.nn.AdaptiveAvgPool3d, 'Adaptive Average Pool'),
            (torch.nn.BatchNorm1d, 'Batch Norm'),
            (torch.nn.BatchNorm2d, 'Batch Norm'),
            (torch.nn.BatchNorm3d, 'Batch Norm'),
            (torch.nn.Dropout, 'Dropout'),
            (torch.nn.Tanh, 'Tanh'),
            (torch.nn.ReLU, 'Relu'),
            (torch.nn.Hardtanh, 'Hardtanh'),
            (torch.nn.Sigmoid, 'Sigmoid'),
            (torch.nn.Softmax, 'Softmax'),
            (torch.nn.LogSoftmax, 'LogSoftmax'),
            (torch.nn.PReLU, 'PRelu'),
            (torch.nn.LeakyReLU, 'LeakyRelu'),
        ]
        self.methodModule = {
            'Convolution': self.convolutionModule,
            'Linear': self.linearModule,
            'Average Pool' : self.avaragePool,
            'Adaptive Average Pool': self.adaptiveAveragePool,
            'Max Pool': self.maxPool,
            'Batch Norm': self.batchNorm,
            'Dropout': self.dropout,
            'Flatten': self.flatten,
            'Tanh': self.activation,
            'Relu': self.activation,
            'Hardtanh': self.activation,
            'Sigmoid': self.activation,
            'Softmax': self.activation,
            'LogSoftmax': self.activation,
            'PRelu': self.activation,
            'LeakyRelu': self.activation,
        }

        self.functions = [
            'view', 'reshape', 'permute'
        ]

        self.activations = {
            torch.nn.Tanh: 'Tanh',
            torch.nn.ReLU: 'Relu',
            torch.nn.Hardtanh: 'Hardtanh',
            torch.nn.Sigmoid: 'Sigmoid',
            torch.nn.Softmax: 'Softmax',
            torch.nn.LogSoftmax: 'LogSoftmax',
            torch.nn.PReLU: 'PRelu',
            torch.nn.LeakyReLU: 'LeakyRelu'
        }


    def get_model_content(self, file_path, modules):
        nameToModuleMapper = self.nameToModule(modules)
        modules = []
        is_forward = False
        file = open(file_path, 'r')
        for line in file:
            if not is_forward:
                search = re.search(".*forward.*", line)
                if search:
                    is_forward = True
            else:
                moduleInLine = { }
                for function in self.functions:
                    search = re.search(function, line)
                    if search:
                        moduleInLine[search.start()] = { 'type': function, 'module': None, 'bundle': False }
                for key, value in nameToModuleMapper.items():
                    search = re.finditer(key, line)
                    for m in search:
                        moduleInLine[m.start()] = value
                for key in sorted(moduleInLine.keys(), reverse=True):
                    self.insert_modules(modules, moduleInLine[key])
        file.close()
        return modules

    def insert_modules(self, modules, current):
        if current['bundle']:
            for module in current:
                if module != 'bundle':
                    self.insert_modules(modules, current[module])
        else:
            modules.append(current)

    def nameToModule(self, modules):
        map = { }
        for key, layer in modules.items():
            # if it contains layers let call it recursively to get params and weights
            if type(layer) in [
                torch.nn.modules.container.Container,
                torch.nn.modules.container.Sequential
            ] or len(layer._modules) > 0:
                map[key] = self.nameToModule(layer._modules)
                map[key]['bundle'] = True
            else:
                for module in self.modules:
                    if isinstance(layer, module[0]):
                        map[key] = { 'type': module[1], 'module': layer, 'bundle': False }

        return map

    def extractLayers(self, file_path, model):
        layers = []
        order = self.get_model_content(file_path, model._modules)
        return self.buildLayersArchitecture(order)

    def buildLayersArchitecture(self, modules):
        layers = []
        prev = {'output': [3, 64, 64]}
        reshape = None
        index = 1
        for module in modules:
            if len(layers) > 0:
                prev = layers[-1]
            layer = self.layer_data(module, prev)
            if layer is None:
                if module['type'] in ['view' , 'reshape', 'permute']:
                    reshape = module['type']
                else:
                    reshape = None
                continue
            layer['reshape'] = reshape
            reshape = None
            layer['id'] = index
            layers.append(layer)
            index = index + 1
        return layers

    def convolutionModule(self, name, module, prev_module):
        layer = {
            'name': name,
            'type': 'Convolution',
            'input': prev_module['output'],
            'output': [ module.out_channels, 0, 0 ],
            'activation': 'None',
            'in_channels': module.in_channels,
            'out_channels': module.out_channels,
            'kernel_size': module.kernel_size,
            'strides' : module.stride[0],
            'padding' : module.padding,
            'dilation' : module.dilation,
            'parameters': {
                'in_channels': module.in_channels,
                'out_channels': module.out_channels,
                'kernel_size': module.kernel_size,
                'stride' : module.stride,
                'padding' : module.padding,
                'dilation' : module.dilation
            },
            'params_form': [ 
            { 'id': 'in_channels', 'name': 'Input Channels', 'type': 'text', 'dimensions': 0, 'description': 'enter number of input channels', 'disable': True },
            { 'id': 'out_channels', 'name': 'Output Channels', 'type': 'text', 'dimensions': 0, 'description': 'enter number of output channels' },
            { 'id': 'kernel_size', 'name': 'Kernel Size', 'type': 'text', 'dimensions': 2, 'description': 'enter size of kernel' },
            { 'id': 'strides', 'name': 'Strides', 'type': 'text', 'dimensions': 0, 'description': 'enter size of strides' },
            ]
        }
        convolution_output(layer)
        return layer

    def layer_data(self, layer, prev):
        if layer['type'] in self.methodModule:
            return self.methodModule[layer['type']](layer['type'], layer['module'], prev)
        return None

    def linearModule(self, name, module, prev_module):
        print (module.bias)
        return {
            'name': name,
            'type': 'Linear',
            'input': prev_module['output'],
            'output': [ module.out_features ],
            'activation': 'None',
            'bias': int(module.bias[0]),
            'parameters': {
                'in_features': module.in_features,
                'out features': module.out_features
            },
            'params_form': [ { 'id': 'input', 'name': 'Input Features', 'type': 'text',  'dimensions': 1, 'description': 'Enter size of input vector', 'disable': True },
                { 'id': 'output', 'name': 'Output Features', 'type': 'text', 'dimensions': 1,  'description': 'Enter size of output vector', 'disable': False },
                { 'id': 'bias', 'name': 'Bias', 'type':'choose', 'options': ['yes', 'no'] }
            ]
        }

    def pool(self, name, module, prev_module, type):
        layer = {
            'name': name,
            'type': 'Pooling',
            'input': prev_module['output'],
            'output': [ ],
            'activation': 'None',
            'window': (module.kernel_size, module.kernel_size),
            'pooling_type': type,
            'parameters': {
                'kernel_size': module.kernel_size,
                'type': type
            },

            'params_form': [
                { 'id': 'pooling_type', 'name': 'type', 'type':'choose', 'options': [ 'max-pool', 'average-pool', 'sum-pool' ] },
                { 'id': 'window', 'name': 'window', 'type': 'text', 'dimensions' : 2, 'description': 'enter window size'} 
            ]
        }
        pooling_output(layer)
        return layer

    def adaptivePool(self, name,module, prev_module, type):
        layer = {
            'name': name,
            'type': 'Pooling',
            'input': prev_module['output'],
            'output': module.output_size,
            'activation': 'None',
            'pooling_type': type,
            'window': [2, 2],
            'parameters': {
                'type': type,
                'output_size': module.output_size
            },
            'params_form': [
                { 'id': 'pooling_type', 'name': 'type', 'type':'choose', 'options': [ 'max-pool', 'average-pool', 'sum-pool' ] },
                { 'id': 'window', 'name': 'window', 'type': 'text', 'dimensions' : 2, 'description': 'enter window size'} 
            ]
        }
        adaptive_pool_output(layer)
        return layer

    def maxPool(self, name, module, prev_module):
        return self.pool(name, module, prev_module, 0)

    def adaptiveMaxPool(self, name, module, prev_module):
        return self.adaptivePool(name, module, prev_module, 0)

    def avaragePool(self, name, module, prev_module):
        return self.pool(name, module, prev_module, 1)

    def adaptiveAveragePool(self, name, module, prev_module):
        return self.adaptivePool(name, module, prev_module, 1)

    def dropout(self, name, module, prev_module):
        return {
            'name': name,
            'type': 'Droupout',
            'input': prev_module['output'],
            'output': prev_module['output'],
            'activation': 'None',
            'dropout_constant': module.p,
            'parameters': {
                'dropout_constant': module.p
            },
            'params_form': [ { 'id': 'dropout_constant', 'name': 'dropout constant', 'type': 'text', 'description': 'enter dropout constant'} ]
        }

    def batchNorm(self, name, module, prev_module):
        return {
            'name': name,
            'type': 'BatchNorm',
            'input': prev_module['output'],
            'output': prev_module['output'],
            'activation': 'None',
            'parameters': {},
            'params_form': {},
        }

    def flatten(self, name, prev_module):
        layer = {
            'name': name,
            'type': 'Flatten',
            'input': prev_module['output'],
            'activation': 'None',
            'parameters': {},
            'params_form': {},
        }
        flatten_output(layer)
        return layer

    def activation(self, name, module, prev_module):
        for key, value in self.activations.items():
            if isinstance(module, key):
                prev_module['activation'] = value
                prev_module['activation_name'] = name
                break
        return None