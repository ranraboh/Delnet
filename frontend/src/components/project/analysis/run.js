import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectAnalysis } from '../../../actions/project/model'
import ProgressBar from '../../home/progressbar';
import { float_precision } from '../../general/methods';

class RunAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            epoch: 0
        }
        if (this.props.analysis == null)
            this.props.getProjectAnalysis(this.props.project.id)
    }

    should_early_stopping(value) {
        if (value > 1)
            return "Yes, it has large impact over the performence"
        else if (value > 0.1)
            return "Yes, however the impact is not significant"
        else if (value == 0)
            return "No"
        else
            return "The Difference is minor"
        
    }

    display_status(status) {
        if (status == 'INCREASE_VALUE_HR')
            return "Highly Recommended to increase value"
        else if (status == "INCREASE_VALUE")
            return "Try out larger values"
        else if (status == "KEEP_VALUE")
            return "Keep value"
        else if (status == "DECREASE_VALUE")
            return "Try out smaller values"
        else if (status == "DECREASE_VALUE_HR")
            return "Highly Recommended to decrease value"
        else if (status =="CHANGE_VALUE")
            return "Change value"
        return ""
    }   

    render() {
        if (this.props.run.id === null || this.props.run.id === undefined || this.props.analysis == null)
            return ''
        let analysis = this.props.analysis.runs.runs[this.props.run.id]
        return (
            <div id="run-features">
            <div className="container">
                <div className="row">
                    <div class="col-lg-4 mb-2">
                        <div class="card bg-primary text-white shadow card-outcomes">
                            <div class="card-body">
                                Results
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-2">
                        <div class="card bg-danger text-white shadow card-outcomes">
                            <div class="card-body">
                                Features
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-2">
                        <div class="card bg-success text-white shadow card-outcomes">
                            <div class="card-body">
                                Parameters
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div class="col-lg-4 mb-2">
                        Train Set: { (float_precision(analysis.results.train * 100, 4)) + "%" } <br/>
                        <ProgressBar show={ false } value={ analysis.results.train * 100 } /> <br/> 
                        Dev Set: { (float_precision(analysis.results.dev * 100, 4)) + "%" } <br/>
                        <ProgressBar show={ false } value={ analysis.results.dev * 100 } /> <br/>
                        Test Set: { (float_precision(analysis.results.test * 100, 4)) + "%" } <br/>
                        <ProgressBar show={ false } value={ analysis.results.test * 100 } /> <br/>
                    </div>
                    <div class="col-lg-4 mb-2">
                        <span className="text-bold">Undefitting:</span> { (analysis.undefitting)? "Yes": "No" } <br/>
                        <span className="text-bold">Overfitting:</span> { (analysis.overfitting)? "Yes": "No" } <br/>
                        <span className="text-bold">Best Epoch:</span> {  analysis.early_stopping.max.epoch + 1 } <br/>
                        With accuracy of { (float_precision(analysis.early_stopping.max.value * 100, 4)) + "%" } <br/>
                        Difference from last epoch: { (float_precision(analysis.early_stopping.max.difference * 100, 5)) + "%" } <br/>
                        <span className="text-bold">Should Stop Early:</span> { this.should_early_stopping(analysis.early_stopping.max.difference * 100) } <br/>
                    </div>
                    <div class="col-lg-4 mb-2 run-parameters-view">
                    <span className="text-bold">Epoch: </span> { analysis.parameters.epoch.value } <br/>
                    Tip: { this.display_status(analysis.parameters.epoch.status) } <br/>
                    { analysis.parameters.epoch.text } <p/>
                    <span className="text-bold">Learning Rate: </span>{ analysis.parameters.learning_rate.value } <br/>
                    Tip: { this.display_status(analysis.parameters.learning_rate.status) } <br/>
                    { analysis.parameters.learning_rate.text } <p/>
                    <span className="text-bold">Batch Size: </span>{ analysis.parameters.batch_size.value } <br/>
                    Tip: { this.display_status(analysis.parameters.batch_size.status) } <br/>
                    { analysis.parameters.batch_size.text } <p/>
                    <span className="text-bold">Weight Decay: </span>{ analysis.parameters.weight_decay.value } <br/>
                    Tip: { this.display_status(analysis.parameters.optimizer.status) } <br/>
                    { analysis.parameters.weight_decay.text } <p/>
                    <span className="text-bold">Optimizer: </span>{ analysis.parameters.optimizer.value } <br/>
                    Tip: { this.display_status(analysis.parameters.epoch.status) } <br/>
                    { analysis.parameters.optimizer.text } <p/>
                    <span className="text-bold">Loss Function: </span>{ analysis.parameters.loss_type.value } <br/>
                    Tip: { this.display_status(analysis.parameters.loss_type.status) } <br/>
                    { analysis.parameters.loss_type.text } 
                    </div>
                </div>
            </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        run: state.modelReducer.selected_run,
        analysis: state.projectReducer.project_selected.analysis,
        project: state.projectReducer.project_selected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProjectAnalysis: (project_id) => {
            dispatch(getProjectAnalysis(project_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunAnalysis);

