import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getDatasetAnalysis, getDatasetProjects, getDatasetLabels } from '../../actions/dataset/get';
import BarChart from '../graph/bar.js';
import PieChart from '../graph/pie.js';
import ProgressBar from '../home/progressbar';

class AnalysisDataset extends Component {
    constructor(props) {
        super(props)
        this.state = {
            size_evaluation: true,
            distribution_evaluation: true,
            distirubution_classes: false,
            project_accuracy: false,
            generic_model: false,
            size_explained: false,
            distirubution_explained: false
        }
        /* get dataset analysis data from backend */
        this.props.getDatasetAnalysis(this.props.dataset_data.id)
        this.props.getDatasetProjects(this.props.dataset_data.id)
        this.props.getDatasetLabels(this.props.dataset_data.id);

        this.size_evaluation_handler = this.size_evaluation_handler.bind(this);
        this.distribution_classes_handler = this.distribution_classes_handler.bind(this);
        this.distribution_evaluation_handler = this.distribution_evaluation_handler.bind(this);
        this.project_accuracy_handler = this.project_accuracy_handler.bind(this);
        this.generic_model_handler = this.generic_model_handler.bind(this);
        this.size_explained_handler = this.size_explained_handler.bind(this);
        this.distribution_explained_handler = this.distribution_explained_handler.bind(this);
    }

    size_evaluation_handler() {
        this.setState({
            ...this.state,
            size_evaluation: !this.state.size_evaluation
        })
    }

    size_explained_handler() {
        this.setState({
            ...this.state,
            size_explained: !this.state.size_explained
        })
    }
    
    distribution_evaluation_handler() {
        this.setState({
            ...this.state,
            distribution_evaluation: !this.state.distribution_evaluation
        })
    }

    distribution_explained_handler() {
        this.setState({
            ...this.state,
            distirubution_explained: !this.state.distirubution_explained
        })
    }

    distribution_classes_handler() {
        this.setState({
            ...this.state,
            distirubution_classes: !this.state.distirubution_classes
        })
    }

        
    project_accuracy_handler() {
        this.setState({
            ...this.state,
            project_accuracy: !this.state.project_accuracy
        })
    }

        
    generic_model_handler() {
        this.setState({
            ...this.state,
            generic_model: !this.state.generic_model
        })
    }

    capitalize = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
    }

    render() {
        if (!this.props.analysis || !this.props.dataset.labels) {
            return ''
        }
        return (
            <div className="dataset-analysis">
            <div className="container">
                <div className="row">
                    <div class="col-lg-4 mb-4">
                        <div class="card bg-info text-white shadow">
                            <div class="card-body">
                            Size Analysis
                            <div class="text-white-50 small">dataset capacity size</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <p/>
                        <p className="text-poppins text-info">
                            Number of samples: { this.props.analysis.size.size }<br/>
                            Capacity Class: { this.capitalize(this.props.analysis.size.size_category.replace("_", " ")) }                      
                        </p>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <p/>
                        <span className={ (this.state.size_explained)?"link-analysis-activate text-info": "link-analysis-unactivate text-info" } onClick={ this.size_explained_handler }>
                            Meaning                            
                        </span><br/>
                        <span className={ (this.state.size_evaluation)?"link-analysis-activate text-info": "link-analysis-unactivate text-info" } onClick={ this.size_evaluation_handler }>
                            Evaluation                            
                        </span>
                    </div>
                    </div>
                    {   
                        (this.state.size_explained)?
                        <div className="row dataset-analysis-text">
                            <span className="underline">Meaning:</span>
                            analysis of the dataset size - the number of samples in it. <br/>
                            the size of the dataset has a sagnificant impact on the project performence.<br/>
                            based on the data, the model learns a distinctive way to solve its problem <br/> 
                            the model has to be exposed to many samples to be more accurate and have a good performence.  <br/>
                        </div>:''
                    }
                {
                    (this.state.size_evaluation)?
                    <div className="row dataset-analysis-text">
                        <span className="underline">Evaluation:</span>
                        Capacity Level: { this.capitalize(this.props.analysis.size.size_category.replace("_", " ")) } <br/>
                        { this.props.analysis.size.info_representation } <br/>
                        <ProgressBar show={ false } value={ this.props.analysis.size.size / 50000 * 100 } />
                    </div>:''
                }
                <div className="row"><p/></div>
                <div className="row">
                    <div class="col-lg-4 mb-4">
                        <div class="card bg-primary text-white shadow">
                            <div class="card-body">
                            Distirubution Analysis
                            <div class="text-white-50 small">dataset balance</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <p/>
                        <p className="text-poppins text-primary">
                            Mean: { this.props.analysis.mean } <br/>
                            Standard Deviation: { (this.props.analysis.standard_deviation.value).toString().substring(0, 6) } <br/>                        </p>

                    </div>
                    <div className="col-lg-4 mb-4">
                        <p/>
                        <span className={ (this.state.distirubution_explained)?"link-analysis-activate text-info": "link-analysis-unactivate text-info" } onClick={ this.distribution_explained_handler }>
                            Meaning                            
                        </span><br/>
                        <span className={(this.state.distribution_evaluation)?"link-analysis-activate text-primary": "link-analysis-unactivate text-primary"} onClick={ this.distribution_evaluation_handler }>
                            Evaluation                            
                        </span><br/>
                        <span className={ (this.state.distirubution_classes)?"link-analysis-activate text-primary": "link-analysis-unactivate text-primary" } onClick={ this.distribution_classes_handler }>
                            Classes Distribution
                        </span>
                    </div>
                </div>
                {
                    (this.state.distirubution_explained)?
                    <div className="row dataset-analysis-text">
                        <span className="underline">Meaning:</span>
                        distribution analysis measures how much the dataset is balanced.
                        the anyalsis conducted using common statics tool standard deviation. <br/>
                        standard deviation measures the distirubution of the samples among the labels. 
                        low standard deviation value indicates a well-balanced dataset and as the value increases,
                        the disparity in the quantity of the dataset samples over the classes is more sagnificant.  <br/>
                    </div>:''
                }
                {
                    (this.state.distribution_evaluation)?
                    <div className="dataset-analysis-text">
                        <div className="underline">Evaluation:</div>
                        Distirubution Category: { this.capitalize(this.props.analysis.standard_deviation.category.replace('_',' ')) } <br/>
                        <ProgressBar show={ false } value={ (2000 - this.props.analysis.standard_deviation.value) / 2000 * 100 } />
                    </div>:''
                }
            </div>
                <p/>
                {
                    (this.state.distirubution_classes)?
                    <div id="distribution-classes">
                        <span className="underline">Distribution Classes:</span>
                        The table display the distribution of items across the classes,
                        you can learn which classes are considered radically imbalanced and far from the mean.
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
                                        <td className="col-2">{ record.standard_category.replace('_', ' ') }</td>
                                        <td className="col-4">{ record.description } <br/> { record.offer }</td>
                                    </tr>)
                                })
                            } 
                            </tbody>
                        </table>
                        the graph shows visually the disribution of items across the classes
                        <PieChart height="240px" data={ this.props.dataset.labels } display="name" value="count" />
                        </div>:''
                    }
                    <p/>
                    <div className="project-analysis-text model-section-analysis" onClick={ this.project_accuracy_handler }>> Projects Accuracy</div><br/>
                    {
                        (this.state.project_accuracy)?
                        <h4 className="dataset-analysis-text">
                            a good way to evaluate the dataset quality is to check the performence of the project that are using this dataset.
                            currently, there are { this.props.projects.length } projects. <br/>
                            the distirubution over the runs accuracy rate ranges shown in the following chart: <br/>
                            <BarChart height="240px" data={ this.props.projects } category="Projects Accuracy" display="name" value="result" />
                            <p/>
                            
                            <span className="text-bold">Max accuracy rate: { this.props.analysis.projects.max } </span><p/>
                            <span className="underline">evaluation: </span>
                            { this.props.analysis.projects.text }
                            <p/>
                        </h4>:''
                    }
                    <div className="project-analysis-text model-section-analysis" onClick={ this.generic_model_handler }>> Evaluation by powerful model</div><br/>
                    {
                        (this.state.generic_model)?
                        <h4 className="dataset-analysis-text">
                            we have evaluated the dataset by its size, distribution and the accuracy and performence of the models that used this dataset.
                            it may give you a good sign of your dataset quaility.
                            however, what if the models that are using this dataset are not well-designed and fit to the classification problem
                            or the dataset is not widely used. <br/>
                            a further feature to investigate your dataset performence is to run it on a familiar model renowned for its strength and good predictive performence.    
                        </h4>:''
                    }

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataset_data: state.datasetsReducer.dataset_selected,
        analysis: state.datasetsReducer.analysis,
        projects: state.datasetsReducer.dataset_projects,
        dataset: state.datasetsReducer.dataset_selected,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getDatasetAnalysis: (dataset_id) => {
            dispatch(getDatasetAnalysis(dataset_id))
        },
        getDatasetProjects: (dataset_id) => {
            dispatch(getDatasetProjects(dataset_id))
        },
        getDatasetLabels: (dataset_id) => {
            dispatch(getDatasetLabels(dataset_id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisDataset);