import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { activateSection, hideSection } from '../../actions/datasets.js';
import { homepage } from '../../appconf.js'
import DatasetMenuItem from './menu-item.js';

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
                    <tr className="dataset-menu-row">
                        <td>
                            <button type="button" class="btn btn-outline-secondary button-dataset-menu">
                                <i className="fa fa-edit"></i>
                            </button>
                        </td>
                        <td className="dataset-links">Contribution</td>
                    </tr>
                    <tr className="dataset-menu-row">
                        <td>
                            <button type="button" class="btn btn-outline-warning button-dataset-menu">
                                <i className="fa fa-edit"></i>
                            </button>
                        </td>
                        <td className="dataset-links">Notifications</td>
                    </tr>
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