import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { activateSection, hideSection } from '../../../actions/project/sections';
import DatasetMenuItem from '../../dataset/menu-item';


class ProjectFeatures extends Component {
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
                <DatasetMenuItem name="Runs Outcomes" description="display run results" state={ this.props.sections_status.run_outcomes_active } 
                        button_type="primary" icon="fa-database" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                <DatasetMenuItem name="Model Layers" description="display model layers in detail" state={ this.props.sections_status.layers_active } 
                        button_type="info" icon="fa-list" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                <DatasetMenuItem name="Model Architecture" description="display visually the model architecture" state={ this.props.sections_status.architecture_active } 
                        button_type="success" icon="fa-sitemap" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                <DatasetMenuItem name="Project Analysis" description="analyze and get tips how to maximize your project performence" state={ this.props.sections_status.analysis_active } 
                        button_type="danger" icon="fa-file" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                <DatasetMenuItem name="Statics" description="display project statics" state={ this.props.sections_status.statics_active } 
                        button_type="warning" icon="fa-sticky-note" activate={ this.props.activateSection } hide={ this.props.hideSection } />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFeatures);