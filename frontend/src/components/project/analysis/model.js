import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectAnalysis } from '../../../actions/project/model';
import ProgressBar from '../../home/progressbar';

class ModelAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: {
                'INCREASE_VALUE_HR': 'Highly Recommended to increase value',
                'INCREASE_VALUE': 'Increase value may lead to improve model performence',
                'KEEP_VALUE': 'The value seems reasonable',
                'DECREASE_VALUE_HR': 'Highly Recommended to decrease value',
                'DECREASE_VALUE': 'decrease value may lead to improve model performence'
            },
            sections: {
                'model_structure': false,
                'activations': false,
                'dropout': false,
                'convolution': false
            }
        }
        /* bind inner methods */
        this.model_structure = this.model_structure.bind(this);
        this.activations = this.activations.bind(this);
        this.dropout = this.dropout.bind(this);
        this.convolution = this.convolution.bind(this);
        this.expand_section = this.expand_section.bind(this);

        /* compute project analysis */
        if (this.props.analysis == null)
            this.props.getProjectAnalysis(this.props.selected_project.id);
    }

    expand_section(section_name) {
        let sections = this.state.sections
        sections[section_name] = !sections[section_name]
        this.setState({
            ...this.state,
            sections
        })
    }

    model_structure() {
        if (this.state.sections.model_structure == false)
            return ''
        return (<div className="model-structure">
            <h4 className="project-analysis-text">
                <span className="text-bold">Number Of Parameters: { this.props.analysis.model.structure.parameters.quantity }</span><br/>
                a model parameter is a configuration variable that is internal to the model and whose value can be estimated from data.<br/>
                Status: { this.state.status[this.props.analysis.model.structure.parameters.status] }
                <ProgressBar show={ false } value={ this.props.analysis.model.structure.parameters.quantity / 100000 * 100 } />
                <p/>
                <span className="text-bold">Number Of Layers: { this.props.analysis.model.structure.layers_quantity.quantity }</span><br/>
                the model made of multiple layers, layers are where the computation takes place. 
                the layer receives input from the previous layer, performs transformation to the received data
                and transfer it forward to the next layer.<br/>
                Status: { this.state.status[this.props.analysis.model.structure.layers_quantity.status] }
                <ProgressBar show={ false } value={ this.props.analysis.model.structure.layers_quantity.quantity / 200 * 100 } />
                <p/>
                <span className="underline">how it affects model performence:</span>
                The greater the number of layers and parameters in a model, the more complex and flexible functions can be learned. <br/>
                too many parameters or layers may lead to a state of overfitting,
                that is, the model is too closely fit to a limited set of data points and doesn't generalize well. <br/>
                shortage of parameters or layers may lead to a state of underfitting,
                state where the model is too simple to learn complex and flexible functions which describe or classify the data well. <br/>
                <p/>
                <span className="underline">evaluation:</span>
                { this.props.analysis.model.structure.text } <br/>
            </h4>
        </div>)
    }

    activations() {
        if (this.state.sections.activations == false)
            return ''
        return (<div className="activations-analysis">
            <h4 className="project-analysis-text">
                <span className="text-bold">Usage frequency: { this.props.analysis.model.modules.activations.usage.activations_quantity } <br/></span>
                the layers in neural network can integrate activation functions.
                the activation function triggered before the data trasmited forward into the next layer.
                it provides non-linear constituent to the model and allows it to classify inseperable data.<br/>
                Status: { this.state.status[this.props.analysis.model.modules.activations.usage.status] }
                <p/>
                <span className="underline">evaluation:</span>
                { this.props.analysis.model.modules.activations.usage.text } <br/>
                <p/>
                Activations functions used:
                {        
                    Object.entries(this.props.analysis.model.modules.activations.activations_list).map(function (record) {
                        return (
                            <span>
                                { record[0] }
                            </span>
                        )
                    }, this)
                } <br/>
                Max used activation: { this.props.analysis.model.modules.activations.max_used.activation } with usage rate of { this.props.analysis.model.modules.activations.max_used.value } <p/>
            </h4>

                <table class="table">
                <thead>
                    <tr className="table-header-sea d-flex">
                        <th className="col-4">Activation Function</th>
                        <th className="col-4">Quantity</th>
                        <th className="col-4">Usage Rate</th>
                    </tr>
                </thead>
                <tbody>
                {        
                    Object.entries(this.props.analysis.model.modules.activations.activations_list).map(function (record) {
                        return (
                        <tr className="table-text table-hover d-flex">
                            <td className="main-field col-4">{ record[0] }</td>
                            <td className="main-field col-4">{ record[1] }</td>
                            <td className="main-field col-4">{ this.props.analysis.model.modules.activations.activations_rate[record[0]] }</td>
                        </tr>)
                    }, this)
                } 
                </tbody>
                </table>
                <h4 className="project-analysis-text">
                    <span className="underline">activation types evaluation: </span>
                    { this.props.analysis.model.modules.activations.type.text }
                </h4>
        </div>)
    }

    dropout() {
        if (this.state.sections.dropout == false)
            return ''  
        return (<div className="dropout-section">
            <h4 className="project-analysis-text">
            <span className="text-bold">Usage frequency: { this.props.analysis.model.modules.dropout.exist } <br/></span>
            <div className="text-bold">Dropout constants: { 
            this.props.analysis.model.modules.dropout.dropout_constant.length == 0 ? 'None' 
            : this.props.analysis.model.modules.dropout.dropout_constant.map((record) =>
                    <span> { record } </span>
            ) }</div>
            Average constant value: { this.props.analysis.model.modules.dropout.average_constant } <br/>
            Status: { this.state.status[this.props.analysis.model.modules.dropout.status] } <br/>
            dropout is simple and powerful regularization technique for neural networks and deep learning models.
            Simply put, dropout ignore certain set of neurons chosen in random in training phase.
            these units are not considered during a particular forward or backward pass.
            dropout main goal is to overcame a state of overfitting, it make it harder for the model to memorize and cling too much to the training data. 
            <br/>
            <p/>
            <span className="underline">how it affects model performence:</span>
            dropout constanst is the probability each neuron is ignored in propogation process.
            high value may lead to a state of underfitting when the model is too regularized,
            wheres small value may be not enough to overcame the state of overfitting.
            <p/>
            <span className="underline">evaluation:</span>
            { this.props.analysis.model.modules.dropout.text }
            </h4>
        </div>)
    }

    convolution() {
        if (this.state.sections.convolution == false)
            return ''
        return (<div className="dropout-section">
            <h4 className="project-analysis-text">
            <span className="text-bold">Usage frequency: { this.props.analysis.model.modules.convolution.quantity.value } <br/></span>
            Status: { this.state.status[this.props.analysis.model.modules.convolution.quantity.status] } <br/>
            convolution is model layer used to extract features or local patterns from an input image
            in a manner independent of its position in the image. 
            convolution layer composed of set of learnable small matrices called filters. 
            each filter potentially locate different features in image to maximize the model performence.
            low-rank layers filters is able to idenify basic graphical shapes, colors, curves etc while
            high-rank layers filter can locate complex features as eyes or nose depending on the classificatin task. 
            <br/>
            <p/>
            <span className="underline">how it affects model performence:</span>
            convolution is tremendously essential for image classification problems and must-have module in your model structure.
            model which integrate multiple convolution is able to identify local complex features.
            overuse may lead to a state of overfitting. 
            <p/>
            <span className="underline">evaluation:</span>
            { this.props.analysis.model.modules.convolution.quantity.text }
            </h4>
        </div>)
    }

    render() {
        if (this.props.analysis == null) 
            return ''
        return (
            <div id="model-analysis">
                <div className="project-analysis-text model-section-analysis" onClick={ () => this.expand_section('model_structure') }>> Model Structure</div><br/>
                { this.model_structure() }
                <div className="project-analysis-text model-section-analysis" onClick={ () => this.expand_section('activations') }>> Activation Functions</div><br/>
                { this.activations() }
                <div className="project-analysis-text model-section-analysis" onClick={ () => this.expand_section('dropout') }>> Dropout</div><br/>
                { this.dropout() }
                <div className="project-analysis-text model-section-analysis" onClick={ () => this.expand_section('convolution') }>> Convolution</div><br/>
                { this.convolution() }
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
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelAnalysis);

