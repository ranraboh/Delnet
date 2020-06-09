import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectAnalysis } from '../../../actions/project/model';
import { float_precision } from '../../general/methods';
import ParameterAnalysis from './parameter';

class ParametersAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sections: {
                'learning_rate': false,
                'epoch': false,
                'weight_decay': false,
                'batch_size': false,
                'optimizer': false,
                'loss_type': false
            },
            offers: {
                'INCREASE_VALUE_HR': 'Highly Recommmended to increase value',
                'INCREASE_VALUE': 'Try to slightly increase value',
                'DECREASE_VALUE_HR': 'Highly Recommmended to decrease value',
                'DECREASE_VALUE': 'Try to slightly decrease value',
                'KEEP_VALUE': 'Value seems reasonable'
            }
        }

        /* bind inner methods */
        this.expand_section = this.expand_section.bind(this);
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
            <div id="parameters-analysis">
                <div className="project-analysis-text model-section-analysis" onClick={ () => this.expand_section('epoch') }>> Epoch</div><br/>
                <ParameterAnalysis data={ this.props.analysis.runs.parameters.epoch } display = { this.state.sections.epoch }
                terminology={ ` epochs is the number of iterations that has been made over the entire samples set in the training process` }
                description= { `high value epoch can lead to a state of overfitting where the model cling too much to the training set,
                    whereas, small value epoch may lead to a state of underfitting where the model need extra iterations to process the data 
                    and find a good classifier for the classification problem.` 
                } />
                <div className="project-analysis-text model-section-analysis" onClick={ () => this.expand_section('batch_size') }>> Batch Size</div><br/>
                <ParameterAnalysis data={ this.props.analysis.runs.parameters.batch_size } display = { this.state.sections.batch_size }
                terminology={ ` in training process we divide the dataset into number of batches or groups such that each batch contains fixed size of samples,
                batch size is an hyper parameters which declare the total number of training samples present in a single batch.` }
                description= { ` large batch size allows computational speedup from the parallelism of GPUs
                using large batch size makes prohibitively faster convergence toward the minimum (or perhaps around it).
                however, too high batch size may lead to a state of underfitting and poor generilization 
                small batch size, on the other hand, may induce slow convergence toward the optimal value` 
                } />
                <div className="project-analysis-text model-section-analysis" onClick={ () => this.expand_section('learning_rate') }>> Learning Rate</div><br/>
                <ParameterAnalysis data={ this.props.analysis.runs.parameters.learning_rate } display = { this.state.sections.learning_rate }
                terminology={ ` the learning rate is a configurable hyperparameter used in the training of neural networks that has a small positive value, often in the range between 0.0 and 1.0.       
                The learning rate is a hyperparameter that controls how much to change the model in response to the
                estimated error each time the model weights are updated.` }
                description= { ` Choosing the learning rate is challenging as a value too small may result in a long training process
                that is, the optimization algorithms takes small steps toward the minimum and therefore takes prohibitively long time to converge. 
                whereas value too high makes the algorithm to take large steps toward to minimum. the model makes drastic updates which cause the optimization algorithm to overshoot the minimum` 
                } /> 
                <div className="project-analysis-text model-section-analysis" onClick={ () => this.expand_section('weight_decay') }>> Weight Decay</div><br/>
                <ParameterAnalysis data={ this.props.analysis.runs.parameters.weight_decay } display = { this.state.sections.weight_decay }
                terminology={ ` 
                weight decay is configurable hyper-parameter which declare decay rule for the learning rate value.
                simply put, it declare how the effect of weight update varies over time.
                our optimal situation is to make large steps toward the minimum to converge faster,
                since we might overshoot the minimum, as time progress we take smaller steps ` }
                description= { `if the weight decay value is too small, even though the step size decreased over time, it may still be
                large and overshoot the minimum. 
                while if the weight decay value is too high, can be situations of long training process or
                a state of underfitting where the weight update effect can be too minor and the model doesn't learns or influenced by the samples he exposed during the train process.    ` 
                } />
                <div className="project-analysis-text model-section-analysis" onClick={ () => this.expand_section('optimizer') }>> Optimizer</div><br/>
                <ParameterAnalysis data={ this.props.analysis.runs.parameters.optimizer } display = { this.state.sections.optimizer }
                terminology={ ` epochs is the number of iterations that has been made over the entire samples set in the training process` }
                description= { `high value epoch can lead to a state of overfitting where the model cling too much to the training set,
                    whereas, small value epoch may lead to a state of underfitting where the model need extra iterations to process the data 
                    and find a good classifier for the classification problem.` 
                } />
                <div className="project-analysis-text model-section-analysis" onClick={ () => this.expand_section('loss_type') }>> Loss Function</div><br/>
                <ParameterAnalysis data={ this.props.analysis.runs.parameters.loss_type } display = { this.state.sections.loss_type }
                terminology={ ` epochs is the number of iterations that has been made over the entire samples set in the training process` }
                description= { `high value epoch can lead to a state of overfitting where the model cling too much to the training set,
                    whereas, small value epoch may lead to a state of underfitting where the model need extra iterations to process the data 
                    and find a good classifier for the classification problem.` 
                } />                                       
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        selected_project: state.projectReducer.project_selected,
        analysis: state.projectReducer.project_selected.analysis
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProjectAnalysis: (project_id) => {
            dispatch(getProjectAnalysis(project_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParametersAnalysis);

