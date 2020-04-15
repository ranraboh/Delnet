import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getDatasetLabels } from '../../actions/datasets.js';
import BarChart from '../graph/bar.js'

class LabelsDistribution extends Component {
    constructor(props) {
		super(props)
        this.props.getDatasetLabels(this.state.dataset.id);
    }
	
    render() {
        return (
            <div id="items-graph-section" className="section-in-main">
                <div className="header-section-v1 header-v1-red">
                    <h1 className="header-v1-title">
                        Labels Distribution
                    </h1>
                    <h2 className="header-v1-intro">
                        the graph shows the distribution of labels 
                    </h2>
                </div>
				<BarChart data={ this.props.dataset_data } display="name" value="count" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataset_data: state.datasetsReducer.dataset_selected,
        username: state.authentication.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
		getDatasetsItemsAmount: (username) => {
            dispatch(getDatasetsItemsAmount(username))
        }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelsDistribution);
