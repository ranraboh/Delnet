import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { activateSection, hideSection } from '../../../actions/dataset/sections';
import DatasetMenuItem from '../menu-item';

class DataSetGraphs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div id="dataset-information-section" className="section-in-main">
            <div id="statics-header">
                <p className="dataset-links-title">Statics</p>
            </div>
            
            <div id="profile">
                <table class="table">
                <tbody>
                <DatasetMenuItem name="Analysis Dataset" description="analyze your dataset" state={ this.props.dataset_display.analyze } 
                        button_type="primary" icon="fa-area-chart" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                <DatasetMenuItem name="Team Contributions" description="display team members contributions" state={ this.props.dataset_display.user_contributions } 
                        button_type="info" icon="fa-pie-chart" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                <DatasetMenuItem name="Labels Distrubution" description="items quantity per each label" state={ this.props.dataset_display.label_distribution } 
                        button_type="danger" icon="fa-codepen" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                <DatasetMenuItem name="Date Distribution" description="items uploaded per each date" state={ this.props.dataset_display.date_distribution } 
                        button_type="success" icon="fa-line-chart" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                <DatasetMenuItem name="Models Results" description="projects results graph" state={ this.props.dataset_display.dataset_projects } 
                        button_type="dark" icon="fa-bar-chart" activate={ this.props.activateSection } hide={ this.props.hideSection } />   
                </tbody>
                </table>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(DataSetGraphs);