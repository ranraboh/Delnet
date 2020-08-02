import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { updateProject } from '../../actions/projects'
import { getUserDatasets } from '../../actions/dataset/get';

class ProjectDetailsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project: {
                user: props.username,
                id: props.project_data.id,
                name: props.project_data.project_name,
                description: props.project_data.description,
                result: props.project_data.result,
                dataset: props.project_data.dataset,
                type: props.project_data.type_description
            },
            user_datasets: props.user_datasets
        }

        /* send requests for crucial data from backend  */
        this.props.getUserDatasets(this.state.project.user)

        /* bind internal methods */
        this.on_change = this.on_change.bind(this);
        this.register_project = this.register_project.bind(this);
        this.reset_handler = this.reset_handler.bind(this);
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


    register_project() {
        this.props.updateProject(this.state.project, () => {
            alert('the details of project updated successfully')
        }); 
    }

    reset_handler() {
        this.setState({
            project: {
                user: props.username,
                id: props.project_data.id,
                name: props.project_data.project_name,
                description: props.project_data.description,
                result: props.project_data.result,
                dataset: props.project_data.dataset
            }
        })
    }

    on_change(field, value) {
        let project = this.state.project;
        project[field] = value;
        this.setState({
            project
        })
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
        <div id="project-form-internal">
            <div className="row row-form">
                <div className="col-2">
                    <p className="project-form-field">Project Name</p>
                </div>
                <div className="col-6">
                    <div class="value">
                        <input class="input-projects" type="text" name="project_name"
                         value={ this.state.project.name } placeholder="Enter name of project"
                            onChange={ (e) => this.on_change('name', e.target.value) } />
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
                    <p className="project-form-field">Success Rate</p>
                </div>
                <div className="col-6">
                    <div class="value">
                        <input class="input-projects" name="project_result" value={ this.state.project.result }
                          onChange={ (e) => this.on_change('result', e.target.value) }
                          placeholder="Enter success rate of your project" />
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
                    <p className="project-form-field">Model Type</p>
                </div>
                <div className="col-6">
                    <div class="value">
                        <p className="project-form-field">{ this.state.project.type } </p>
                    </div>
                </div>
                </div>
                {/* Possible profile operations */}
                <div id="project-details-operations">
                    <button type="button" className="button-v1 button-v1-blue button-v1-small" onClick={ this.register_project }
                        >Update</button>
                    <button type="button" className="button-v1 button-v1-red button-v1-small">Reset</button>
                </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        project_data: state.projectReducer.project_selected,
        user_datasets: state.datasetsReducer.user_datasets,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateProject: (project, callback) => {
            dispatch(updateProject(project, callback))
        },
        getUserDatasets: (username) => {
            dispatch(getUserDatasets(username))
        }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsForm);
