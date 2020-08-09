import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { activateSection, hideSection } from '../../../actions/project/sections';
import DatasetMenuItem from '../../dataset/menu-item';

class ProjectOperations extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div id="dataset-information-section" className="section-in-main">
            <div id="information-header">
                <p className="dataset-links-title"></p>
            </div>
            <div id="profile">
            <table class="table">
                <tbody>
                    <DatasetMenuItem name="Run Model" description="run your model" state={ this.props.sections_status.run_model_active } 
                        button_type="primary" icon="fa-database" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                    <DatasetMenuItem name="Access Dataset" description="access and manage the project dataset" state={ this.props.sections_status.access_dataset_active } 
                        button_type="info" icon="fa-database" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                    <DatasetMenuItem name="Deploy Model" description="deploy and use your own model" state={ this.props.sections_status.deploy_model_active } 
                        button_type="success" icon="fa-laptop" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                    <DatasetMenuItem name="Tests" description="check if there any errors or exceptions" state={ this.props.sections_status.tests_active } 
                        button_type="dark" icon="fa-laptop" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                    <DatasetMenuItem name="Add Notification" description="add new notification" state={ this.props.sections_status.add_notification_active } 
                        button_type="danger" icon="fa-laptop" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                </tbody>
                </table>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        user: state.authentication.user,
        sections_status: state.projectSectionsReducer
    }
}


const mapDispatchToProps = dispatch => {
    return {
        activateSection: (section) => {
            dispatch(activateSection(section));
        },
        hideSection: (section) => {
            dispatch(hideSection(section));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOperations);