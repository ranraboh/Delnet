import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { updateLayer } from '../../actions/amb/state.js';
import LayerParams from './params.js';
import { init_linear_layer, init_convolution_layer, init_batch_norm, init_dropout, init_flatten_layer, init_pool } from './actions/init.js';
import { display_size } from './actions/display.js';

class SelectedLayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            layer: this.props.layer_selected,
        }

        /* bind internal methods */
        this.linear_selected = this.linear_selected.bind(this);
        this.convolution_selected = this.convolution_selected.bind(this);
        this.flatten_selected = this.flatten_selected.bind(this);
        this.batch_norm_selected = this.batch_norm_selected.bind(this);
        this.dropout_selected = this.dropout_selected.bind(this);
        this.pool_selected = this.pool_selected.bind(this);
        this.on_activation_change = this.on_activation_change.bind(this);
    }

    alert_message() {
        if (this.state.error != '') {
            return(
                <div class="alert alert-warning" role="alert">
                    { this.state.error }
                </div>
            )
        }
        return ''
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.layer_selected)
        this.setState({
            ...this.state,
            layer: nextProps.layer_selected
        })
    }

    linear_selected() {
        if (this.state.layer.input.length > 1) {
            this.setState({
                ...this.state,
                error: 'input for linear layer should be one dimension, you can use different type of layer or use flatten'
            })
        } else {
            this.setState({
                ...this.state,
                layer: init_linear_layer(this.state)
            }, () => {
                this.props.updateLayer(this.state.layer)
            })
        }
    }

    convolution_selected() {
        this.setState({
            ...this.state,
            layer: init_linear_layer(this.state)
        }, () => {
            this.props.updateLayer(this.state.layer)
        })
    }

    convolution_selected() {
        this.setState({
            ...this.state,
            layer: init_convolution_layer(this.state)
        }, () => {
            this.props.updateLayer(this.state.layer)
        })
    }

    batch_norm_selected() {
        this.setState({
            ...this.state,
            layer: init_flatten_layer(this.state)
        }, () => {
            this.props.updateLayer(this.state.layer)
        })
    }

    dropout_selected() {
        this.setState({
            ...this.state,
            layer: init_batch_norm(this.state)
        }, () => {
            this.props.updateLayer(this.state.layer)
        })
    }

    pool_selected() {
        this.setState({
            ...this.state,
            layer: init_dropout(this.state)
        }, () => {
            this.props.updateLayer(this.state.layer)
        })
    }

    pool_selected() {
        this.setState({
            ...this.state,
            layer: init_pool(this.state)
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
            return (<span id="select-section">
                <h6 className="text">no selected layers</h6>
            </span>)
        }
        let alert_message = this.alert_message()
        return (
        <span id="select-section">
            <div id="amb-select-internal">
                <h6 className="text">Layer ID: { this.state.layer.id }</h6>
                <h6 className="text">Input: { display_size(this.state.layer.input) }</h6>
                <h6 className="text">Output: { display_size(this.state.layer.output) }</h6>
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
                                    onClick={ this.pool_selected }>Pool</button>
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
                </div>
            </div>
        </span>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        layer_selected: state.ambReducer.customizable.selected_layer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateLayer: (layer) => {
            dispatch(updateLayer(layer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedLayer);
