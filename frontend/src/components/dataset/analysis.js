import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getDatasetAnalysis } from '../../actions/dataset/get';
import ProgressBar from '../home/progressbar';

class AnalysisDataset extends Component {
    constructor(props) {
        super(props)
    
        /* get dataset analysis data from backend */
        this.props.getDatasetAnalysis(this.props.dataset_data.id)
    }

    render() {
        if (!this.props.analysis) {
            return ''
        }
        return (
            <div className="section-in-main">
                <div className="header-section-v2">
                    <h1 className="dataset-header-title dataset-header-blue">
                        Dataset Analysis
                    </h1>
                </div>
                <h4 className="dataset-analysis-text">
                    <span className="text-bold">Size Analysis</span><br/>
                    Dataset Size: { this.props.analysis.size.size } <br/>
                    Capacity Level: { this.props.analysis.size.size_category } <br/>
                    { this.props.analysis.size.info_representation } <br/>
                    <ProgressBar show={ false } value={ this.props.analysis.size.size / 50000 * 100 } />

                    <p/>
                    <span className="text-bold"> Distirubution Analysis</span><br/>
                    Mean: { this.props.analysis.mean } <br/>
                    Standard Deviation: { this.props.analysis.standard_deviation.value } <br/>
                    Data Distirubution Category: { this.props.analysis.standard_deviation.category } <br/>
                    standard deviation measures the distirubution of the samples among the labels. <br/>
                    low standard deviation value indicates a well-balanced dataset and as the value increases,
                    the disparity in the quantity of the dataset samples over the classes is more noticeable.  <br/>
                    <ProgressBar show={ false } value={ (2000 - this.props.analysis.standard_deviation.value) / 2000 * 100 } />
                </h4>
                <p/>
                <table class="table">
                    <thead>
                        <tr className="table-header-sea d-flex">
                            <th className="col-1">Label</th>
                            <th className="col-2">Quantity</th>
                            <th className="col-2">Standard Score</th>
                            <th className="col-2">Standard Category</th>
                            <th className="col-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {        
                        Object.values(this.props.analysis.balance).map(function (record) {
                            return (
                            <tr className="table-text table-hover d-flex">
                                <td className="main-field col-1">{ record.name }</td>
                                <td className="col-2">{ record.quantity }</td>
                                <td className="col-2">{ record.standard_score }</td>
                                <td className="col-2">{ record.standard_category }</td>
                                <td className="col-4">{ record.description } <br/> { record.offer }</td>
                            </tr>)
                        })
                    } 
                    </tbody>
                    </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataset_data: state.datasetsReducer.dataset_selected,
        analysis: state.datasetsReducer.analysis,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getDatasetAnalysis: (dataset_id) => {
            dispatch(getDatasetAnalysis(dataset_id))
        }      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisDataset);