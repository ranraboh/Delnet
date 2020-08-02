import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ModelLayers from './layers.js'
import { createAutomatedModel } from '../../actions/amb/general';
import { homepage } from '../../appconf.js';

class AmbModelGenerator extends Component {
    constructor(props) {
        super(props)

        /* bind internal methods */
        this.save_handler = this.save_handler.bind(this);
    }

    save_handler() {
        this.props.createAutomatedModel({
            details: this.props.details,
            layers: this.props.layers,
            layers_quantity: this.props.layers_quantity,
            user: this.props.username,
            type: 'Customizable'
        }, () => {
            alert('the model created successfully')
            window.location = homepage + 'projects'
        })
    }

    render() {
        return (
            <div id="model-generator-section" className="section-in-main">
                <div className="header-section-v1 header-v1-cyan">
                    <h1 id="projects-title">
                        Model Layers
                    </h1>
                    <h2 id="projects-intro">
                        this sections display extnesively the layers of the model and their features and parameters
                    </h2>
                </div>
            <ModelLayers save_handler={ this.save_handler } />
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
        createAutomatedModel: (request) => {
            dispatch(createAutomatedModel(request))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AmbModelGenerator);
