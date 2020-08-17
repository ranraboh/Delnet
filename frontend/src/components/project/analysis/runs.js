import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectAnalysis } from '../../../actions/project/model';
import { float_precision, color_by_result } from '../../general/methods';
import BarChart from '../../graph/bar';

class RunsAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            best_runs: [ '1st', '2nd', '3rd' ],
            sections: {
                best_runs:false,
                runs_accuracy: true,
                runs_status: false
            }
        }

        /* compute project analysis */
        this.props.getProjectAnalysis(this.props.selected_project.id)

        /* bind inner methods */
        this.expand_section = this.expand_section.bind(this);
    }

    capitalize = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
    }

    expand_section(section_name) {
        let sections = this.state.sections
        sections[section_name] = !sections[section_name]
        this.setState({
            ...this.state,
            sections
        })
    }

    render() {
        if (this.props.analysis == null) 
            return ''
        return (
            <div id="runs-analysis">
                <div class="container runs-set">
                <div className="container">
                <div className="row">
                    <div class="col-lg-4 mb-4">
                        <div class="card bg-primary text-white shadow">
                            <div class="card-body">
                            Runs Analysis
                            <div class="text-white-50 small">model runs</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-1 mb-4"></div>
                    <div className="col-lg-4 mb-4">
                        <p/>
                        <span className={ (this.state.sections.best_runs)?"link-analysis-activate text-primary": "link-analysis-unactivate text-primary" } onClick={ () => this.expand_section('best_runs') }>
                            Best Runs Accuracy                            
                        </span><br/>
                        <span className={ (this.state.sections.runs_accuracy)?"link-analysis-activate text-primary": "link-analysis-unactivate text-primary" } onClick={ () => this.expand_section('runs_accuracy') }>
                            Runs Accuracy Distribution                            
                        </span><br/>
                        <span className={ (this.state.sections.runs_status)?"link-analysis-activate text-primary": "link-analysis-unactivate text-primary" } onClick={ () => this.expand_section('runs_status') }>
                            Runs Status                   
                        </span>
                    </div>
                </div>
                </div>
                    <div className="row">
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
                                    <span className={ "text-" + color_by_result(this.props.analysis.runs.best_result.train.result) }>{ this.capitalize(this.props.analysis.runs.best_result.train.category.replace("_", " ")) } <br/></span>
                                    <span className={ "text-" + color_by_result(this.props.analysis.runs.best_result.dev.result) }>{ this.capitalize(this.props.analysis.runs.best_result.dev.category.replace("_", " ")) } <br/></span>
                                    <span className={ "text-" + color_by_result(this.props.analysis.runs.best_result.test.result) }>{ this.capitalize(this.props.analysis.runs.best_result.test.category.replace("_", " ")) } <br/></span>
                                </h4>
                            </div>
                        </div>
                        {
                            (this.state.sections.best_runs)?
                            <div className="container container-best-runs">
                                <span className="underline">Best Runs:</span><br/>
                                the best three accuracy outcomes over the model runs are as following 
                                <div className="row">
                                {
                                    this.props.analysis.runs.best_runs.map((record, index) => 
                                    <div class="col-md-4" onClick={ () => this.select_run(index, record[0]) } >
                                        <div class="run-item">
                                            <h6><a className="text-bold">{ this.state.best_runs[index] } </a></h6>
                                            <h6><a>{ 'Accuracy: ' + (float_precision(record[1].results.test * 100, 4)) + "%" }</a></h6>
                                        </div>
                                    </div>
                                    )
                                }
                            </div>
                            <p/><p/><p/>
                        </div>:''
                        }
                        <p/>
                        {
                            (this.state.sections.runs_accuracy)?
                            <h4 className="project-analysis-text">
                                <span className="underline">Runs Accuracy Distribution:</span><br/>
                                the following chart shows the distirubution of the accuracy rate of all the runs:
                                it gives you a visual conception or summary about your model performence
                                <BarChart height="240px" data={ this.props.accuracy_range } category="Frequency" display="range" value="frequency" />
                            </h4>:''
                        }
                        <p/>
                        {
                            (this.state.sections.runs_status)?
                                <h4 className="project-analysis-text">
                                    <span className="underline">Runs Status:</span><br/>
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
                                    learn and explore a distinctive way to estimate its label
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
                                    Good Performance Rate: { this.props.analysis.runs.runs_status.good.quantity + "/" + this.props.analysis.runs.runs_quantity.value + "  " + float_precision(this.props.analysis.runs.runs_status.good.rate * 100, 4) + "%" } <br/>    
                                    </span>
                                    good is a state where the model learns well on the train set and the test set as well,
                                    perhaps it can reach higher accuracy/performance.
                                    a slight changes in your model or in selected hyper-parameters may make the difference.
                                    <p/>
                                    <span className="text-bold">
                                    Excellent Performance Rate: { this.props.analysis.runs.runs_status.excellent.quantity + "/" + this.props.analysis.runs.runs_quantity.value + "  " + float_precision(this.props.analysis.runs.runs_status.excellent.rate * 100, 4) + "%" } <br/>    
                                    </span>
                                    excellent is a state where the model has superb performance on the train set and the test set as well,
                                    to be more accurate, the accuracy rate over test set has reached 90-100%  
                                </h4>:''
                            }
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

