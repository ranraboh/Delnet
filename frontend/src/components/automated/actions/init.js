export function init_new_layer(state) {
    let new_layer = {
        id: state.customizable.layers_quantity + 1,
        type: 'None',
        input: (state.customizable.layers_quantity > 0)? state.customizable.layers[state.customizable.layers_quantity - 1].output : [ 3, 64, 64],
        output: '--',
        activation: 'None',
        params_form: []
    }
    return new_layer;
}
export function init_middle_layer(layers, index) {
    let new_layer = {
        id: index + 1,
        type: 'None',
        input: layers[index - 1].output,
        output: '--',
        activation: 'None',
        params_form: []
    }
    return new_layer;
}

export function init_linear_layer(state) {
    return (
        {
            id: state.layer.id,
            type: 'Linear',
            activation: state.layer.activation,
            input: (state.layer.id == 1)? [3, 64, 64 ] : [ state.layer.input ],
            output: [ '--' ],
            bias: '0',
            params_form: [ { id: 'input', name: 'Input Features', type: 'text',  dimensions: 1, description: 'Enter size of input vector', disable: true },
                { id: 'output', name: 'Output Features', type: 'text', dimensions: 1,  description: 'Enter size of output vector', disable: false },
                { id: 'bias', name: 'Bias', type:'choose', options: ['yes', 'no'] }
            ]
        }
    )
}

export function init_convolution_layer(state) {
    return ({
        id: state.layer.id,
        type: 'Convolution',
        activation: state.layer.activation,
        input_dimension: 3,
        output_dimension: 3,
        input: (state.layer.id == 1)? [3, 64, 64 ] : state.layer.input,
        output: '--',
        in_channels: state.layer.input[0],
        out_channels: '',
        kernel_size: [ '', '' ],
        strides: '',
        params_form: [ { id: 'in_channels', name: 'Input Channels', type: 'text', dimensions: 0, description: 'enter number of input channels', disable:true},
            { id: 'out_channels', name: 'Output Channels', type: 'text', dimensions: 0, description: 'enter number of output channels' },
            { id: 'kernel_size', name: 'Kernel Size', type: 'text', dimensions: 2, description: 'enter size of kernel' },
            { id: 'strides', name: 'Strides', type: 'text', dimensions: 0, description: 'enter size of strides' } ]
    })
}

export function init_flatten_layer(state) {
    let output_dimension = 1;
    for (var i = 0; i < state.layer.input.length; i++)
        output_dimension *= state.layer.input[i]
    return (
        {
            id: state.layer.id,
            type: 'Flatten',
            activation: state.layer.activation,
            input: (state.layer.id == 1)? [3, 64, 64 ] : state.layer.input,
            output: [ output_dimension ],
            params_form: []        
        }
    )
}

export function init_batch_norm(state) {
    return ({
        id: state.layer.id,
        type: 'Batch Norm',
        activation: state.layer.activation,
        input: state.layer.input,
        output: state.layer.input,
        params_form: []
    })
}

export function init_dropout(state) {
    return ({
        id: state.layer.id,
        type: 'Dropout',
        activation: state.layer.activation,
        dropout_constant: '0.5',
        input: state.layer.input,
        output: state.layer.input,
        params_form: [
            { id: 'dropout_constant', name: 'dropout constant', type: 'text', description: 'enter dropout constant'} ]
    })
}

export function init_pool(state) {
    return ({
        id: state.layer.id,
        type: 'Pooling',
        activation: state.layer.activation,
        input: (state.layer.id == 1)? [3, 64, 64 ] : state.layer.input,
        output: '--',
        window: ['' , ''],
        pooling_type: 0,
        params_form: [
            { id: 'pooling_type', name: 'type', type:'choose', options: [ 'max-pool', 'average-pool', 'sum-pool' ] },
            { id: 'window', name: 'window', type: 'text', dimensions:2, description: 'enter window size'} 
        ]
    })
}