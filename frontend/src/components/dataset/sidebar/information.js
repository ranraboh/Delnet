import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { activateSection, hideSection } from '../../../actions/dataset/sections';
import DatasetMenuItem from '../menu-item';

class DataSetInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div id="dataset-information-section" className="section-in-main">
            <div id="information-header">
                <p className="dataset-links-title">Information</p>
            </div>
            <div id="profile">
            <table class="table">
                <tbody>
                    <DatasetMenuItem name="General Details" description="display general data about selected data set" state={ this.props.dataset_display.dataset_details } 
                        button_type="primary" icon="fa-database" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                    <DatasetMenuItem name="Collectors Team" description="display the team collectors" state={ this.props.dataset_display.collectors_team } 
                        button_type="info" icon="fa-users" activate={ this.props.activateSection } hide={ this.props.hideSection } />    
                    <DatasetMenuItem name="Labels Section" description="display the labels associate with this dataset" state={ this.props.dataset_display.labels_section } 
                        button_type="success" icon="fa-tag" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                    <DatasetMenuItem name="Items Section" description="display the data-items associate with this dataset" state={ this.props.dataset_display.items_section } 
                        button_type="danger" icon="fa-table" activate={ this.props.activateSection } hide={ this.props.hideSection } />    
                    <DatasetMenuItem name="Notifications" description="view dataset updates and notifications" state={ this.props.dataset_display.notifications } 
                        button_type="dark" icon="fa-table" activate={ this.props.activateSection } hide={ this.props.hideSection } />   
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
        dataset_display: state.datasetsToggleReducer.dataset_display
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

export default connect(mapStateToProps, mapDispatchToProps)(DataSetInfo);