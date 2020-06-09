import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import LayerItem from './layer.js'
import Modal from './modal.js';
import { selectLayer, addLayer, dispatchLayers } from '../../actions/amb/state.js';
import { display_size } from '../automated/actions/display.js';
import { renew_layers, detech_errors, delete_layer } from "./actions/computations";
import ErrorBox from '../general/error'

class ModelLayers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            layers: props.layers,
            buttons: {
                add: { id:'btn-add', icon: 'fa fa-plus-square-o' , text: 'Add Layer', hover:false },
                save: { id:'btn-save', icon: 'fa fa-floppy-o', text: 'Save', hover:false }
            },
            error: '',
            layer_error: -1
        }

        /* bind internal methods */
        this.save_hover_abort = this.save_hover_abort.bind(this);
        this.save_hover = this.save_hover.bind(this);
        this.add_hover_abort = this.add_hover_abort.bind(this);
        this.add_hover = this.add_hover.bind(this);
        this.add_layer = this.add_layer.bind(this);
        this.save_click = this.save_click.bind(this);
        this.delete_click = this.delete_click.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('model receive props')
        this.setState({
            ...this.state,
            layers: nextProps.layers
        })
    }

    delete_click(layer_id) {
        let layers = delete_layer(this.state.layers, layer_id)
        this.props.dispatchLayers(layers)
        let error = detech_errors(this.state.layers)
        if (error != '') {
            this.setState({
                ...this.state,
                error: error.error,
                layer_error: error.layer
            })
        }
    }

    save_click() {
        let error = detech_errors(this.state.layers)
        if (error == '') {
            this.props.save_handler()
        } else {
            this.setState({
                ...this.state,
                error: error
            })
        }
    }

    add_layer() {
        this.props.addLayer()
    }

    add_hover_abort() {
        let add = this.state.buttons.add
        add.hover = false;
        this.setState({
            ...this.state,
            buttons: {
                ...this.state.buttons,
                add
            }
        })
    }

    add_hover() { 
        let add = this.state.buttons.add
        add.hover = true;
        this.setState({
            ...this.state,
            buttons: {
                ...this.state.buttons,
                add
            }
        })
    }

    save_hover_abort() {
        let save = this.state.buttons.save
        save.hover = false;
        this.setState({
            ...this.state,
            buttons: {
                ...this.state.buttons,
                save
            }
        })
    }

    save_hover() { 
        let save = this.state.buttons.save
        save.hover = true;
        this.setState({
            ...this.state,
            buttons: {
                ...this.state.buttons,
                save
            }
        })
    }

    display_selected_layer() {
        if (this.props.selected_layer != null) {
            return (<Modal />)
        }
        return ''
    }

    render() {
        return (
            <div id="amb-model-internal">
                { this.display_selected_layer() }
                <h6 id="layers-quantity-statement" className="text">
                    the model currently consist of { this.props.layers_quantity } layers
                </h6>
                <p />
                <div className="container">
                        {
                            this.state.layers.map((layer) => 
                                <LayerItem id={ layer.id } error={ this.state.layer_error == layer.id } layer={ layer } type={ layer.type } input={ display_size(layer.input) } on_select={ this.props.selectLayer } on_delete={ this.delete_click }
                                    output={ display_size(layer.output) } activation={ layer.activation } params={ layer.params_form } />
                            ) 
                        }
                </div>
                <div id="layers-operations">
                    <button id="btn-add" className="btn btn-primary btn-round" onMouseEnter={ this.add_hover } 
                        onMouseLeave={ this.add_hover_abort } onClick={ this.add_layer }>
                        <i className={ this.state.buttons.add.icon }></i>
                        { (this.state.buttons.add.hover)? ' ' + this.state.buttons.add.text: '' }
                    </button>
                    <button className="btn btn-dark btn-round" onMouseEnter={ this.save_hover } onMouseLeave={ this.save_hover_abort } onClick={ this.props.save_handler } >
                        <i className={ this.state.buttons.save.icon }></i>
                        { (this.state.buttons.save.hover)? ' ' + this.state.buttons.save.text: '' }
                    </button>
                </div>
                <p/><p/><p/><p/>
                <ErrorBox strong={ 'Error!' } message={ this.state.error } color="danger" />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        layers: state.ambReducer.customizable.layers,
        selected_layer: state.ambReducer.customizable.selected_layer,
        layers_quantity: state.ambReducer.customizable.layers_quantity,
        details: state.ambReducer.details
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectLayer: (layer) => {
            dispatch(selectLayer(layer))
        },
        addLayer: () => {
            dispatch(addLayer())
        },
        dispatchLayers: (layers) => {
            dispatch(dispatchLayers(layers))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelLayers);
