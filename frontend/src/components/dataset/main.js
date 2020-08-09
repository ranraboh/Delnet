import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import DatasetDetailsForm from './details';
import DatasetTeam from "./team";
import LabelsSection from './labels'
import ItemsSection from "./items";
import AddLabel from './add_label';
import AddItem from './add_item';
import Stats from './stats';
import AnalysisDatasetWrapper from "./analysis-wrapper";
import UserContribution from './graphs/contributions';
import DateDistributionGraph from './graphs/date';
import DatasetProjectsGraph from './graphs/projects';
import LabelsDistribution from './graphs/labels';
import AddNotification from './notification-dataset';
import ShowNotification from './show-notification-dataSet';

import TagSamples from './tag'
import OfferSamples from './offer'

class DataSetMain extends Component {
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


    render() {
        let general_details = this.section(<DatasetDetailsForm/>, this.props.dataset_display.dataset_details)
        let dataset_team = this.section(<DatasetTeam/>, this.props.dataset_display.collectors_team)
        let labels_section = this.section(<LabelsSection/>, this.props.dataset_display.labels_section)
        let items_section = this.section(<ItemsSection/>, this.props.dataset_display.items_section)
        let add_label = this.section(<AddLabel/>, this.props.dataset_display.add_label)
        let add_item = this.section(<AddItem/>, this.props.dataset_display.add_item)
        let analysis_section = this.section(<AnalysisDatasetWrapper />, this.props.dataset_display.analyze)
        let user_contributions = this.section(<UserContribution/>, this.props.dataset_display.user_contributions)
        let date_distribution = this.section(<DateDistributionGraph/>, this.props.dataset_display.date_distribution)
        let projects_dataset = this.section(<DatasetProjectsGraph/>, this.props.dataset_display.dataset_projects)
        let labels_distribution = this.section(<LabelsDistribution/>, this.props.dataset_display.label_distribution)
        let tag_samples = this.section(<TagSamples/>, this.props.dataset_display.tag_samples)
        let offer_samples = this.section(<OfferSamples/>, this.props.dataset_display.offer_items)
        let notifications = this.section(<ShowNotification/>, this.props.dataset_display.notifications)
        let add_notification = this.section(<AddNotification/>, this.props.dataset_display.add_notification)

        return (
            <div className="main-dataset">
                <Stats />
                { general_details }
                { dataset_team }
                { labels_section }
                { items_section }
                { add_label }
                { add_item }
                { analysis_section }
                { labels_distribution }
                { user_contributions }
                { date_distribution }
                { projects_dataset }
                { notifications }                
                { add_notification }
                { tag_samples }
                { offer_samples }
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSetMain);
