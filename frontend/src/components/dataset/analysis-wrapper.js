import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import AnalysisDataset from './analysis'

class AnalysisDatasetWrapper extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="section-in-main">
                <div className="header-section-v2">
                    <h1 className="dataset-header-title dataset-header-blue">
                        Dataset Analysis
                    </h1>
                </div>
                <AnalysisDataset />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataset_data: state.datasetsReducer.dataset_selected
    }
}


const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisDatasetWrapper);