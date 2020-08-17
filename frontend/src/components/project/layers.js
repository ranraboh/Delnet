import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ModelLayers from '../automated/layers'
import { loadLayers, saveLayers } from '../../actions/amb/general'
import { getPopularModel } from '../../actions/projects';
import Prebuild from '../automated/prebuild';

class ProjectLayersModel extends Component {
    constructor(props) {
        super(props)
        /* load layers of model */
        this.props.loadLayers(this.props.project.id)        
        this.props.getPopularModel(this.props.project.id)        

        /* bind internal methods */
        this.save_handler = this.save_handler.bind(this);
    }

    save_handler() {
        this.props.saveLayers({
            layers: this.props.layers,
            project: this.props.project.id
        }, () => {
            alert("layers has been updated successfully")
        })
    }

    render() {
        if (this.props.layers == null)
            this.props.loadLayers(this.props.project.id)
        return (
            <span>
                {
                    (this.props.project.model_type == 'k')?
                    <Prebuild update={true} project={ this.props.project } loadLayers={ this.props.loadLayers } getPopularModel={ this.props.getPopularModel } />:''
                }
                <div className="section-in-main">
                <div className="header-section-v1 header-v1-blue">
                    <h1 id="projects-title">
                        Model Layers
                    </h1>
                    <h2 id="projects-intro">
                        this sections display extnesively the layers of the model and their features and parameters
                    </h2>
                </div>
                {
                    (this.props.project.known_model != null && this.props.project.known_model.exist)?
                    <div className="selected-model container">
                        <div className="row">
                            <div className="col-6">
                                <img src={ this.props.project.known_model.image } className="prebuild-model-image"/>
                            </div>
                            <div className="col-6">
                                <h4 id="projects-title">
                                    <span className="text-bold text-blue">Selected popular model</span> <br/>
                                    <span className="text-bold">Name:</span> { this.props.project.known_model.name } <br/>
                                    <span className="text-bold">Description:</span> { this.props.project.known_model.description } <br/>
                                </h4>
                            </div>
                        </div>
                    </div>:''
                }
                <ModelLayers project_update={ true } save_handler={ this.save_handler } enable_modifications={ this.props.project.model_type == 'c' } model_type={this.props.project.model_type} />
            </div>
            </span>
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
        },
        getPopularModel: (project_id) => {
            dispatch(getPopularModel(project_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectLayersModel);
