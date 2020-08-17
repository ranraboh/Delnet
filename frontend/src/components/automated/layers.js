import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import LayerItem from './layer.js'
import Modal from './modal.js';
import { selectLayer, addLayer, dispatchLayers } from '../../actions/amb/state.js';
import { display_size } from '../automated/actions/display.js';
import { invalid_layers_configuraition, detech_errors, delete_layer, insert_layer } from "./actions/computations";
import ErrorBox from '../general/error'
import layers from '../project/layers.js';

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
            layer_error: -1,
            page: 1,
            page_size: 10
        }

        /* bind internal methods */
        this.save_hover_abort = this.save_hover_abort.bind(this);
        this.save_hover = this.save_hover.bind(this);
        this.add_hover_abort = this.add_hover_abort.bind(this);
        this.add_hover = this.add_hover.bind(this);
        this.add_layer = this.add_layer.bind(this);
        this.handle_errors = this.handle_errors.bind(this);
        this.save_click = this.save_click.bind(this);
        this.delete_click = this.delete_click.bind(this);
        this.insert_click = this.insert_click.bind(this);
        this.more_handler = this.more_handler.bind(this);
    }

    handle_errors() {
        if (this.props.model_type == 'k')
            return
        let error = detech_errors(this.state.layers)
        if (error != '') {
            this.setState({
                ...this.state,
                error: error.error,
                layer_error: error.layer,
                is_error: error.is_error
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            layers: nextProps.layers
        }, () => {
            this.handle_errors()
        })
    }

    more_handler() {
        this.setState({
            ...this.state,
            page: this.state.page + 1
        })
    }

    delete_click(layer_id) {
        if (layer_id == 1 && this.state.layers.length > 1) {
            alert("you can't delete the first layer, though you are able to modify it")
        } else {
            let layers = delete_layer(this.state.layers, layer_id)
            this.props.dispatchLayers(layers)
            this.handle_errors()
        }
    }

    insert_click(layer_id) {
        let layers = insert_layer(this.state.layers, layer_id)
        console.log(layers)
        this.props.dispatchLayers(layers)
        this.handle_errors()
        this.props.selectLayer(this.state.layers[layer_id])
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
        this.props.addLayer(this.props.details.height, this.props.details.width)
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
        let layers = this.state.layers
        if (layers == null) return ''
        if (this.props.project_update)
            layers = layers.slice(0, this.state.page * this.state.page_size)
        return (
            <div id="amb-model-internal">
                { this.display_selected_layer() }
                <h6 id="layers-quantity-statement" className="text">
                    the model currently consist of { this.props.layers_quantity } layers
                </h6>
                <p />
                <div className="container">
                        {
                            layers.map((layer) => 
                                <LayerItem id={ layer.id } error={ this.state.layer_error == layer.id && this.state.is_error == true } concern={ this.state.layer_error == layer.id && this.state.is_error == false } layer={ layer } type={ layer.type } input={ display_size(layer.input) } on_select={ this.props.selectLayer } 
                                    on_delete={ this.delete_click } on_insert={ this.insert_click } enable_modifications={ this.props.enable_modifications }
                                    output={ display_size(layer.output) } activation={ layer.actisvation } params={ layer.params_form } />
                            ) 
                        }
                </div>
                {
                    (this.props.project_update == true && this.state.page * this.state.page_size < this.state.layers.length)?
                    <div id="more_button_wrapper">
                        <a id="projects_button" className="button-v2" onClick={ this.more_handler }>
                        <svg class="icon-arrow before">
                            <use href="#arrow"></use>
                        </svg>
                        <span class="label">More</span>
                        <svg class="icon-arrow after">
                            <use href="#arrow"></use>
                        </svg>
                    </a>
                    <svg>
                    <defs>
                        <symbol id="arrow" viewBox="0 0 35 15">
                        <title>Arrow</title>
                        <path d="M27.172 5L25 2.828 27.828 0 34.9 7.071l-7.07 7.071L25 11.314 27.314 9H0V5h27.172z "/>
                        </symbol>
                    </defs>
                    </svg>
                    </div>:''
                }
                {
                (this.props.enable_modifications == true)?
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
                    </div>: ''
                }
                <div className="layers-error-box">
                    <ErrorBox strong={ 'Error!' } message={ invalid_layers_configuraition(this.state.layers) } color="danger" />
                    <ErrorBox strong={ 'Mismatch!' } message={ this.state.error } color="info" /><p/>
                </div>
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
        details: state.ambReducer.details,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectLayer: (layer) => {
            dispatch(selectLayer(layer))
        },
        addLayer: (height, width) => {
            dispatch(addLayer(height, width))
        },
        dispatchLayers: (layers) => {
            dispatch(dispatchLayers(layers))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelLayers);
