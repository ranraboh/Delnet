import React, { Component } from 'react'
import ProgressBar from './progressbar.js';
import { connect } from 'react-redux'
import { getUserProjects } from '../../actions/projects.js';

class Projects extends Component {
    constructor(props) {
        super(props)
        this.props.getUserProjects(this.props.username) 
        this.projects_handler = this.projects_handler.bind(this);
    } 

    projects_handler() {
        window.location = '../projects';
    }
    
    componentWillReceiveProps(nextProps) {
        console.log('projects props')
        console.log(nextProps)       
    }
    
    render() {
        if (!this.props.user_projects) {
            return <h2>No Projects</h2>
        }
        return (
        <div id="projects-section">
            {
                <ol className='projects-list'>
                    { 
                        this.props.user_projects.map(user => 
                        <li key={ user.id }>
                            <h4 className="project_name">{ user.project_name }</h4>
                            <h5>{ user.description }</h5>
                            <ProgressBar value={ user.result } />
                            <h5 className="project-chose-link"> Continue work on project </h5>
                        </li>) 
                    }
                    <a id="projects_button" className="button-v2" onClick={ this.projects_handler }>
                        <svg class="icon-arrow before">
                            <use href="#arrow"></use>
                        </svg>
                        <span class="label">Projects</span>
                        <svg class="icon-arrow after">
                            <use href="#arrow"></use>
                        </svg>
                    </a>
                    <svg>
                    <defs>
                        <symbol id="arrow" viewBox="0 0 35 15">
                        <title>Arrow</title>
                        <path d="M27.172 5L25 2.828 27.828 0 34.9 7.071l-7.07 7.071L25 11.314 27.314 9H0V5h27.172z "/>
                        </symbol>
                    </defs>
                    </svg>
                </ol>
            }
        </div>
        )
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
        getUserProjects: (username) => {
            dispatch(getUserProjects(username));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

