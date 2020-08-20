import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homepage } from '../../../appconf.js';
import { runModel, addRunRecord, getLossTypes, getOptimizerTypes  } from '../../../actions/project/model.js'
import { testModel } from '../../../actions/project/model';
import { is } from "../../../actions/validation";


class RunModel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.username,
            project: this.props.project_data.id,
            run: -1,
            parameters: {
                batch_size: 32,
                epochs: 5,
                loss_type: 1,
                optimizer: {
                    optimizer: 1,
                    learning_rate: 0.001,
                    weight_decay: 0.001
                }
            },
            error_message: '',
            is_error: false,
            start_test: false,
            run_start: false
        }

        /* receive data from backend */
        this.props.getLossTypes()
        this.props.getOptimizerTypes()

        /* bind inner methods */
        this.run_model = this.run_model.bind(this);
        this.on_change = this.on_change.bind(this);
        this.defualt_handler = this.defualt_handler.bind(this);
    }

    defualt_handler() {
        this.setState({
            user: this.props.username,
            project: this.props.project_data.id,
            run: -1,
            parameters: {
                batch_size: 32,
                epochs: 5,
                loss_type: 1,
                optimizer: {
                    optimizer: 1,
                    learning_rate: 0.001,
                    weight_decay: 0.001
                }
            }
        })
    }

    on_change(field, value, type) {
        let parameters = this.state.parameters;
        parameters[field] = value
        this.setState({
            ...this.state,
            parameters
        })
    }

    on_optim_change(field, value, type) {
        let optimizer = this.state.parameters.optimizer;
        if (type == 'float')
            optimizer[field] = value;
        else if (type == 'int')
            optimizer[field] = value;
        else 
            optimizer[field] = value
        console.log(optimizer[field])
        this.setState({
            ...this.state,
            parameters: {
                ...this.state.parameters,
                optimizer
            }
        })
    }

    run_model() {
        if (this.props.premissions < 2) {
            this.setState({
                ...this.state,
                is_error:true,
                error_message: 'your are not authorized to perform this action'
            })
            return
        }
        this.setState({
            ...this.state,
            start_test: true
        })
        this.props.testModel(this.state.project, (response) => {
            this.setState({
                ...this.state,
                is_error: response.model.run_model.is_error,
                error_message: response.model.run_model.error_message,
            })
            if (response.model.run_model.is_error == true)
                return
            this.setState({
                ...this.state,
                run_start: true,
                parameters: {
                    batch_size: parseInt(this.state.parameters.batch_size),
                    epochs: parseInt(this.state.parameters.epochs),
                    loss_type: parseInt(this.state.parameters.loss_type),
                    optimizer: {
                        optimizer: this.state.parameters.optimizer.optimizer,
                        learning_rate: parseFloat(this.state.parameters.optimizer.learning_rate),
                        weight_decay: parseFloat(this.state.parameters.optimizer.weight_decay)
                    }
                }
            }, () => {
                this.props.addRunRecord({
                    user: this.state.user,
                    project: this.state.project,
                    batch_size: this.state.parameters.batch_size,
                    optimizer: this.state.parameters.optimizer.optimizer,
                    epochs: this.state.parameters.epochs,
                    learning_rate: this.state.parameters.optimizer.learning_rate,
                    weight_decay: this.state.parameters.optimizer.weight_decay,
                    loss_type: this.state.parameters.loss_type,
                    progress: 0
                }, () => {
                    this.setState({
                        ...this.state,
                        run: this.props.run_added.id
                    }, () =>{
                        this.props.runModel(this.state, () => {
                            alert('your model is currently running on server, wait for it to finish')
                        })
                    })
                })
            })
        }) 
    }

    componentWillMount() {
        console.log(this.props.loggedIn)
        if (this.props.loggedIn === false || this.props.loggedIn === 'false')
            window.location = homepage + '/login'
    }

    display_status_message() {
        if (this.props.premissions < 2 && this.state.is_error == true) {
            return (
                <h4 className="project-analysis-text text-purple">
                    { "you are not authorized to train the model " }
                </h4>
            )
        } else if (this.state.is_error == true) {
            return (
                <h4 className="project-analysis-text text-purple">
                    { "the server has encountered an error in training your model, check out tests option for extra information " }
                </h4>
            )
        } else if (this.state.start_test == true) {
            if (this.state.run_start == false) {
                return (
                    <h4 className="project-analysis-text text-purple">
                        please be petient and wait for the model test...
                    </h4>
            )} else {
                return (
                    <h4 className="project-analysis-text text-blue">
                        the traning process has began, you can follow its advancement is running models section.
                        as soon as the training completed, you can view its results and performence
                    </h4>
                )}
            }


    }

    render() {
        let optimizer_options = '';
        let loss_type_options = '';
        if (this.props.optimizers == null)
            return ''
        console.log(this.state.parameters)
        console.log(this.state.parameters.optimizer.optimizer)
        if (this.props.optimizers != null && this.props.optimizers != undefined)
            optimizer_options = (
                this.props.optimizers.map((optimizer) =>
                    <option value={ optimizer.id } selected={ this.state.parameters.optimizer.optimizer == optimizer.id } >{ optimizer.optimizer }</option>
                , this)
            )
        if (this.props.loss_types != null && this.props.loss_types != undefined)
            loss_type_options = (
                this.props.loss_types.map((loss_type) =>
                    <option value={ loss_type.id } selected={ this.state.parameters.loss_type == loss_type.id } >{ loss_type.loss_type }</option>
                )
            )
        return (
            <div id="run-model-section" className="section-in-main">
                <div className="header-section-v1 header-v1-cyan">
                    <h1 id="projects-title">
                        Run Model
                    </h1>
                    <h2 id="projects-intro">
                       In this section you can run your model with your own hyper-parameters
                    </h2>
                </div>
                <div id="run-model-inner">  
                    <div className="text text-small text-red">
                        Training Parameters:
                    </div>
                    <div className="row row-form">
                        <div className="col-2">
                            <p className="project-form-field">Batch Size</p>
                        </div>
                        <div className="col-6">
                            <div class="value">
                                <input class="input-projects" type="text" name="batch_size"
                                value={ this.state.parameters.batch_size } placeholder="Enter size of batch"
                                    onChange={ (e) => this.on_change('batch_size', e.target.value, 'int') } />
                            </div>
                        </div>
                    </div>
                    <div className="row row-form">
                        <div className="col-2">
                            <p className="project-form-field">Epochs</p>
                        </div>
                        <div className="col-6">
                            <div class="value">
                                <input class="input-projects" type="text" name="epochs"
                                value={ this.state.parameters.epochs } placeholder="Enter number of epochs"
                                    onChange={ (e) => this.on_change('epochs', e.target.value, 'int') } />
                            </div>
                        </div>
                    </div>
                    <div className="row row-form">
                        <div className="col-2">
                            <p className="project-form-field">Loss Type</p>
                        </div>
                        <div className="col-6">
                            <div class="value">
                            <select name="loss_type" className="input-projects" 
                            onChange={ (e) => this.on_change('loss_type', e.target.value, 'int') }>
                                { loss_type_options }
                            </select>
                            </div>
                        </div>
                    </div>
                    <div className="text text-small text-red">
                        Optimizer Parameters:
                    </div>
                    <div className="row row-form">
                        <div className="col-2">
                            <p className="project-form-field">Optimizer</p>
                        </div>
                        <div className="col-6">
                            <div class="value">
                            <select name="optimizer" className="input-projects" onChange={ 
                                (e) => this.on_optim_change('optimizer', e.target.value, 'int') }>
                                { optimizer_options }
                            </select>
                            </div>
                        </div>
                    </div>
                    <div className="row row-form">
                        <div className="col-2">
                            <p className="project-form-field">Learning Rate</p>
                        </div>
                        <div className="col-6">
                            <div class="value">
                                <input class="input-projects" type="text" name="learning_rate"
                                value={ this.state.parameters.optimizer.learning_rate } placeholder="Enter learning rate"
                                    onChange={ (e) => this.on_optim_change('learning_rate', e.target.value, 'float') } />
                            </div>
                        </div>
                    </div>
                    <div className="row row-form">
                        <div className="col-2">
                            <p className="project-form-field">Weight Decay</p>
                        </div>
                        <div className="col-6">
                            <div class="value">
                                <input class="input-projects" type="text" name="weight_decay"
                                value={ this.state.parameters.optimizer.weight_decay } placeholder="Enter weight decay"
                                    onChange={ (e) => this.on_optim_change('weight_decay', e.target.value, 'float') } />
                            </div>
                        </div>
                    </div>
                    <p/>
                    <button className="btn btn-primary small-spacing" onClick={ this.run_model }>
                        Run Model
                    </button> 
                    <button className="btn btn-danger" onClick={ this.defualt_handler }>
                        Default Values
                    </button>  
                    <p/>
                    { this.display_status_message() }
                </div>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        project_data: state.projectReducer.project_selected,
        run_added: state.modelReducer.run_added,
        optimizers: state.modelReducer.optimizers,
        loss_types: state.modelReducer.loss_types,
        premissions: state.projectReducer.project_selected.premissions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        runModel: (run_request, callback) => {
            dispatch(runModel(run_request, callback))
        },
        addRunRecord: (run_request, callback) => {
            dispatch(addRunRecord(run_request, callback))
        },
        getLossTypes: () => {
            dispatch(getLossTypes());
        },
        getOptimizerTypes: () => {
            dispatch(getOptimizerTypes());
        },
        testModel: (request, callback) => {
            dispatch(testModel(request, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunModel);

