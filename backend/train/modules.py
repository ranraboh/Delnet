import torch
import torch.nn
from layers import modules
from backend.train.modules_dict import ModulesDictionary

class Model():
    def __init__(self):
        modules = [
            (['conv1', 'conv2', 'conv3'], self.convolutionModule),
            (['bn1', 'bn2', 'bn3'], self.BatchNorm),
            (['fc'], self.linearModule),
            (['relu'], self.Activation),
            (['maxpool'], self.Pool),
        ]
        self.activation_modules = {
            'relu': 'Relu'
        }
        self.modules_dict = ModulesDictionary()
        for key, value in modules:
            self.modules_dict.fromkeys(key, value)

    def extractLayersArchitecture(self, model):
        layers = []
        index = 0
        for key, module in model._modules.items():
            # if it contains layers let call it recursively to get params and weights
            if type(module) in [
                torch.nn.modules.container.Container,
                torch.nn.modules.container.Sequential
            ]:
                self.extractLayersArchitecture(module)
            else:
                prev = None
                if index > 0:
                    prev = layers[index - 1]
                layers[index] = self.modules_dict[key](key, module, prev)
            index = index + 1

    def convolutionModule(self, key, module, prev_module):
        return {
            'type': 'Convolution',
            'input': prev_module['output'],
            'output': [ module.out_features, 0, 0 ],
            'parameters': {
                'in_features': module.in_features,
                'out features': module.out_features,
                'kernel_size': module.kernel_size,
                'stride' : module.stride
            }
        }

    def linearModule(self, key, module, prev_module):
        return {
            'type': 'Convolution',
            'input': prev_module['output'],
            'output': [module.out_features, 0, 0],
            'parameters': {
                'in_features': module.in_features,
                'out features': module.out_features,
                'kernel_size': module.kernel_size,
                'stride': module.stride
            }
        }

    def Pool(self, key, module, prev_module):
        return {
            'type': 'Pool',
            'input': prev_module['output'],
            'output': [ prev_module['output'][0], 0, 0 ],
            'parameters': {
                'kernel_size': module.kernel_size,
                'type': 'max'
            }
        }

    def Dropout(self, key, module, prev_module):
        return {
            'type': 'Droupout',
            'input': prev_module['output'],
            'output': prev_module['output'],
            'parameters': {
                'dropout_constant': module.p
            }
        }

    def BatchNorm(self, key, module, prev_module):
        return {
            'type': 'BatchNorm',
            'input': prev_module['output'],
            'output': prev_module['output'],
            'parameters': {}
        }

    def Activation(self, key, module, prev_module):
        prev_module['activation'] = self.activation_modules[key]
        return prev_module
