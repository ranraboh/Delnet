import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createProject, createMember } from '../../actions/projects.js'
import { ValidateEmail, allLetter, typeOfNaN, lengthOfString,check_itsnot_empty } from "../../actions/validation";


class ProjectsCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {

            errors: {
                user: '',
                project_name: '',
                description: ''                
            },
            project: {
                user: this.props.username,
                project_name: '',
                description: '',
                result: 0
            }
        }

        /* bind internal methods */
        this.on_change = this.on_change.bind(this);
        this.register_project = this.register_project.bind(this);
        this.reset_handler = this.reset_handler.bind(this);
    }
    restartErrors(errors){
        errors['user'] =''
        errors['project_name'] =''
        errors['description'] =''
    }

    register_project(e) {
        e.preventDefault();
        let errors = this.state.errors
        let user = this.state.project;
        this.restartErrors(errors);

        if ((!check_itsnot_empty(user['project_name']))) {
            errors['project_name'] ="Please fill in the project name "
            console.log(errors['project_name'])
        }
            if(!lengthOfString(user['project_name'],30)){
                errors['project_name'] ="It is possible to write up to 30 words, please be careful "
                console.log(errors['project_name'])
            }
        
        if ((!check_itsnot_empty(user['description']))) {
            errors['description'] ="Please fill in the description."
            console.log(errors['description'])

        }
         if(!lengthOfString(user['description'],200)){
                errors['description'] ="It is possible to write up to 200 words, please be careful"
                console.log(errors['description'])
            }
            this.setState({
                ...this.state,
                errors
            })

        this.props.createProject(this.state.project, (result) => {
            console.log(this.props.project_created)
            this.props.createMember({
                project: this.props.project_created.id,
                user: this.state.project.user,
                role: 'Project Manager',
                premissions: '5'
            });
            alert('the project was inserted successfully')
            this.reset_handler()
        });

    }

    reset_handler() {
        this.setState({
            project: {
                user: this.props.username,
                project_name: '',
                description: '',
                result: 0
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
        let errors = this.state.errors
        console.log("now check-----------------------------")
        console.log(errors['description'])
        console.log(errors['project_name'])
        return (
        <div id="projects-create">
            <div className="row row-form">
                <div className="col-2">
                    <p className="project-form-field">Project Name</p>
                </div>
                <div className="col-6">
                   
                    <div class="value">
                            <input class={(this.state.errors.project_name == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                            type="text" name="project_name" value={ this.state.project.project_name } placeholder="Enter name of project"
                                onChange={ (e) => this.on_change('project_name', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.project_name }
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
                              rows="4" cols="40" name="project_description" value={ this.state.project.description } placeholder="Enter description of your project"
                                onChange={ (e) => this.on_change('description', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.description }
                                </div>
                        </div>
                </div>
            </div>
            <p/>
            <button class="btn create-button" onClick={ this.register_project }>Create</button>&nbsp;&nbsp;
            <button class="btn create-button" onClick={ this.reset_handler }>Reset</button>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        project_created: state.projectReducer.project_created
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createMember: (member) => {
            console.log('inside map')
            console.log(member)
            dispatch(createMember(member));
        },
        createProject: (project, callback) => {
            dispatch(createProject(project, callback));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsCreate);
