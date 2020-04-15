

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MiniSection from '../home/mini.js';
import { connect } from 'react-redux';
import { getItemsCount, getDatasetTeam } from '../../actions/datasets.js';

class Stats extends Component {
    constructor(props) {
        super(props)
        this.props.getItemsCount(this.props.dataset_data.id)
        this.props.getDatasetTeam(this.props.dataset_data.id)
    }

    render() {
        console.log(this.props.dataset_data)
        return (
        <div id="activeness-section">
        <div className="row">
            <MiniSection size="4" style="primary" category="Name" value={ this.props.dataset_data.name } icon="fa-book" />
            <MiniSection size="4" style="info" category="Build Date" value={ this.props.dataset_data.create_date } icon="fa-clock-o" />
            <MiniSection size="4" style="purple" category="Creator" value={ this.props.dataset_data.user } icon="fa-user" />
        </div>
        <div className="row">
            <MiniSection size="4" style="danger" category="Items" value={ this.props.dataset_data.items_quantity } icon="fa-database" />
            <MiniSection size="4" style="success" category="Labels" value={ this.props.dataset_data.labels_quantity } icon="fa-tag" />
            <MiniSection size="4" style="warning" category="Collectors" value={ this.props.dataset_data.team_size } icon="fa-users" />
        </div>
        </div>
        
        );
    }
}
const mapStateToProps = state => {
    return {
        dataset_data: state.datasetsReducer.dataset_selected,
        username: state.authentication.user,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getItemsCount: (dataset_id) => {
            dispatch(getItemsCount(dataset_id))
        },
        getDatasetTeam: (dataset_id) => {
            dispatch(getDatasetTeam(dataset_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);