import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ProjectsGraph from './graph.js'
import ProjectsManagement from './management.js'

class MainProjects extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="main-projects">
                <ProjectsManagement />
                <ProjectsGraph />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainProjects);
