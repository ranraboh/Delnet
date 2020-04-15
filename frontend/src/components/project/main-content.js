import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ProjectGeneralDetails from './details.js'
import ProjectTeam from './team.js';
import DatasetProject from './dataset.js'
import ModelFiles from './files.js'
import ProjectStats from './stats.js';
import RunModel from './runs/new.js';
import RunOutcomes from './runs/outcomes.js';
import SpecificRunResult from './runs/s-result.js';
import { homepage } from '../../appconf.js';



class MainProject extends Component {
    constructor(props) {
        super(props)
    }

    section(html_section, available) {
        if (available) {
            return (
                <div>
                    { html_section }
                </div>
            )
        }
        return ''
    }

    projects_handler() {
        window.location = homepage + '/projects';
    }

    render() {
        let general_details = this.section(<ProjectGeneralDetails/>, this.props.sections_status.general_details_active)
        let project_team = this.section(<ProjectTeam/>, this.props.sections_status.project_team_active)
        let dataset_section = this.section(<DatasetProject/>, this.props.sections_status.access_dataset_active)
        let model_files = this.section(<ModelFiles/>, this.props.sections_status.model_files_active)
        let run_model = this.section(<RunModel/>, this.props.sections_status.run_model_active)
        let run_outcomes = this.section(<RunOutcomes/>, this.props.sections_status.run_outcomes_active)
        return (
            <div className="main-project">
                <ProjectStats />
                <p/>
                { general_details }
                { project_team }
                { dataset_section }
                { model_files }
                { run_model }
                { run_outcomes }
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        sections_status: state.projectSectionsReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainProject);
