import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Profile from '../home/profile.js';
import DatasetDetailsForm from './details.js';
import DatasetTeam from "./team.js";
import LabelsSection from './labels.js'
import ItemsSection from "./items.js";
import AddLabel from './add_label.js';
import AddItem from './add_item.js';
import Stats from './stats.js';

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
        return (
            <div className="main-dataset">
                <Stats />
                { general_details }
                { dataset_team }
                { labels_section }
                { items_section }
                { add_label }
                { add_item }
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
