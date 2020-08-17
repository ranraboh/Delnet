import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getDatasetLabels } from '../../../actions/dataset/get';
import PieChart from '../../graph/pie';

class LabelsDistribution extends Component {
    constructor(props) {
		super(props)
        this.props.getDatasetLabels(this.props.dataset_data.id);
    }
	
    render() {
        if (this.props.dataset_data.labels == null)
            return ''
        if (this.props.dataset_data.labels.length == 0) {
            return (<div className="section-in-main">
            <div className="header-section-v2">
                <h1 className="dataset-header-title dataset-header-blue">
                    Labels Distribution
                </h1>
            </div>
            <h4 className="dataset-graph-intro text-purple">
                you haven't define labels for your dataset yet. <br/>
                you can insert new label through add label tab
            </h4>
            </div>)
        }
        return (
            <div className="section-in-main">
                <div className="header-section-v2">
                    <h1 className="dataset-header-title dataset-header-blue">
                        Labels Distribution
                    </h1>
                </div>
                <h4 className="dataset-graph-intro">
                    the graph the distribution of samples over the labels or classes <br/> 
                    that is, the graph provides information about the class sizes  <br/>
                    the quantity of samples for each class in dataset <br/>
                </h4>
				<PieChart height="240px" data={ this.props.dataset_data.labels } display="name" value="count" />
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
		getDatasetLabels: (dataset_id) => {
            dispatch(getDatasetLabels(dataset_id))
        }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelsDistribution);
