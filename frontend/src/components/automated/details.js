import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { MODEL_TYPE_STAGE } from './actions/enums.js';
import { updateGeneralDetails } from '../../actions/amb/state.js';
import { stageAdvance } from '../../actions/amb/state.js';
import { getUserDatasets } from '../../actions/dataset/get';

class AmbGeneralDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            project: {
                user: this.props.username,
                project_name: '',
                description: '',
                result: 0,
                dataset: null,
                width: 64,
                height: 64,
                train_percentage: 70,
                dev_percentage: 20,
                test_percentage: 10
            }
        }
        
        /* send requests for crucial data from backend  */
        this.props.getUserDatasets(this.state.project.user)

        /* bind internal methods */
        this.on_change = this.on_change.bind(this);
        this.reset_handler = this.reset_handler.bind(this);
        this.alert_message = this.alert_message.bind(this);
        this.next_stage = this.next_stage.bind(this);
        this.on_dataset_select = this.on_dataset_select.bind(this);
    }

    on_dataset_select(e) {
        let value = e.target.value
        if (value == "-")
            value = null
        this.setState({
            ...this.state,
            project : {
                ...this.state.project,
                dataset: value
            }
        }, () => console.log(this.state.project) )
    }

    reset_handler() {
        this.setState({
            project: {
                user: this.props.username,
                project_name: '',
                description: '',
                result: 0,
                dataset: null,
                width: 64,
                height: 64,
                train_percentage: 70,
                dev_percentage: 20,
                test_percentage: 10
            }
        })
    }
    
    alert_message() {
        if (this.state.error != '') {
            return(
                <div class="alert alert-warning" role="alert">
                    { this.state.error }
                </div>
            )
        }
        return ''
    }
    on_change(field, value) {
        let project = this.state.project;
        project[field] = value;
        this.setState({
            project
        })
    }

    next_stage() {
        if (this.state.project.project_name == '') {
            this.setState({
                ...this.state,
                error: 'please enter a project name'
            })
        } else if (this.state.project.description == '') {
            this.setState({
                ...this.state,
                error: 'please enter a project description'
            })
        }
        else {
            this.props.updateGeneralDetails(this.state.project);
            this.props.stageAdvance(MODEL_TYPE_STAGE);
        }
    }

    render() {
        let dataset_options = ''
        if (this.props.user_datasets != null)
            dataset_options = (
                this.props.user_datasets.map((dataset) =>
                    <option value={ dataset.id } selected={ this.state.project.dataset == dataset.id } >{ dataset.name }</option>
                )
            )
        return (
        <div id="amb-project-create" className="section-in-main">
            <div className="header-section-v2">
                <h1 className="dataset-header-title dataset-header-blue">
                    General Details
                </h1>
            </div>
            <div id="amb-details-internal">
                <div className="row row-form">
                    <div className="col-2">
                        <p className="project-form-field">Project Name</p>
                    </div>
                    <div className="col-6">
                        <div class="value">
                            <input class="input-projects" type="text" name="project_name"
                            value={ this.state.project.project_name } placeholder="Enter name of project"
                                onChange={ (e) => this.on_change('project_name', e.target.value) } />
                        </div>
                    </div>
                </div>
                <div className="row row-form">
                    <div className="col-2">
                        <p className="project-form-field">Description</p>
                    </div>
                    <div className="col-6">
                        <div class="value">
                            <textarea class="input-projects" rows="4" cols="50" name="project_description" value={ this.state.project.description }
                            onChange={ (e) => this.on_change('description', e.target.value) }
                            placeholder="Enter description of your project" />
                        </div>
                    </div>
                </div>
                <div className="row row-form">
                    <div className="col-2">
                        <p className="project-form-field">Dataset</p>
                    </div>
                    <div className="col-6">
                        <div class="value">
                            <select name="project_dataset" className="input-projects" onChange={ this.on_dataset_select }>
                                <option value="-">-----</option>
                                { dataset_options }
                            </select>
                        </div>
                    </div> 
                </div>
                <div className="row row-form">
                <div className="col-2">
                    <p className="project-form-field">Image Size</p>
                </div>
                <div className="col-3">
                    <div class="value">
                        <div class="input-group-desc">
                        <input class="input-projects" type="text" name="height" value={ this.state.project.height }
                                onChange={ (e) => this.on_change('height', e.target.value) } />
                                <label class="label--desc">height</label>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="input-group-desc">
                    <input class="input-projects" type="text" name="width" value={ this.state.project.width }
                            onChange={ (e) => this.on_change('width', e.target.value) } />
                        <label class="label--desc">width</label>
                    </div>
                </div>
                </div>
                <div className="row row-form">
                <div className="col-2">
                    <p className="project-form-field">Data Partition</p>
                </div>
                <div className="col-2">
                    <div class="value">
                        <div class="input-group-desc">
                            <input class="input-projects" type="text" name="train_percentage" value={ this.state.project.train_percentage }
                                onChange={ (e) => this.on_change('train_percentage', e.target.value) } />
                            <label class="label--desc">train set</label>
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="input-group-desc">
                    <input class="input-projects" type="text" name="dev_percentage" value={ this.state.project.dev_percentage }
                            onChange={ (e) => this.on_change('dev_percentage', e.target.value) } />
                        <label class="label--desc">dev set</label>
                    </div>
                </div>
                <div class="col-2">
                    <div class="input-group-desc">
                    <input class="input-projects" type="text" name="test_percentage" value={ this.state.project.test_percentage }
                            onChange={ (e) => this.on_change('test_percentage', e.target.value) } />
                        <label class="label--desc">test set</label>
                    </div>
                </div>
                </div>
                { this.alert_message() }
                <div class="col-md-12">
                    <p className="button-v3"><a class="button" onClick={ this.next_stage }>Next</a></p>
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        project_created: state.projectReducer.project_created,
        user_datasets: state.datasetsReducer.user_datasets,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateGeneralDetails: (details) => {
            dispatch(updateGeneralDetails(details))
        },
        stageAdvance: (stage) => {
            dispatch(stageAdvance(stage))
        },
        getUserDatasets: (username) => {
            dispatch(getUserDatasets(username))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AmbGeneralDetails);
