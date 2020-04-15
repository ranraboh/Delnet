import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createProject, createMember } from '../../actions/projects.js'

class ProjectsCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
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

    register_project() {
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
        return (
        <div id="projects-create">
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
