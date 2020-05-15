import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { updateLayer, dispatchLayers } from '../../actions/amb/state.js';
import { update_output } from './actions/computations'
 
class LayerParams extends Component {
    constructor(props) {
        super(props)
        this.state = {
            layer: this.props.layer_selected
        }
        /* bind internal methods */
        this.on_change = this.on_change.bind(this);
        this.update_components = this.update_components.bind(this);
        this.select_handler = this.select_handler.bind(this);
        this.text_input = this.text_input.bind(this);
        this.choose_input = this.choose_input.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            layer: nextProps.layer_selected
        })
    }

    choose_input(param) {
        if (param.type != 'choose') 
            return '';
        return (<div id={ "input-" + param.id }>
            <select name={ param.id } className="textbox-v1" width="30px"
                onChange={ (e) => this.on_change(param.id, 0, e.target.value) }>
            {
                param.options.map((option, index) =>
                    <option value={ index } selected={ this.state.layer[param.id] == index } >{ option }</option>
                )
            }   
            </select>
            <label className="label-v1">{ param.name }</label>
        </div>)
    }

    text_input(param) {
        let dimensions = param.dimensions
        if (param.type != 'text')
            return ''
        if (dimensions == 0 || dimensions == null || dimensions == undefined) {
            return (
                <div id={ "input-" + param.id }>
                    <input value={ this.state.layer[param.id] } className="textbox-v1" width="30px"
                        onChange={ (e) => this.on_change(param.id, 0, e.target.value) } onBlur={ this.update_components } disabled={ param.disable } ></input>
                    <label className="label-v1">{ param.name }</label>
                </div>
            )
        } else {
            let dimensions_range = Array(dimensions).fill(1).map((x, y) => x + y)
            return (
                <div id={ "input-" + param.id }>
                {
                    dimensions_range.map((dimension) =>
                        <span>
                            <input value={ this.state.layer[param.id][dimension - 1] } className="textbox-v1"
                                onChange={ (e) => this.on_change(param.id, dimension, e.target.value) } onBlur={ this.update_components } disabled={ param.disable } ></input>
                            <label className="label-v1">{ param.name }</label>
                        </span>
                    )
                }
                </div>
            )
        }
    }

    update_components() {
        this.setState({
            ...this.state,
            layer: {
                ...this.state.layer,
                input: this.state.layer.input,
                output: this.state.layer.output,
            }
        }, () => {
            this.props.updateLayer(this.state.layer)
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            layer: nextProps.layer_selected
        })
    }
        
    on_change(field, dimension, value) {
        let layer = this.state.layer
        console.log(dimension)
        console.log(layer[field])
        if (dimension == 0)
            layer[field] = value
        else 
            layer[field][dimension - 1] = value;
        this.setState({
            ...this.state,
            layer: update_output(layer)
        }, () => {
            this.props.updateLayer(this.state.layer)
        })
    }
    
    select_handler(param, option) {
        let layer = this.state.layer
        layer[param.id] = option
        this.setState({
            ...this.state,
            layer: layer
        }, () => {
            this.props.updateLayer(this.state.layer)
        })
    }

    render() {
        if (this.state.layer.type === 'None') {
            return (<div></div>);
        }
        return (
            <div className="layer-parameters">
                <h6 className="text-agency">Parameters:</h6>
                {
                    this.state.layer.params_form.map((param) => 
                    <div id={"param-" + param.name }>
                        <div className="row">
                            <div className="col-4 text text-small">
                                { param.name }
                            </div>
                            <div class="col-6">
                                { this.text_input(param) }
                                { this.choose_input(param) }
                            </div>
                            <div class="col-1">
                                <i class="fa fa-question"></i>
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>)
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
        },
        dispatchLayers: (layers) => {
            dispatch(dispatchLayers(layers))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerParams);
