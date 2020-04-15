import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { updateLayer } from '../../actions/amb/state.js';

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
        console.log(nextProps.layer_selected)
        this.setState({
            ...this.state,
            layer: nextProps.layer_selected
        })
    }
        
    on_change(field, dimension, value) {
        console.log('on change')
        let layer = this.state.layer
        if (dimension == 0)
            layer[field] = value
        else 
            layer[field][dimension - 1] = value
        this.setState({
            ...this.state,
            layer
        })
    }
    
    select_handler(param, option) {
        console.log(option)
        console.log(param.id)
        console.log(this.state.layer)
        let layer = this.state.layer
        layer[param.id] = option
        this.setState({
            ...this.state,
            layer: {
                ...this.state.layer,
                layer
            }
        }, () => {
            console.log(this.state.layer)
            this.props.updateLayer(this.state.layer)
        })
    }

    render() {
        if (this.state.layer.type === 'None') {
            return (<div></div>);
        }
        return (
            <div className="layer-parameters">
                <h6 className="text">Parameters:</h6>
                {
                    this.state.layer.params_form.map((param) => 
                    <div id={"param-" + param.name }>
                        <div className="row">
                            <div className="col-2 text text-small">
                                { param.name }
                            </div>
                            <div class="col-sm">
                                { (param.type == 'text')? (
                                    <div>
                                        <input value={ (param.dimension == 0)? this.state.layer[param.id]: this.state.layer[param.id][param.dimension] } className="textbox-v1" placeholder={ param.description }
                                            onChange={ (e) => this.on_change(param.id, param.dimension, e.target.value) } onBlur={ this.update_components } disabled={ param.disable } ></input>
                                        <label className="label-v1">{ param.name }</label>):
                                    </div>) : (
                                        param.options.map((option) =>
                                            <p>
                                                <input type="radio" name="gender-group" className="radio-button-v1 radio-button-v1-blue" checked= { this.state.layer[param.id] == option } />
                                                <label className="radio-button-v1-label" for={ option } onClick={ () => this.select_handler(param, option) }>{ option }</label>
                                            </p>
                                        )
                                    )
                                }
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
        layer_selected: state.ambReducer.selected_layer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateLayer: (layer) => {
            console.log('updateing..')
            dispatch(updateLayer(layer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerParams);
