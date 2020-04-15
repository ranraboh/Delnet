import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { activateSection, hideSection } from '../../actions/project/sections.js';
import DatasetMenuItem from '../dataset/menu-item.js';


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
                    <tr className="dataset-menu-row">
                        <td>
                            <button type="button" class="btn btn-outline-info button-dataset-menu">
                                <i className="fa fa-edit"></i>
                            </button>
                        </td>
                        <td className="dataset-links">Recommendations</td>
                    </tr>
                    <tr className="dataset-menu-row">
                        <td>
                            <button type="button" class="btn btn-outline-danger button-dataset-menu">
                                <i className="fa fa-edit"></i>
                            </button>
                        </td>
                        <td className="dataset-links">Tests</td>
                    </tr>
                    <tr className="dataset-menu-row">
                        <td>
                            <button type="button" class="btn btn-outline-warning button-dataset-menu">
                                <i className="fa fa-edit"></i>
                            </button>
                        </td>
                        <td className="dataset-links">Statics</td>
                    </tr>
                    <tr className="dataset-menu-row">
                        <td>
                            <button type="button" class="btn btn-outline-warning button-dataset-menu">
                                <i className="fa fa-edit"></i>
                            </button>
                        </td>
                        <td className="dataset-links">Diagrams</td>
                    </tr>
                    <tr className="dataset-menu-row">
                        <td>
                            <button type="button" class="btn btn-outline-warning button-dataset-menu">
                                <i className="fa fa-edit"></i>
                            </button>
                        </td>
                        <td className="dataset-links">Model Interaction</td>
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