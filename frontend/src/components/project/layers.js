import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ModelLayers from '../automated/layers'
import { loadLayers, saveLayers } from '../../actions/amb/general'

class ProjectLayersModel extends Component {
    constructor(props) {
        super(props)
        /* load layers of model */
        this.props.loadLayers(this.props.project.id)        

        /* bind internal methods */
        this.save_handler = this.save_handler.bind(this);
    }

    save_handler() {
        console.log('save handler')
        this.props.saveLayers({
            layers: this.props.layers,
            project: this.props.project
        }, () => {
            alert("layers has been updated successfully")
        })
    }

    render() {
        return (
            <div className="section-in-main">
                <div className="header-section-v1 header-v1-blue">
                    <h1 id="projects-title">
                        Model Layers
                    </h1>
                    <h2 id="projects-intro">
                        this sections display extnesively the layers of the model and their features and parameters
                    </h2>
                </div>
            <ModelLayers save_handler={ this.save_handler } enable_modifications={ this.props.project.model_type == 'c' } />
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        project: state.projectReducer.project_selected,
        layers: state.ambReducer.customizable.layers,
        selected_layer: state.ambReducer.customizable.selected_layer,
        layers_quantity: state.ambReducer.customizable.layers_quantity,
        details: state.ambReducer.details
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadLayers: (project_id) => {
            dispatch(loadLayers(project_id))
        },
        saveLayers: (request, callback) => {
            dispatch(saveLayers(request, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectLayersModel);
