import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { activateSection, hideSection } from '../../../actions/dataset/sections';
import DatasetMenuItem from '../menu-item';

class VisiterMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div id="dataset-visiter-section" className="section-in-main">
            <div id="information-header">
                <p className="dataset-links-title">Menu</p>
            </div>
            <div id="profile">
            <table class="table">
                <tbody>
                    <DatasetMenuItem name="General Details" description="display general data about selected data set" state={ this.props.dataset_display.dataset_details } 
                        button_type="primary" icon="fa-database" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                    <DatasetMenuItem name="Collectors Team" description="display the team collectors" state={ this.props.dataset_display.collectors_team } 
                        button_type="info" icon="fa-users" activate={ this.props.activateSection } hide={ this.props.hideSection } />    
                    <DatasetMenuItem name="Labels Section" description="display the labels associate with this dataset" state={ this.props.dataset_display.labels_section } 
                        button_type="dark" icon="fa-tag" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                    <DatasetMenuItem name="Items Section" description="display the data-items associate with this dataset" state={ this.props.dataset_display.items_section } 
                        button_type="danger" icon="fa-table" activate={ this.props.activateSection } hide={ this.props.hideSection } />    
                    <DatasetMenuItem name="Models Results" description="projects results graph" state={ this.props.dataset_display.dataset_projects } 
                        button_type="success" icon="fa-bar-chart" activate={ this.props.activateSection } hide={ this.props.hideSection } />   
                    <DatasetMenuItem name="Date Distribution" description="items uploaded per each date" state={ this.props.dataset_display.date_distribution } 
                        button_type="warning" icon="fa-line-chart" activate={ this.props.activateSection } hide={ this.props.hideSection } />
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

export default connect(mapStateToProps, mapDispatchToProps)(VisiterMenu);