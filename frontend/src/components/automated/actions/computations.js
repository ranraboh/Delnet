
import { init_middle_layer } from "./init";
import { isInteger } from "./display";

/* renew or update layers list after action of edit or remove  */
export function renew_layers(layers) {
    for (var i = 0; i < layers.length; i++) {
        layers[i] = update_output(layers[i])
        if (i + 1 < layers.length) {
            layers[i + 1].input = layers[i].output
            if (layers[i + 1].type == 'Convolution') {
                if (layers[i + 1].input.length >= 2) {
                    layers[i + 1].in_channels = layers[i + 1].input[0]
                } else {
                    layers[i + 1].in_channels = 'Invalid'
                }
            }
        }
    }
    return layers
}

/* delete specific layer */
export function delete_layer(layers, delete_index) {
    for (var i = delete_index - 1; i < layers.length - 1; i++) {
        layers[i] = layers[i + 1]
        layers[i].id = i + 1
    }
    layers.pop()
    return layers
}

export function insert_layer(layers, insert_index) {
    for (var i = layers.length; i > insert_index; i--) {
        layers[i] = layers[i - 1]
        layers[i].id = i + 1
    }
    layers[insert_index] = init_middle_layer(layers, insert_index)
    return layers
}

export function valid_layer_configuration(layer) {
    if (layer.type === 'None') {
        return false
    } else if (layer.type === 'Linear') {
        return !isNaN(parseInt(layer.output[0]))
    } else if (layer.type == 'Convolution') {
        return !isNaN(parseInt(layer.out_channels)) && !isNaN(parseInt(layer.kernel_size[0])) && 
            !isNaN(parseInt(layer.kernel_size[1])) && !isNaN(parseInt(layer.strides))
    } else if (layer.type == 'Dropout') {
        return !isNaN(parseFloat(layer.dropout_constant))
    } else if (layer.type == 'Pooling') {
        return !isNaN(parseFloat(layer.window[0])) && !isNaN(parseFloat(layer.window[1]))
    } 
    return true
}

export function invalid_layers_configuraition(layers) {
    var invalid_string = ''
    for (var i = 0; i < layers.length; i++) {
        if (!valid_layer_configuration(layers[i]))
            invalid_string = invalid_string + (i + 1)+ ", "
    }
    if (invalid_string == '')
        return null
    return 'Layers ' + invalid_string.substring(0, invalid_string.length - 2) + " are invalid since the parameters does not configured porperly"
}

export function is_valid_input(input) {
    for (var i = 0; i < input.length; i++) {
        if (!isInteger(input[i]))
            return false
    }
    return true
}

export function product_list(list) {
    let product = 1;
    for (var i = 0; i < list.length; i++)
        product = product * list[i]
    return product
}

/* check for errors after ction of edit or remove */
export function detech_errors(layers) {
    let layer;
    if (layers.length > 0 && layers[0].type == 'Linear')
        return { layer: 1, error: 'Linear module cannot be the first layer of your model architecture since the layer expeced a vector as input while the model receive an image represented by 3 dimesional matrix',is_error:true }
    for (var i = 0; i < layers.length; i++) {        
        /* renew layers list */
        layer = layers[i]
        layers[i] = update_output(layer)
        if (i + 1 < layers.length) 
            layers[i + 1].input = layer.output 
                       
        /* check for errors */
        let input_dimension = layer.input.length;
        if (!is_valid_input(layer.input))  
            return { layer: layer.id, error: 'Input for layer ' + layer.id + ' is invalid, get rid of any configuration error above ', is_error:true }
        if (layer.reshape) {
            if (layer.type == 'Linear' && input_dimension > 1  && product_list(layer.input) != layer.parameters.in_features)
                return { layer: layer.id, error:'your code might have a mismatch, the concern arises since the number of features in the output of prev layer differs from the number of features in the input of current layer. you can check if you have any mismatches in tests section', is_error:false, input_size: product_list(layer.input), in_features: layer.parameters.in_features }
            continue
        }
        if (layer.type === 'Linear' && input_dimension != 1) 
            return { layer: layer.id, error:'Input for linear module in layer ' + layer.id + ' should be vector, try to insert a flatten module before to convert the data into one-dimesional vector as linear module supposed to receive ', is_error:true }
        if (layer.type == 'Convolution' && input_dimension != 3) 
            return { layer: layer.id, error:'Input for convolution module in layer ' + layer.id + '  should be 3 dimesional matrix', is_error:true }
        if (layer.type == 'Convolution' && layer.input[0] != layer.in_channels)
            return { layer:layer.id, error: 'Input for convolution module in layer ' + layer.id + ' supposed to have ' + layer.in_channels + " channels but got " + layer.input[0] + " channels instead", is_error:true }    
        if (layer.type == 'Pooling' && input_dimension != 3) 
            return { layer: layer.id, error:'Input for pooling module in layer ' + layer.id + '  should be 3 dimesional matrix', is_error:true }
    }
    return { layer: -1, error: '', is_error:false }
}

/* update output according to layer defined parameters */
export function update_output(layer) {
    if (layer.type == 'Convolution') {
        if (layer.computed)
            return layer
        layer.output = [ layer.out_channels, 0, 0 ];
        console.log("Convolution")
        console.log(layer)
        console.log(layer.input)
        layer['output'][1] = Math.floor((layer.input[1] - (layer['kernel_size'][0] - 1) -1) / layer['strides']) + 1
        layer['output'][2] = Math.floor((layer.input[2] - (layer['kernel_size'][1] - 1) -1) / layer['strides']) + 1
        console.log(layer.output)
    } else if (layer.type == 'Pooling') {
        console.log(layer)
        layer.output = [ layer.input[0], 0, 0 ]
        if (layer['parameters'] != undefined && layer.parameters['output_size'] != undefined) {
            layer['output'][1] = layer.parameters['output_size'][0]
            layer['output'][2] = layer.parameters['output_size'][1]
        } else if (layer['parameters'] != undefined && layer.parameters['padding'] != undefined && layer.parameters['dilation'] != undefined) {
            layer['output'][1] = Math.floor((layer['input'][1] + 2 * layer.parameters['padding'] - layer.parameters['dilation'] * (layer.parameters['kernel_size'] - 1) -1) / layer.parameters['stride']) + 1
            layer['output'][2] = Math.floor((layer['input'][2] + 2 * layer.parameters['padding'] - layer.parameters['dilation'] * (layer.parameters['kernel_size'] - 1) -1) / layer.parameters['stride']) + 1
        } else {
            layer.output[1] = Math.floor(layer.input[1] / layer.window[0])
            layer.output[2] = Math.floor(layer.input[2] / layer.window[1])
        }
    } else if (layer.type == 'Flatten') {
        let flatten = 1
        for (var i = 0; i < layer.input.length; i++) 
            flatten = flatten * layer.input[i]
        layer.output = [ flatten ]
    } else if (layer.type == 'Dropout' || layer.type == 'BatchNorm' || layer.type == 'Batch Norm') {
        layer.output = layer.input
    }
    return layer;
}