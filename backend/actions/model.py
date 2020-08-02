def dropout_exists(layers):
    exist = 0
    constants = []
    for layer in layers:
        if layer['type'] == 'Dropout':
            exist = exist + 1
            constant.append(layer['parameters']['dropout_constant'])
    return { 'exist': exist, 'dropout_constant': constants  }

def batchnormn_exists(layers):
    exist = 0
    for layer in layers:
        if layer['type'] == 'BatchNorm':
            exist = exist + 1
    return exist

def activations_used(layers):
    activations = {}
    for layer in layers:
        activation = layer['activation']
        if activation != None and activation != 'None':
            if activation not in layers:
                activations[activation] = 0
            activations[activation] += 1
    return activations
    
def module_used(layers):
    modules = {}
    for layer in layers:
        type = layer['type']
        if type not in modules:
            modules[type] = 0
        modules[type] += 1
    return modules


def module_exists(layers, type):
    exist = 0
    constants = []
    for layer in layers:
        if layer['type'] == type:
            exist = exist + 1
    return exist

def convolution_info(layers):
    quantity = 0
    stride_sum = 0
    kernal_size_sum = 0
    for layer in layers:
        if layer['type'] != 'Convolution':
            continue
        
        # compute statics
        kernel_size = layer['kernel_size']
        quantity += 1
        stride_sum += int(layer['strides'])
        kernal_size_sum += (int(kernel_size[0]) * int(kernel_size[1]))

    stride_avg = kernal_size_avg = 0
    if quantity != 0:
        stride_avg = stride_sum / quantity
        kernal_size_avg = kernal_size_sum / quantity
    return {
        'quantity': quantity,
        'stride_avg': stride_avg,
        'kernel_size_avg': kernal_size_avg
    }

def parameters_quantity(layers):
    parameters = 0
    for layer in layers:
        if layer['type'] == 'Linear':
            parameters += (layer['input'][0] * int(layer['output'][0]))
        elif layer['type'] == 'Convolution':
            kernel_size = layer['kernel_size']
            out_channels = int(layer['out_channels'])
            in_channels = layer['in_channels']
            parameters +=  (in_channels * out_channels * int(kernel_size[0]) * int(kernel_size[1])) + out_channels
    return parameters

def use_rate_activation(activations):
    sum = 0
    activations_rate = {}
    
    # compute total number of activations usage in model
    for _, frequency in activations.items():
        sum = sum + frequency

    # iterate through activations and compute usage rate in model
    for activation, frequency in activations.items():
        activations_rate[activation] = frequency / sum
    return activations_rate

def max_used_activation(activations):
    max_value = 0
    max_activation = 'None'
    for activation, frequency in activations.items():
        if frequency > max_value:
            max_value = frequency
            max_activation = activation
    return {
        'activation': max_activation,
        'value': max_value
    }

def get_activation_value(activation, activations):
    if activation not in activations:
        return 0
    return activations[activation]