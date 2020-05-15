import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ProjectDetailsForm from './details-form'

class ProjectGeneralDetails extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="project-details-section" className="section-in-main">
                <div id="project-details-header">
                    <h1 id="projects-title">
                        General Details
                    </h1>
                    <h2 id="projects-intro">
                       In this section you can access and manage the project general details in accordance of your premission.
                    </h2>
                </div>

                {/* Project general data form */}
                <ProjectDetailsForm/>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        username: state.authentication.user,
    }
}

const mapDispatchToProps = disaptch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectGeneralDetails);