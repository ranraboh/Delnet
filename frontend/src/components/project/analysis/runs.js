import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectAnalysis } from '../../../actions/project/model';
import { float_precision, color_by_result } from '../../general/methods';
import BarChart from '../../graph/bar';

class RunsAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            best_runs: [ '1st', '2nd', '3rd' ]
        }

        /* compute project analysis */
        this.props.getProjectAnalysis(this.props.selected_project.id)
    }

    render() {
        if (this.props.analysis == null) 
            return ''
        return (
            <div id="runs-analysis">
                <div class="container runs-set">
                    <div className="row">
                    {
                        this.props.analysis.runs.best_runs.map((record, index) => 
                            <div class="col-md-4" onClick={ () => this.select_run(index, record[0]) } >
                                <div class="run-item">
                                    <h6><a className="text-bold">{ this.state.best_runs[index] } </a></h6>
                                    <h6><a className="regular-text">{ 'Run code: ' + record[0] }</a></h6>
                                    <h6><a className="regular-text">{ 'Accuracy: ' + (float_precision(record[1].results.test * 100, 4)) + "%" }</a></h6>
                                    <h6><a className="hover-text">{ 'Epoch: ' + record[1].parameters.epoch.value }</a></h6>
                                    <h6><a className="hover-text">{ 'Batch Size: ' + record[1].parameters.batch_size.value }</a></h6>
                                    <h6><a className="hover-text">{ 'Learning Rate: ' + record[1].parameters.learning_rate.value }</a></h6>
                                    <h6><a className="hover-text">{ 'Weight Decay: ' + record[1].parameters.weight_decay.value }</a></h6>
                                    <h6><a className="hover-text">{ 'Optimizer: ' + record[1].parameters.optimizer.value }</a></h6>
                                    <h6><a className="hover-text">{ 'Loss Type: ' + record[1].parameters.loss_type.value }</a></h6>
                                </div>
                            </div>
                        )
                    }
                    <div id="best-results-analysis" className="container">
                        <div className="row">
                            <div className="col-6">
                                <h4 className="project-analysis-text">
                                    <span className="text-bold">Best accuracy rate over: </span><br/>
                                    Train Set: { float_precision(this.props.analysis.runs.best_result.train.result * 100, 5) + "%" } <br/>
                                    Validation Set: { float_precision(this.props.analysis.runs.best_result.dev.result * 100, 5) + "%" } <br/>
                                    Test Set: { float_precision(this.props.analysis.runs.best_result.test.result * 100, 5) + "%" } <br/>
                                </h4>
                            </div>
                            <div className="col-6">
                                <h4 className="project-analysis-text">
                                    <span className="text-bold"></span><br/>
                                    <span className={ "text-" + color_by_result(this.props.analysis.runs.best_result.train.result) }>{ this.props.analysis.runs.best_result.train.category } <br/></span>
                                    <span className={ "text-" + color_by_result(this.props.analysis.runs.best_result.dev.result) }>{ this.props.analysis.runs.best_result.dev.category } <br/></span>
                                    <span className={ "text-" + color_by_result(this.props.analysis.runs.best_result.test.result) }>{ this.props.analysis.runs.best_result.test.category } <br/></span>
                                </h4>
                            </div>
                        </div>
                        <p/>
                        <h4 className="project-analysis-text">
                            the following chart shows the distirubution of the run accuracy rate over the ranges classes:
                            it gives you a visual conception or summary about your model accuracy in different runs
                            <BarChart height="240px" data={ this.props.accuracy_range } category="Frequency" display="range" value="frequency" />
                        </h4>
                        <p/>
                        <h4 className="project-analysis-text">
                            <span className="text-bold">
                            Unlearn-model Rate: { this.props.analysis.runs.runs_status.not_learn.quantity + "/" + this.props.analysis.runs.runs_quantity.value + "  " + float_precision(this.props.analysis.runs.runs_status.not_learn.rate * 100, 4) + "%" } <br/>    
                            </span>
                            a state where the model doesn't learn at all,
                            simply put, the results of the model on the train set has not a sagnificant improvement over
                            uniformly random selection between the labels.
                            <p/>
                            <span className="text-bold">
                            Undefitting Rate: { this.props.analysis.runs.runs_status.underfitting.quantity + "/" + this.props.analysis.runs.runs_quantity.value + "  " + float_precision(this.props.analysis.runs.runs_status.underfitting.rate * 100, 4) + "%" } <br/>    
                            </span>
                            underfitting is a state where the model performs poorly on train set,
                            the model is too simple or designed poorly and therefore unable to learn complex and flexible function which describe well the training data
                            <p/>
                            <span className="text-bold">
                            Overfitting Rate: { this.props.analysis.runs.runs_status.overfitting.quantity + "/" + this.props.analysis.runs.runs_quantity.value + "  " + float_precision(this.props.analysis.runs.runs_status.overfitting.rate * 100, 4) + "%" } <br/>    
                            </span>
                            overfitting is a state where the model performs much better on the training set then on the test set.
                            the hypothesis space is large and the model can learn too complex and flexible functions which
                            perfectly describe the train set data and cling too closely to it. 
                            that is, the model memorize or fits itself closely to the training set instead of 
                            learn and explore a distinctive way to estimate the its label
                            therefore, the model ability to generalize and get good predictive performance for samples he never exposed before is limited
                            <p/>
                            <span className="text-bold">
                            Mediocre Rate: { this.props.analysis.runs.runs_status.mediocre.quantity + "/" + this.props.analysis.runs.runs_quantity.value + "  " + float_precision(this.props.analysis.runs.runs_status.mediocre.rate * 100, 4) + "%" } <br/>    
                            </span>
                            mediocre is a state where the model learns well on the train set,
                            however, his performance over the test set is mediocre in the range of 60% to 80%.
                            perhaps the model doesn't generalize well which leads to an insufficient accuracy of samples he never exposed before during train set.
                            <p/>
                            <span className="text-bold">
                            Good Performance Rate: { this.props.analysis.runs.runs_status.mediocre.quantity + "/" + this.props.analysis.runs.runs_quantity.value + "  " + float_precision(this.props.analysis.runs.runs_status.mediocre.rate * 100, 4) + "%" } <br/>    
                            </span>
                            good is a state where the model learns well on the train set and the test set as well,
                            perhaps it can reach higher accuracy/performance.
                            a slight changes in your model or in selected hyper-parameters may make the difference.
                            <p/>
                            <span className="text-bold">
                            Excellent Performance Rate: { this.props.analysis.runs.runs_status.mediocre.quantity + "/" + this.props.analysis.runs.runs_quantity.value + "  " + float_precision(this.props.analysis.runs.runs_status.mediocre.rate * 100, 4) + "%" } <br/>    
                            </span>
                            excellent is a state where the model has superb performance on the train set and the test set as well,
                            to be more accurate, the accuracy rate over test set has reached 90-100%  
                            </h4>
                    </div>
                    
                </div>
            </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        selected_project: state.projectReducer.project_selected,
        accuracy_range: state.projectReducer.project_selected.accuracy_range,
        analysis: state.projectReducer.project_selected.analysis
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProjectAnalysis: (project_id) => {
            dispatch(getProjectAnalysis(project_id))
        },
        getAccuracyRange : (project_id) => {
            dispatch(getAccuracyRange(project_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunsAnalysis);

