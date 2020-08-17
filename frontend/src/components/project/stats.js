

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MiniSection from '../home/mini.js';
import { connect } from 'react-redux';
import { getProjectHeader } from '../../actions/projects';

class ProjectStats extends Component {
    constructor(props) {
        super(props)
        this.props.getProjectHeader(this.props.project_data.id)
    }

    render() {
        if (this.props.project_data == null || this.props.project_data.header == null)
            return ''
        return (
        <div id="activeness-section">
        <div className="row">
            <MiniSection size="4" style="primary" category="Name" value={ this.props.project_data.project_name } icon="fa-book" />
            <MiniSection size="4" style="info" category="Build Date" value={ this.props.project_data.header.create_date } icon="fa-clock-o" />
            <MiniSection size="4" style="purple" category="Creator" value={ this.props.project_data.header.creator } icon="fa-user" />
        </div>
        <div className="row">
            <MiniSection size="4" style="danger" category="Items" value={ this.props.project_data.header.items } icon="fa-database" />
            <MiniSection size="4" style="success" category="Runs" value={ this.props.project_data.header.runs } icon="fa-tag" />
            <MiniSection size="4" style="warning" category="Members" value={ this.props.project_data.header.members } icon="fa-users" />
        </div>
        </div>
        
        );
    }
}
const mapStateToProps = state => {
    return {
        project_data: state.projectReducer.project_selected,
        username: state.authentication.user,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getProjectHeader: (project_id) => {
            dispatch(getProjectHeader(project_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectStats);