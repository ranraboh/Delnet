import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getUserProjects } from '../../actions/projects';
import BarChart from '../graph/bar'

class ProjectsGraph extends Component {
    constructor(props) {
		super(props)
		this.props.getUserProjects(this.props.username)
	}
	
    render() {
        if (this.props.user_projects == null)
            return ''
        return (
            <div id="projects-graph-section">
                <div id="graph-header">
                    <h1 id="projects-title">
                        Graph
                    </h1>
                    <h2 id="projects-intro">
                        the graph shows the success rate in any of your projects in a clear and organized way 
                    </h2>
                </div>
				<BarChart data={ this.props.user_projects } display="project_name" value="result" />
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
		getUserProjects: (username) => {
            dispatch(getUserProjects(username))
        }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsGraph);
