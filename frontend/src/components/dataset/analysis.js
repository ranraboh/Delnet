import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getDatasetAnalysis, getDatasetProjects } from '../../actions/dataset/get';
import BarChart from '../graph/bar.js';
import ProgressBar from '../home/progressbar';

class AnalysisDataset extends Component {
    constructor(props) {
        super(props)
    
        /* get dataset analysis data from backend */
        this.props.getDatasetAnalysis(this.props.dataset_data.id)
        this.props.getDatasetProjects(this.props.dataset_data.id)
    }

    render() {
        if (!this.props.analysis) {
            return ''
        }
        return (
            <div className="dataset-analysis">
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
                    <p/>
                    <h4 className="dataset-analysis-text">
                    <span className="text-bold">Projects Accuracy:</span><br/>
                        a good way to evaluate the dataset quality is to check the performence of the project that are using this dataset.
                        currently, there are { this.props.projects.length } projects. <br/>
                        the distirubution over the runs accuracy rate ranges shown in the following chart: <br/>
                        <BarChart height="240px" data={ this.props.projects } category="Projects Accuracy" display="name" value="result" />
                        <p/>
                        
                        Max accuracy rate: { this.props.analysis.projects.max } <br/>
                        <span className="underline">evaluation: </span>
                        { this.props.analysis.projects.text }
                        <p/>
                        <span className="text-bold">Evaluation By Generic Model:</span><br/>
                        we have evaluated the dataset by its size, distribution and the accuracy and performence of the models that used this dataset.
                        it may give you a good sign of your dataset quaility.
                        however, what if the models that are using this dataset are not well-designed and fit to the classification problem
                        or the dataset is not widely used. <br/>
                        a further feature to investigate your dataset performence is to run it on a familiar model renowned for its strength and good predictive performence.    
                    </h4>   
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataset_data: state.datasetsReducer.dataset_selected,
        analysis: state.datasetsReducer.analysis,
        projects: state.datasetsReducer.dataset_projects,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getDatasetAnalysis: (dataset_id) => {
            dispatch(getDatasetAnalysis(dataset_id))
        },
        getDatasetProjects: (dataset_id) => {
            dispatch(getDatasetProjects(dataset_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisDataset);