import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadLayers } from '../../actions/amb/general'
import ModelArchitercture from '../automated/architecture/architecture';

class ProjectArchitercture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error_message: {
                k: 'you have chosen well-known model mode project but you didnt select specific model yet.',
                c: 'you havent declare your customizable architecture for your project',
                u: 'you havent upload any model code file'
            }
        }

        /* load layers of model */
        this.props.loadLayers(this.props.project.id)       
    }

    render() {
        if (this.props.layers == null)
            return ''
        return (
            <div className="model-architecture-wrapper">
                <div className="section-in-main">
                    <div className="header-section-v1 header-v1-green">
                        <h1 id="projects-title">
                            Model Architecture
                        </h1>
                        <h2 id="projects-intro">
                            chart display visually the model architecture 
                        </h2>
                    </div>
                    {
                        (this.props.layers.length == 0)?
                        <div className="text-message text-blue">
                            {
                                this.state.error_message[this.props.project.model_type]
                            }
                        </div>:<ModelArchitercture layers={ this.props.layers } />
                    }
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        layers: state.ambReducer.customizable.layers,
        project: state.projectReducer.project_selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadLayers: (project_id) => {
            dispatch(loadLayers(project_id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectArchitercture);