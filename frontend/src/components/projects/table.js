import React, { Component, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { deleteProject, getUserProjects, selectProject } from '../../actions/projects.js';
import { homepage } from '../../appconf.js';

class ProjectsTable extends Component {
    constructor(props) {
        super(props)
        this.props.getUserProjects(this.props.username)

        /* bind inner methods */
        this.delete_project = this.delete_project.bind(this);
    }

    delete_project(project_id, project_name) {
        //shiran
        if (confirm('are you sure you want to delete the project ' + project_name)) { 
            this.props.deleteProject(project_id);
            window.location = homepage + '/projects'
        }
    }

    select_project(project_id) {
        console.log('in select')
        this.props.selectProject(project_id, (response) => {
            console.log('call back function triggered')
            window.location = homepage + '/project';
        });
    }

    render() {
        if (!this.props.user_projects) {
            return <h2>No Projects</h2>
        }
        console.log(this.props.user_projects)
        return (
            <div id="table">
                <table class="table">
                    <thead>
                        <tr className="table-primary table-text">
                            <th scope="col">Project</th>
                            <th scope="col">Description</th>
                            <th scope="col">Actions</th>
                            <th scope="col">Success Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.user_projects.map((project) => 
                                <tr className="table-text">
                                    <td className="project-name">{ project.project_name }</td>
                                    <td>{ project.description }</td>
                                    <td>
                                        <button className="btn btn-outline-primary table-button"  onClick={ () => this.select_project(project.id) }>
                                            edit
                                        </button> 
                                        &nbsp;
                                        <button className="btn btn-outline-danger table-button" onClick={ () => this.delete_project(project.id, project.project_name) }>
                                            delete
                                        </button>
                                    </td>
                                    <td>{ project.result }</td>
                                </tr>)
                        } 
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user_projects: state.projectReducer.user_projects,
        username: state.authentication.user
    }
}


const mapDispatchToProps = dispatch => {
    return {
        deleteProject: (id) => {
            dispatch(deleteProject(id));
        },
        getUserProjects: (username) => {
            dispatch(getUserProjects(username))
        },
        selectProject: (id, callback) => {
            dispatch(selectProject(id, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTable);
