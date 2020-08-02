import torch.nn
import math
from backend.train.flatten import Flatten

def ObtainLayerModule(layer):
    type = layer['type']
    return modules[type](layer).cuda()

def LinearLayer(layer):
    if layer['bias'] == 0:
        bias = True
    else:
        bias = False
    return torch.nn.Linear(in_features=layer['input'][0], out_features=int(layer['output'][0]), bias=bias)

def ConvolutionLayer(layer):
    modules_vec = [ torch.nn.Conv1d, torch.nn.Conv2d, torch.nn.Conv3d ]
    convolution_module =  modules_vec[ len(layer['input']) - 3 ]
    kernel_size = layer['kernel_size']
    return convolution_module(in_channels=layer['in_channels'], out_channels=int(layer['out_channels']), kernel_size=(int(kernel_size[0]), int(kernel_size[1])), stride=4)

def Dropout(layer):
    return torch.nn.Dropout(p=layer['dropout_constant'])

def Maxpool(layer):
    modules_vec = [ torch.nn.MaxPool1d, torch.nn.MaxPool2d, torch.nn.MaxPool3d ]
    maxpool_module =  modules_vec[ math.min(len(layer['input']) - 3) ]
    return maxpool_module(kernel_size=layer['window'])

def Averagepool(layer):
    modules_vec = [ torch.nn.AvgPool1d, torch.nn.AvgPool2d, torch.nn.AvgPool3d ]
    averagepool_module = modules_vec[ len(layer['input']) - 3 ]
    return maxpool_module(kernel_size=layer['window'])

def BatchNorm(layer):
    modules_vec = [ torch.nn.BatchNorm1d, torch.nn.BatchNorm2d, torch.nn.BatchNorm3d ] 
    batch_module = modules_vec [ len(layer['input']) - 3 ]
    return batch_module(num_features=layer['input'])

def FlattenLayer(layer):
    return Flatten()


modules = {
    'Linear': LinearLayer,
    'Convolution': ConvolutionLayer,
    'Batch Norm': BatchNorm,
    'Maxpool': Maxpool,
    'Averagepool': Averagepool,
    'Dropout' : Dropout,
    'Flatten' : FlattenLayer
}