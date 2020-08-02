import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deployModel } from '../../actions/project/model';
 
class DeployModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options:[ 'None', 'Best Run Model', 'Latest Run Model' ],
            model_state: 0,
            samples: null
        }

        /* bind inner methods */
        this.deploy_content = this.deploy_content.bind(this);
        this.latest_model = this.latest_model.bind(this);
        this.best_model = this.best_model.bind(this);
        this.select_samples = this.select_samples.bind(this);
        this.send_deploy_request = this.send_deploy_request.bind(this);
        this.display_results = this.display_results.bind(this);
    }

    select_samples(event) {
        console.log(event.target.files)
        this.setState({
            ...this.state,
            samples: event.target.files,
            samples_quantity: event.target.files.length
        })
    }

    latest_model() {
        this.setState({
            ...this.state,
            model_state: 2
        })
    }

    best_model() {
        this.setState({
            ...this.state,
            model_state: 1
        })
    }

    send_deploy_request() {
        let states = [ 'best', 'latest' ]
        this.props.deployModel({
            state: states[this.state.model_state - 1],
            images: this.state.samples,
            images_quantity: this.state.samples_quantity,
            project: this.props.project_data.id
        })
    }

    render() {
        return (
            <div id="deploy-model" className="section-in-main">
                <div className="header-section-v1 header-v1-pink">
                    <h1 id="projects-title">
                        Deploy Model
                    </h1>
                    <h2 id="projects-intro">
                        in the section you can deploy your own model
                    </h2>
                </div>
                <button className="btn btn-primary small-spacing" onClick={ this.best_model }>
                    Best Run Model 
                </button> 
                <button className="btn btn-danger" onClick={ this.latest_model }>
                    Lastest Run Model
                </button>
                <p/>  
                { this.deploy_content() }
            </div>
        )
    }

    deploy_content() {
        if (this.state.model_state == 0) {
            return (
                <h4 id="deploy-intro-text" className="text-poppins">
                    notice that whenever you changed your model eighter by upload new file or 
                    by changed model structure through automated model feature, the model created by those runs has removed and cannot be re-use 
                </h4>
            )
        } else {
            return (<div className="deploy-model-form">
                <h4 className="deploy-form-title">
                    { this.state.options[this.state.model_state] }
                </h4>
                <p />
                <h4 className="deploy-form-intro">
                    deploy your model <br/>
                    send an image as input to your model and wait for prediction
                </h4>
                <p/>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <h4 className="text-poppins">
                                Image File:
                            </h4>
                        </div>
                        <div className="col-4">
                            <input multiple type="file" id="img" name="img" accept="image/*"  
                                onChange= { this.select_samples } />
                        </div>
                    </div>
                </div>
                <p/>
                { this.display_results() }
                <p/>
                <button className="btn btn-dark" onClick={ this.send_deploy_request }>
                    Send
                </button>
            </div>)
        }
    }

    display_results() {
        if (this.props.results.length == 0)
            return ''
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <h4 className="text-poppins text-bold">
                            Image
                        </h4>
                    </div>
                    <div className="col-4">
                        <h4 className="text-poppins text-bold">
                            Label
                        </h4>
                    </div>
                </div>
                {
                    this.props.results.map((result) => 
                        <div className="row deploy-results-record">
                            <div className="col-4">
                                <img className="deploy-image" src={ '../' + result.image }></img>
                            </div>
                            <div className="col-4">
                                { result.name }
                            </div>
                        </div>
                    )
                }
            </div>
        )}
}


const mapStateToProps = state => {
    return {
        project_data: state.projectReducer.project_selected,
        results: state.modelReducer.deploy_results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deployModel: (request) => {
            dispatch(deployModel(request))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeployModel);

