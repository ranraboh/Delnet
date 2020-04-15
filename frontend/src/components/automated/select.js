import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { updateLayer } from '../../actions/amb/state.js';
import LayerParams from './params.js';

class AmbSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            layer: this.props.layer_selected
        }
        /* bind internal methods */
        this.linear_selected = this.linear_selected.bind(this);
        this.convolution_selected = this.convolution_selected.bind(this);
        this.flatten_selected = this.flatten_selected.bind(this);
        this.batch_norm_selected = this.batch_norm_selected.bind(this);
        this.dropout_selected = this.dropout_selected.bind(this);
        this.on_activation_change = this.on_activation_change.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.layer_selected)
        this.setState({
            ...this.state,
            layer: nextProps.layer_selected
        })
    }

    linear_selected() {
        this.setState({
            ...this.state,
            layer: {
                id: this.state.layer.id,
                type: 'Linear',
                activation: this.state.layer.activation,
                input_dimension: 1,
                output_dimension: 1,
                input: [this.state.layer.input],
                output: ['--'],
                bias: 'yes',
                params_form: [ { id: 'input', name: 'Input features', type: 'text',  dimension: 1, description: 'Enter size of input vector', disable: (this.state.layer.id == 1)?false:true },
                    { id: 'output', name: 'Output features', type: 'text', dimension :1,  description: 'Enter size of output vector', disable: false },
                    { id: 'bias', name: 'Bias', type:'choose', options: ['yes', 'no'] }
                 ]
            }
        }, () => {
            this.props.updateLayer(this.state.layer)
        })
    }

    convolution_selected() {
        let output = [ out_channels ]
        output.append(this.state.input[1] + 2)
        
        this.setState({
            ...this.state,
            layer: {
                id: this.state.layer.id,
                type: 'Convolution',
                activation: this.state.layer.activation,
                input_dimension: 3,
                output_dimension: 3,
                input:  this.state.layer.input,
                output: [ out_channels,  ],
                in_channels: '--',
                out_channels: '--',
                kernel_size: [ '--', '--' ],
                strides: '--',
                params_form: [ { id: 'in_channels', name: 'input features', description: 'enter number of input channels'},
                    { id: 'out_channels', name: 'output features', description: 'enter number of output channels' },
                    { id: 'kernel_size', name: 'kernel size', description: 'enter size of kernel' },
                    { id: 'strides', name: 'strides', description: 'enter size of strides' } ]
            }
        })
    }

    flatten_selected() {
        this.setState({
            ...this.state,
            layer: {
                id: this.state.layer.id,
                type: 'Flatten',
                activation: this.state.layer.activation,
                input: this.state.layer.input,
                output: '---',
                params_form: [ { id: 'input', name: 'Input features', type: 'text', description: 'Enter size of input vector', disable: (this.state.layer.id == 1)? false: true },
                { id: 'output', name: 'Output features', type: 'text', description: 'Enter size of output vector', disable: true } ]            }
        }, () => {
            this.props.updateLayer(this.state.layer)
        })
    }

    batch_norm_selected() {
        this.setState({
            ...this.state,
            layer: {
                id: this.state.layer.id,
                type: 'Batch Norm',
                activation: this.state.layer.activation,
                input: this.state.layer.input,
                output: this.state.layer.input,
                params_form: [ { id: 'input', name: 'Input features', type: 'text', description: 'Enter size of input vector', disable: (this.state.layer.id == 1)? false: true },
                { id: 'output', name: 'Output features', type: 'text', description: 'Enter size of output vector', disable: true } ]
            }
        }, () => {
            this.props.updateLayer(this.state.layer)
        })
    }

    dropout_selected() {
        this.setState({
            ...this.state,
            layer: {
                id: this.state.layer.id,
                type: 'Dropout',
                activation: this.state.layer.activation,
                dropout_constant: '0.5',
                input: this.state.layer.input,
                output: this.state.layer.input,
                params_form: [ { id: 'input', name: 'Input features', type: 'text', description: 'Enter size of input vector', disable: (this.state.layer.id == 1)? false: true },
                    { id: 'output', name: 'Output features', type: 'text', description: 'Enter size of output vector', disable: true },
                    { id: 'dropout_constant', name: 'dropout constant', type: 'text', description: 'enter dropout constant'} ]
            }
        }, () => {
            this.props.updateLayer(this.state.layer)
        })
    }

    on_activation_change(value) {
        this.setState({
            ...this.state,
            layer: {
                ...this.state.layer,
                activation: value
            }
        }, () => {
            this.props.updateLayer(this.state.layer)
        })
    }
    

    render() {
        if (this.state.layer == null) {
            return (<span id="select-section" className="section-in-main">
                <div className="header-section-v2">
                <h1 className="dataset-header-title dataset-header-green">
                    Design Layer
                </h1>
                <p />
                <h6 className="text">no selected layers</h6>
            </div>
            </span>)
        }
        return (
        <span id="select-section" className="section-in-main">
            <div className="header-section-v2">
                <h1 className="dataset-header-title dataset-header-green">
                    Design Layer
                </h1>
            </div>
            <div id="amb-select-internal">
                <h6 className="text">ID: { this.state.layer.id }</h6>
                <h6 className="text">Type: { this.state.layer.type }</h6>
                <div id="layer-types">
                    <table>
                        <row>
                            <td>
                                <button type="button" class="btn btn-primary btn-select"
                                    onClick={ this.linear_selected }>Linear</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-primary btn-select"
                                    onClick={ this.convolution_selected }>Convolution</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-primary btn-select"
                                    onClick={ () => this.on_change('type', 'RNN') }>RNN</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-primary btn-select"
                                    onClick={ () => this.on_change('type', 'LSTM') }>LSTM</button>
                            </td>
                        </row>
                        <row>
                            <td>
                                <button type="button" class="btn btn-primary btn-select"
                                    onClick={ this.flatten_selected }>Flatten</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-primary btn-select"
                                    onClick={ this.batch_norm_selected }>Batch norm</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-primary btn-select"
                                    onClick={ this.dropout_selected }>Dropout</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-primary btn-select"
                                    onClick={ this.dropout_selected }>Pool</button>
                            </td>
                        </row>
                    </table>
                    <h6 className="text">Activation: { this.state.layer.activation }</h6>
                    <table>
                        <row>
                            <td>
                                <button type="button" class="btn btn-info btn-select"
                                    onClick={ () => this.on_activation_change('Relu') }>Relu</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-info btn-select"
                                    onClick={ () => this.on_activation_change('Tanh') }>Tanh</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-info btn-select"
                                    onClick={ () => this.on_activation_change('Sigmoid') }>Sigmoid</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-info btn-select"
                                    onClick={ () => this.on_activation_change('Softmax') }>Softmax</button>
                            </td>
                        </row>
                        <row>
                            <td>
                                <button type="button" class="btn btn-info btn-select"
                                    onClick={ () => this.on_activation_change('Leaky Relu') }>Leaky Relu</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-info btn-select"
                                    onClick={ () => this.on_activation_change('Hard tanh') }>Hard tanh</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-info btn-select"
                                    onClick={ () => this.on_activation_change('None') }>None</button>
                            </td>
                        </row>
                    </table>
                    <LayerParams />
                </div>
            </div>
        </span>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        layer_selected: state.ambReducer.selected_layer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateLayer: (layer) => {
            dispatch(updateLayer(layer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AmbSelect);
