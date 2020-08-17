import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { updateProject, getNotification, selectProject } from '../../actions/projects'
import { getUserDatasets } from '../../actions/dataset/get';
import { ValidateEmail, allLetter, typeOfNaN, lengthOfString,check_itsnot_empty } from "../../actions/validation";


class ProjectDetailsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {
                name: '',
                description: ''                
            },
            project: {
                user: props.username,
                id: props.project_data.id,
                name: props.project_data.project_name,
                description: props.project_data.description,
                result: props.project_data.result,
                dataset: props.project_data.dataset,
                type: props.project_data.model_type,
                width: props.project_data.width,
                height: props.project_data.height,
                train_percentage: props.project_data.train_percentage,
                dev_percentage: props.project_data.dev_percentage,
                test_percentage: props.project_data.test_percentage,
                username: props.username
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
        this.select_type = this.select_type.bind(this);
    }

    select_type(e) {
        this.setState({
            ...this.state,
            project: {
                ...this.state.project,
                type: e.target.value
            }
        }) 
    }

    restartErrors(errors){
        errors['name'] =''
        errors['description'] =''
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


    register_project(e) {
        e.preventDefault();
        let errors = this.state.errors
        let user = this.state.project;
        this.restartErrors(errors);
        var bool=false


        if ((!check_itsnot_empty(user['name']))) {
            errors['name'] ="Please fill in the project name "
            console.log(errors['name'])
            bool=true
        }
            if(!lengthOfString(user['name'],30)){
                errors['name'] ="It is possible to write up to 30 words, please be careful "
                console.log(errors['name'])
                bool=true

            }
        
        if ((!check_itsnot_empty(user['description']))) {
            errors['description'] ="the description  is empy ,enter description."
            console.log(errors['description'])
            bool=true


        }
         if(!lengthOfString(user['description'],200)){
                errors['description'] ="It is possible to write up to 200 words, please be careful"
                console.log(errors['description'])
                bool=true

            }
            this.setState({
                ...this.state,
                errors
            })
        if(bool){
             console.log("bool its true ,have error")
             return
         }   
          //  if((errors['name'] ='')&&(errors['description'] ='')){
        this.props.updateProject(this.state.project, () => {
            alert('the details of project updated successfully')
            this.props.selectProject(this.state.project.id)
            this.props.getNotification(this.state.project.id)
        }); //}
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
                    <p className="project-form-field text-blue">General Details</p>
            </div>
            <div className="row row-form">
                <div className="col-2">
                    <p className="project-form-field">Project Name</p>
                </div>
                <div className="col-6">
                    <div class="value">
                            <input class={(this.state.errors.name == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                            type="text" name="project_name" value={ this.state.project.name} placeholder="Enter name of project"
                                onChange={ (e) => this.on_change('name', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.name }
                                </div>
                        </div>
                </div>
            </div>
            <div className="row row-form">
                <div className="col-2">
                    <p className="project-form-field">Description</p>
                </div>
                <div className="col-6">
                    <div class="value">
                            <textarea class={(this.state.errors.description == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                             rows="4" cols="50" name="project_description" value={ this.state.project.description }
                             onChange={ (e) => this.on_change('description', e.target.value) }
                             placeholder="Enter description of your project" />
                                <div class="invalid-feedback">
                                    { this.state.errors.description }
                                </div>
                        </div>
                </div>
                </div>
                <div className="row row-form">
                    <p className="project-form-field text-blue">Settings</p>
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
                        <select name="project_dataset" className="input-projects" onChange={ this.select_type }>
                            <option value="u" selected={ this.state.project.type == 'u' }>User Upload Model</option>
                            <option value="c" selected={ this.state.project.type == 'c' }>Customizable Model</option>
                            <option value="k" selected={ this.state.project.type == 'k' }>Well-known Model</option>
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
                <div className="row row-form">
                <div className="col-2">
                    <p className="project-form-field">Success Rate</p>
                </div>
                <div className="col-6">
                    <div class="value">
                        <input disabled class="input-projects" name="project_result" value={ this.state.project.result }
                          onChange={ (e) => this.on_change('result', e.target.value) }
                          placeholder="Enter success rate of your project" />
                    </div>
                </div>
                </div>
                {/* Possible profile operations */}
                {
                    (this.props.premissions < 4)?'':
                    <div id="project-details-operations">
                            <button type="button" className="button-v1 button-v1-blue button-v1-small" onClick={ this.register_project }>Update</button>
                            <button type="button" className="button-v1 button-v1-red button-v1-small">Reset</button>
                    </div>
                }
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        project_data: state.projectReducer.project_selected,
        user_datasets: state.datasetsReducer.user_datasets,
        premissions: state.projectReducer.project_selected.premissions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateProject: (project, callback) => {
            dispatch(updateProject(project, callback))
        },
        getUserDatasets: (username) => {
            dispatch(getUserDatasets(username))
        },
        selectProject: (project_id, callback) => {
            dispatch(selectProject(project_id, callback))
        },
        getNotification: (project_id, callback) => {
            dispatch(getNotification(project_id, callback))
        }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsForm);

