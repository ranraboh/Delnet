import math
def convolution_output(layer):
    parameters = layer['parameters']
    layer['output'] = [parameters['out_channels'], 0, 0]
    layer['output'][1] = math.floor((layer['input'][1] + 2 * parameters['padding'][0] - parameters['dilation'][0] * (parameters['kernel_size'][0] - 1) -1) / parameters['stride'][0]) + 1
    layer['output'][2] = math.floor((layer['input'][2] + 2 * parameters['padding'][1] - parameters['dilation'][1] * (parameters['kernel_size'][1] - 1) -1) / parameters['stride'][1]) + 1
    layer['computed'] = True

def pooling_output(layer):
    parameters = layer['parameters']
    layer['output'] = [layer['input'][0], 0, 0]
    if 'padding' in parameters and 'dilation' in parameters:
        layer['output'][1] = math.floor((layer['input'][1] + 2 * parameters['padding'] - parameters['dilation'] * (parameters['kernel_size'] - 1) -1) / parameters['stride']) + 1
        layer['output'][2] = math.floor((layer['input'][2] + 2 * parameters['padding'] - parameters['dilation'] * (parameters['kernel_size'] - 1) -1) / parameters['stride']) + 1
    else:
        layer['output'][1] = math.floor(layer['input'][1] / parameters['kernel_size'])
        layer['output'][2] = math.floor(layer['input'][2] / parameters['kernel_size'])

def flatten_output(layer):
    output = 1
    for coordiante in layer['input']:
        output = output * coordiante
    layer['output'] = [ output ]

def adaptive_pool_output(layer):
    output = layer['parameters']['output_size']
    layer['output'] = [layer['input'][0], output[0], output[1]]