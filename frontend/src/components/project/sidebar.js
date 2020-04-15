import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProjectInfo from './information.js';
import ProjectIcon from './project.js';
import ProjectFeatures from './features.js';
import ProjectOperations from './operations.js';
import RunningSection from './running.js';

class ProjectSideBar extends Component {
    render() {
        return (
            <div id="sidebar-section">
                <ProjectIcon />
                <ProjectInfo/>
                <ProjectFeatures/>
                <ProjectOperations />
                <RunningSection />
            </div>
        );
    }
}
export default ProjectSideBar;