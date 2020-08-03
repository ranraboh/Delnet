import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { homepage } from '../../appconf';
import ProjectAnalysis from './analysis/analysis';
import ProjectGeneralDetails from './details'
import ProjectTeam from './team';
import DatasetProject from './dataset'
import ModelFiles from './files'
import ProjectStats from './stats';
import RunModel from './runs/new';
import RunOutcomes from './runs/outcomes';
import ProjectArchitercture from './architecture';
import ProjectLayersModel from './layers';
import ProjectStatics from './statics';
import DeployModel from './deploy';

import AddTask from './add-task-checkList';

import ChecklistAll from './check-list-add&show'
import CheckList from './show-check-list';

import ShowNotification from './show-notifiction';

import Notification from './add-notification';


import TestModel from './tests'
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
        let model_layers = this.section(<ProjectLayersModel/>, this.props.sections_status.layers_active)
        let model_architecture = this.section(<ProjectArchitercture/>, this.props.sections_status.architecture_active)
        let statics = this.section(<ProjectStatics/>, this.props.sections_status.statics_active)
        let deploy_model = this.section(<DeployModel/>, this.props.sections_status.deploy_model_active)
        let project_analysis = this.section(<ProjectAnalysis />, this.props.sections_status.analysis_active)
        let test_model = this.section(<TestModel/>, this.props.sections_status.tests_active)
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
                { model_layers }
                { model_architecture }
                <Notification/>
                <ShowNotification/>
                <AddTask/>
                <CheckList/>
                <ChecklistAll/>
               
                { project_analysis }
                { statics }
                { deploy_model }
                { test_model }
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
