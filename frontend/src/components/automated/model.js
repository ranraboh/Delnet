import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import AmbSelect from "./select.js";
import { selectLayer, addLayer } from '../../actions/amb/state.js'

class AmbModelGenerator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            layers: props.layers,
            colors: [ 'blue', 'red', 'green', 'aqua', 'pink', 'yellow', 'orange', 'purple' ],
            buttons: {
                add: { id:'btn-add', icon: 'fa fa-plus-square-o' , text: 'Add Layer', hover:false },
                save: { id:'btn-save', icon: 'fa fa-floppy-o', text: 'Save', hover:false }
            }

        }

        /* bind internal methods */
        this.save_hover_abort = this.save_hover_abort.bind(this);
        this.save_hover = this.save_hover.bind(this);
        this.add_hover_abort = this.add_hover_abort.bind(this);
        this.add_hover = this.add_hover.bind(this);
        this.add_layer = this.add_layer.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('model receive props')
        this.setState({
            ...this.state,
            layers: nextProps.layers
        })
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
        console.log('mouse over')
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

    render() {
        return (
        <div id="model-generator">
            <AmbSelect />
            <span id="model-generator-section" className="section-in-main">
                <div className="header-section-v2">
                    <h1 className="dataset-header-title dataset-header-green">
                        Model Generator
                    </h1>
                </div>
                <div id="amb-model-internal">
                <h6 id="layers-quantity-statement" className="text">
                    the model currently consist of { this.props.layers_quantity } layers
                </h6>
                <table className="table">
                    <thead>
                        <tr className="table-text table-header-neon">
                            <th scope="col">#</th>
                            <th scope="col">Type</th>
                            <th scope="col">Input</th>
                            <th scope="col">Output</th>
                            <th scope="col">Params</th>
                            <th scope="col">Activation</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            this.state.layers.map((layer) => 
                                <tr className={ (layer.id % 2 == 0)?"table-text":"table-text table-row-odd"}>
                                    <td>
                                        <div className={ "icon-container icon-container-" + this.state.colors[(layer.id - 1) % 8] }>
                                            <p>{ layer.id }</p>
                                        </div>
                                    </td>
                                    { console.log(layer) }
                                    { console.log(this.state.layers[layer.id - 1].output) }
                                    <td><p className="model-row-align">{ layer.type }</p></td>
                                    <td><p className="model-row-align">{ layer.input }</p></td>
                                    <td><p className="model-row-align">{ layer.output }</p></td>
                                    <td><p className="model-row-align">
                                        { console.log(layer) }
                                        {
                                            layer.params_form.map((param, index) =>
                                                <div id="params-table">
                                                    {
                                                        (index > 1) ? param.name + ': ' + layer[param.id]: ''
                                                    }
                                                </div>
                                            )
                                        }
                                    </p></td>
                                    <td><p className="model-row-align">{ layer.activation }</p></td>
                                    <td>
                                        <div className="model-row-align">
                                            <i className="fa fa-edit fa-lg edit-primary" onClick={ () => this.props.selectLayer(layer) }></i>
                                            &nbsp;
                                            <i className="fa fa-close fa-lg delete-danger"></i>
                                            {/*btn btn-outline-info btn-datasets */}
                                        </div>
                                    </td>
                                </tr>)
                            } 
                        </tbody>
                    </table>
                </div>
                <div id="layers-operations">
                    <button id="btn-add" className="btn btn-success btn-round" onMouseEnter={ this.add_hover } 
                        onMouseLeave={ this.add_hover_abort } onClick={ this.add_layer }>
                        <i className={ this.state.buttons.add.icon }></i>
                        { (this.state.buttons.add.hover)? ' ' + this.state.buttons.add.text: '' }
                    </button>
                    <button className="btn btn-dark btn-round" onMouseEnter={ this.save_hover } onMouseLeave={ this.save_hover_abort } >
                        <i className={ this.state.buttons.save.icon }></i>
                        { (this.state.buttons.save.hover)? ' ' + this.state.buttons.save.text: '' }
                    </button>
                </div>
            </span>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        layers: state.ambReducer.layers,
        selected_layer: state.ambReducer.selected_layer,
        layers_quantity: state.ambReducer.layers_quantity
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectLayer: (layer) => {
            console.log('select layer')
            dispatch(selectLayer(layer))
        },
        addLayer: () => {
            dispatch(addLayer())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AmbModelGenerator);
