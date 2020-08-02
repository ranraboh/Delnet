/* renew or update layers list after action of edit or remove  */
export function renew_layers(layers) {
    console.log('edit action')
    console.log(layers)
    for (var i = 0; i < layers.length; i++) {
        layers[i] = update_output(layers[i])
        if (i + 1 < layers.length)
            layers[i + 1].input = layers[i].output
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
    console.log('delete output')
    console.log(layers)
    return layers
}

/* check for errors after ction of edit or remove */
export function detech_errors(layers) {
    let layer;
    console.log(layers)
    for (var i = 0; i < layers.length; i++) {        
        /* renew layers list */
        layer = layers[i]
        layers[i] = update_output(layer)
        if (i + 1 < layers.length) 
            layers[i + 1].input = layer.output

        /* check for errors */
        let input_dimension = layer.input.length;
        if (layer.type === 'Linear' && input_dimension != 1) 
            return 'Input for linear module in layer ' + layer.id + ' should be vector'
        if (layer.type == 'Convolution' && input_dimension != 3) 
            return 'Input for convolution module in layer ' + layer.id + '  should be 3 dimesional matrix'
        if (layer.type == 'Pool' && input_dimension != 3) 
            return 'Input for pooling module in layer ' + layer.id + '  should be 3 dimesional matrix'
    }
    return ''
}

/* update output according to layer defined parameters */
export function update_output(layer) {
    if (layer.type == 'Convolution') {
        layer.output = [ layer.out_channels, 0, 0 ];
        layer.output[1] = Math.ceil((layer.input[1] - (layer.kernel_size[0] - 2)) / layer.strides - 1) + 1;
        layer.output[2] = Math.ceil((layer.input[2] - (layer.kernel_size[1] - 2)) / layer.strides - 1) + 1;
    } else if (layer.type == 'Pooling') {
        layer.output = [ layer.input[0], 0, 0 ]
        layer.output[1] = Math.ceil(layer.input[1] / layer.window[0])
        layer.output[2] = Math.ceil(layer.input[2] / layer.window[1])
    } else if (layer.type == 'Flatten') {
        let flatten = 1
        for (var i = 0; i < layer.input.length; i++) 
            flatten = flatten * layer.input[i]
        layer.output = [ flatten ]
    }
    return layer;
}