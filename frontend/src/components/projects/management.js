import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getUserProjects } from '../../actions/projects.js';
import ProjectsTable from './table.js';
import ProjectsCreate from './create.js';

class ProjectsManagement extends Component {
    constructor(props) {
        super(props)
        this.create_project = this.create_project.bind(this)
        this.state = {
            create: false
        }
    }

    create_project() {
        console.log('in create')
        this.setState({
            create: !this.state.create
        })
        console.log(this.state)
    }
    
    render() {
        let toggle_section = <ProjectsTable />;
        let button_caption = 'Create New Project'
        if (this.state.create) {
            toggle_section = <ProjectsCreate />
            button_caption = 'Show Projects'
        }
        return (
            <div id="management-section">
                <div id="projects-header">
                    <h1 id="projects-title">
                        Projects
                    </h1>
                    <h2 id="projects-intro">
                        this sections contains list of your deep-learning projects,
                        you can access and manage each project in accordance of your premission.
                    </h2>
                </div>
                { toggle_section }
            <button type="button" class="btn btn-primary btn-new-project" onClick={ this.create_project }>{ button_caption }</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}


const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsManagement);
