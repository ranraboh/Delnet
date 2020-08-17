import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectAnalysis } from '../../../actions/project/model';
import ProgressBar from '../../home/progressbar';
import analysis from '../../dataset/analysis';

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
                'convolution': false,
                'model_structure_meaning': false,
                'model_structure_evaluation': true,
                'model_structure_effects': false,
                'activations_types': true,
                'activations_evaluation': true,
                'activations_meaning': false,
                'dropout_meaning': false,
                'dropout_evaluation': true,
                'dropout_effects': false,
                'convoluton_meaning': false,
                'convoluton_evaluation': true,
                'convoluton_effects': false,
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
            <div className="container">
                <div className="row">
                    <div class="col-lg-4 mb-4">
                        <div class="card bg-primary text-white shadow">
                            <div class="card-body">
                                Model Structure
                                <div class="text-white-50 small text-bold">architecture analysis</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 mb-4">
                        <p/>
                        <p className="text-poppins text-primary text-bold">
                            Number of parameters: { this.props.analysis.model.structure.parameters.quantity }<br/>
                            Number of Layers: { this.props.analysis.model.structure.layers_quantity.quantity }                      
                        </p>
                    </div>
                    <div className="col-lg-3 mb-4">
                        <p/>
                        <span className={ (this.state.sections.model_structure_meaning)?"link-analysis-activate text-primary": "link-analysis-unactivate text-primary" } onClick={ () => this.expand_section('model_structure_meaning') }>
                            Meaning                            
                        </span><br/>
                        <span className={ (this.state.sections.model_structure_effects)?"link-analysis-activate text-primary": "link-analysis-unactivate text-primary" } onClick={ () => this.expand_section('model_structure_effects') }>
                            Effects                            
                        </span><br/>
                        <span className={ (this.state.sections.model_structure_evaluation)?"link-analysis-activate text-primary": "link-analysis-unactivate text-primary" } onClick={ () => this.expand_section('model_structure_evaluation') }>
                            Evaluation                            
                        </span>
                    </div>
                </div>
            </div>
                {
                    (this.state.sections.model_structure_meaning)?
                    <h4 className="project-analysis-text">
                        <span className="underline">Meaning:</span><br/>
                        a model parameter is a configuration variable that is internal to the model and whose value can be estimated from data.<br/>
                        the model made of multiple layers, layers are where the computation takes place. 
                        the layer receives input from the previous layer, performs transformation to the received data
                        and transfer it forward to the next layer.<br/>
                        the number of parameters and layers has sagnificant impact on the model performance.
                        the more the neural network contains layers and parameters, the more flexible and powerful the model is.
                        <p/>
                    </h4>:''
                }
                {
                    (this.state.sections.model_structure_effects)?
                    <h4 className="project-analysis-text">
                        <span className="underline">how it affects model performence:</span><br/>
                        the more the neural network contains layers and parameters, the more flexible and powerful the model is.
                        that is, the model can learn more complex patterns to solve its problem.
                        shortage of parameters or layers may lead to a state of underfitting where the model
                        is no powerful and complex enough for the problem. <br/>
                        however, too many parameters or layers may lead to a state of overfitting,
                        that is, the model is too closely fit to a limited set of data points and doesn't generalize well. <br/>
                        <p/>
                    </h4>:''
                }
                {
                (this.state.sections.model_structure_evaluation)?
                    <h4 className="project-analysis-text">
                        <span className="underline">Evaluation:</span><br/>
                        <div className="container row">
                            <div className="col-6">
                            Number of parameters <br/>
                            Status: { this.state.status[this.props.analysis.model.structure.parameters.status] } <br/>
                            <ProgressBar show={ false } value={ this.props.analysis.model.structure.parameters.quantity / 15000000 * 100 } /> <br/>


                            </div>
                            <div className="col-6">
                            Number Of layers  <br/>
                            Status: { this.state.status[this.props.analysis.model.structure.layers_quantity.status] } <br/>
                            <ProgressBar show={ false } value={ this.props.analysis.model.structure.layers_quantity.quantity } /> <br/>
                            </div>
                        </div>
                        { this.props.analysis.model.structure.text } <br/>
                        <p/>
                    </h4>:''
                }   
        </div>)
    }

    activations() {
        if (this.state.sections.activations == false)
            return ''
        return (<div className="activations-analysis">
            <div className="container">
                <div className="row">
                    <div class="col-lg-4 mb-4">
                        <div class="card bg-info text-white shadow">
                            <div class="card-body">
                                Activations Functions
                                <div class="text-white-50 small text-bold">activations</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <p/>
                        <p className="text-poppins text-info text-bold">
                            Fequency: { this.props.analysis.model.modules.activations.usage.activations_quantity }<br/>
                            Types used: { Object.entries(this.props.analysis.model.modules.activations.activations_list).length }                      
                        </p>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <p/>
                        <span className={ (this.state.sections.activations_meaning)?"link-analysis-activate text-info": "link-analysis-unactivate text-info" } onClick={ () => this.expand_section('activations_meaning') }>
                            Meaning                            
                        </span><br/>
                        <span className={ (this.state.sections.activations_evaluation)?"link-analysis-activate text-info": "link-analysis-unactivate text-info" } onClick={ () => this.expand_section('activations_evaluation') }>
                            Evaluation                            
                        </span><br/>
                        <span className={ (this.state.sections.activations_types)?"link-analysis-activate text-info": "link-analysis-unactivate text-info" } onClick={ () => this.expand_section('activations_types') }>
                            Types                          
                        </span>
                    </div>
                </div>
            </div>
            {   
                (this.state.sections.activations_meaning)?
                <h4 className="project-analysis-text">
                    <span className="underline">Meaning</span><br/>
                    the layers in neural network can integrate activation functions.
                    the activation function triggered before the data trasmited forward into the next layer.
                    it provides non-linear constituent to the model and allows it to classify inseperable data.<br/>
                </h4>:''
            }
            {
                (this.state.sections.activations_evaluation)?
                <h4 className="project-analysis-text">
                    <span className="underline">Evaluation:</span><br/>
                    Status: { this.state.status[this.props.analysis.model.modules.activations.usage.status] } <br/>
                    { this.props.analysis.model.modules.activations.usage.text } <br/>
                </h4>:''
            }
            {
                (this.state.sections.activations_types)?
                <div id="activations-types" className="project-analysis-text">
                <span className="underline">Activations Types:</span>
                <h4 className="project-analysis-text">
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
                        <span className="text-bold">activation types evaluation: </span>
                        { this.props.analysis.model.modules.activations.type.text }
                    </h4>
                </div>:''
            }
        </div>)
    }

    dropout() {
        if (this.state.sections.dropout == false)
            return ''  
        return (<div className="dropout-section">
            <div className="container">
                <div className="row">
                    <div class="col-lg-4 mb-4">
                        <div class="card bg-danger text-white shadow">
                            <div class="card-body">
                                Activations Functions
                                <div class="text-white-50 small text-bold">activations</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <p/>
                        <p className="text-poppins text-danger text-bold">
                            Fequency: { this.props.analysis.model.modules.dropout.exist }<br/>
                            Avg dropout: { this.props.analysis.model.modules.dropout.average_constant }                      
                        </p>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <p/>
                        <span className={ (this.state.sections.dropout_meaning)?"link-analysis-activate text-danger": "link-analysis-unactivate text-danger" } onClick={ () => this.expand_section('dropout_meaning') }>
                            Meaning                            
                        </span><br/>
                        <span className={ (this.state.sections.dropout_effects)?"link-analysis-activate text-danger": "link-analysis-unactivate text-danger" } onClick={ () => this.expand_section('dropout_effects') }>
                            Effects                            
                        </span><br/>
                        <span className={ (this.state.sections.dropout_evaluation)?"link-analysis-activate text-danger": "link-analysis-unactivate text-danger" } onClick={ () => this.expand_section('dropout_evaluation') }>
                            Evaluation                          
                        </span>
                    </div>
                </div>
            </div>
            <h4 className="project-analysis-text">
                <div className="text-bold">Dropout constants: { 
                this.props.analysis.model.modules.dropout.dropout_constant.length == 0 ? 'None' 
                : this.props.analysis.model.modules.dropout.dropout_constant.map((record) =>
                        <span> { record } </span>
                ) }</div>
            </h4>
            {
                (this.state.sections.dropout_meaning)?
                <h4 className="project-analysis-text">
                    <span className="underline">Meaning:</span><br/>
                    dropout is simple and powerful regularization technique for neural networks and deep learning models.
                    Simply put, dropout ignore certain set of neurons chosen in random in training phase.
                    these units are not considered during a particular forward or backward pass.
                    dropout main goal is to overcame a state of overfitting, it make it harder for the model to memorize and cling too much to the training data. 
                    <p/>
                </h4>:''
            }
            {
                (this.state.sections.dropout_effects)?
                <h4 className="project-analysis-text">
                    <span className="underline">How it affects model performence:</span><br/>
                    dropout constanst is the probability each neuron is ignored in propogation process.
                    high value may lead to a state of underfitting when the model is too regularized,
                    wheres small value may be not enough to overcame the state of overfitting.
                    <p/>
                </h4>:''
            }
            {
                (this.state.sections.dropout_evaluation)?
                <h4 className="project-analysis-text">
                    <span className="underline">Evaluation:</span><br/>
                    Status: { this.state.status[this.props.analysis.model.modules.dropout.status] } <br/>
                    { this.props.analysis.model.modules.dropout.text }
                </h4>:''
            }
        </div>)
    }

    convolution() {
        if (this.state.sections.convolution == false)
            return ''
        return (<div className="dropout-section">
            <div className="container">
                <div className="row">
                    <div class="col-lg-4 mb-4">
                        <div class="card bg-success text-white shadow">
                            <div class="card-body">
                                Convolution Modules
                                <div class="text-white-50 small text-bold">convolution analysis</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <p/>
                        <p className="text-poppins text-success text-bold">
                            Fequency: { this.props.analysis.model.modules.convolution.quantity.value }<br/>
                        </p>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <p/>
                        <span className={ (this.state.sections.convoluton_meaning)?"link-analysis-activate text-success": "link-analysis-unactivate text-success" } onClick={ () => this.expand_section('convoluton_meaning') }>
                            Meaning                            
                        </span><br/>
                        <span className={ (this.state.sections.convoluton_effects)?"link-analysis-activate text-success": "link-analysis-unactivate text-success" } onClick={ () => this.expand_section('convoluton_effects') }>
                            Effects                            
                        </span><br/>
                        <span className={ (this.state.sections.convoluton_evaluation)?"link-analysis-activate text-success": "link-analysis-unactivate text-success" } onClick={ () => this.expand_section('convoluton_evaluation') }>
                            Evaluation                          
                        </span>
                    </div>
                </div>
            </div>
            {
                (this.state.sections.convoluton_meaning)?
                <h4 className="project-analysis-text">
                    <span className="underline">Meaning:</span><br/>
                    convolution is model layer used to extract features or local patterns from an input image
                    in a manner independent of its position in the image. 
                    convolution layer composed of set of learnable small matrices called filters. 
                    each filter potentially locate different features in image to maximize the model performence.
                    low-rank layers filters is able to idenify basic graphical shapes, colors, curves etc while
                    high-rank layers filter can locate complex features as eyes or nose depending on the classificatin task. 
                    <p/>
                </h4>:''
            }
            {
                (this.state.sections.convoluton_effects)?
                <h4 className="project-analysis-text">
                    <span className="underline">How it affects model performence:</span><br/>
                    convolution is tremendously essential for image classification problems and must-have module in your model structure.
                    model which integrate multiple convolution is able to identify local complex features.
                    overuse may lead to a state of overfitting. 
                    <p/>
                </h4>:''
            }
            {
                (this.state.sections.convoluton_evaluation)?
                <h4 className="project-analysis-text">
                    <span className="underline">Evaluation:</span><br/>
                    Status: { this.state.status[this.props.analysis.model.modules.convolution.quantity.status] } <br/>
                    { this.props.analysis.model.modules.convolution.quantity.text }
                </h4>:''
            }
        </div>)
    }

    render() {
        if (this.props.analysis == null) 
            return ''
        if (this.props.analysis.model == null) {
            return <h4 className='message-text text-blue'>
                Your code file has errors in it, fix the exceptions and then you will
                be able to evaluate and analyze your model performence
            </h4>
        }
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

