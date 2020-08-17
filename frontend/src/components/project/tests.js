import React, { Component } from 'react';
import { connect } from 'react-redux';
import { testModel, resetTest } from '../../actions/project/model';
import { invalid_layers_configuraition, detech_errors } from "../automated/actions/computations";
import { loadLayers } from '../../actions/amb/general'

class TestModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test_set: false,
            button_clicked: false
        }
        this.display_test_results = this.display_test_results.bind(this);
        this.test_model = this.test_model.bind(this);
        this.print_boolean = this.print_boolean.bind(this);
        this.reset_handler = this.reset_handler.bind(this);

        /* load layers of model */
        this.props.loadLayers(this.props.project_data.id)  
    }

    reset_handler() {
        this.setState({
            ...this.state,
            test_set: false,
            button_clicked: false
        }, () => {
            this.props.resetTest()
        })
    }

    test_model() {
        if (this.props.premissions < 2) {
            this.setState({
                button_clicked:true
            })
            return
        }
        this.setState({
            ...this.state,
            test_set: true,
            button_clicked:true
        })
        this.props.testModel(this.props.project_data.id)
    }
    
    print_boolean(bool) {
        if (bool == true || bool == 'true') {
            return (
                <span className="text-green">Valid</span>
            )
        }
        return (<span className="text-red">Invalid</span>)
    }

    display_test_results() {
        if (this.props.premissions < 2 && this.state.button_clicked == true) {
            return (<h4 className="project-analysis-text text-purple">
               you are not authorized to run tests on the model
            </h4>)
        } else if (this.props.test == null) {
            if (this.state.test_set == true) {
                return (
                    <h4 className="project-analysis-text text-purple">
                        please be petient and wait for the test results...
                    </h4>
                )
            }
            return ''
        } else {
            let is_error = false
            let error_message = ''
            if (this.props.project_data.model_type == 'u') {
                let errors = detech_errors(this.props.layers)
                if (errors.layer != -1 && errors.is_error == true) {
                    is_error = true
                    error_message = errors.error
                } else if (errors.layer != -1 && errors.is_error == false && this.props.test.model.run_model.is_error == true
                    && this.props.test.model.run_model.error_message.includes(errors.input_size)
                    && this.props.test.model.run_model.error_message.includes(errors.in_features)) {
                        is_error = true
                        error_message = this.props.test.model.run_model.error_message.substring(0,this.props.test.model.run_model.error_message.indexOf(' at ')) + ". mismatch in model architecture in layer " + errors.layer + ". the number of features in the output of prev layer differs from the number of features in the input of this layer"
                    }
                
            }
            else if (this.props.project_data.model_type == 'c') {
                let invalid_configuration = invalid_layers_configuraition(this.props.layers)
                let errors = detech_errors(this.props.layers)
                if (invalid_configuration != null) {
                    is_error = true
                    error_message = invalid_configuration
                } else if (errors.layer != -1) {
                    is_error = true
                    error_message = "mismatch in model architecture: " + errors.error
                }    
            }
            return (
                <h4 className="project-analysis-text">
                    <span className="underline">Project Settings:</span> { this.print_boolean(!this.props.test.settings.is_error) } <br/>
                    { this.props.test.settings.error_message } <p/>
                    <span className="underline">Dataset set:</span>  { this.print_boolean(!this.props.test.dataset.exists.is_error) } <br/>
                    { this.props.test.dataset.exists.error_message } <p/>
                    <span className="underline">Model buildup:</span> { this.print_boolean(!this.props.test.model.create_model.is_error) } <br/>
                    { this.props.test.model.create_model.error_message } <p/>
                    <span className="underline">Model run:</span> { this.print_boolean(!this.props.test.model.run_model.is_error) } <br/>
                    { (is_error)? error_message: this.props.test.model.run_model.error_message } <p/>
                    <span className="underline">Items:</span> { this.print_boolean(!this.props.test.dataset.items.is_error) } <br/>
                    { this.props.test.dataset.items.error_message } <p/>
                    <span className="underline">Labels:</span> { this.print_boolean(!this.props.test.dataset.labels.is_error) } <br/>
                    { this.props.test.dataset.labels.error_message } <p/>
                    <span className="underline">Model output match:</span> { this.print_boolean(!this.props.test.dataset.output_match.is_error) } <br/>
                    { this.props.test.dataset.output_match.error_message } <p/>
                </h4>
            )
        }
    }


    render() {
        return (
            <div id="deploy-model" className="section-in-main">
                <div className="header-section-v1 header-v1-purple">
                    <h1 id="projects-title">
                        Test Model
                    </h1>
                    <h2 id="projects-intro">
                        in the section you can test if there any errors or exceptions in your model
                    </h2>
                </div>
                <h4 className="project-analysis-text">
                    in this section you check if there is any errors or exceptions in: <br/>
                    syntex errors, a character or string incorrectly placed in a command or instruction that causes a failure in execution.
                    project settings errors such as dataset is not set, not model file is uploaded
                    model structure errors such as mismatch is layers dimensions
                    dataset errors such as not layers or items is inserted,
                    mismatch in model expected labels quantity and the number of labels set in dataset and so on.
                </h4>
                <button className="btn btn-dark small-spacing" onClick={ this.test_model }>
                    Test Your Model 
                </button> 
                {
                    (this.props.test)?
                    <button className="btn btn-danger small-spacing" onClick={ this.reset_handler }>
                        Reset 
                    </button>:''
                } 
                <p/>  
                { this.display_test_results() }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        project_data: state.projectReducer.project_selected,
        test: state.modelReducer.test,
        premissions: state.projectReducer.project_selected.premissions,
        layers: state.ambReducer.customizable.layers,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        testModel: (request) => {
            dispatch(testModel(request))
        },
        resetTest: () => {
            dispatch(resetTest())
        },
        loadLayers: (project_id) => {
            dispatch(loadLayers(project_id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestModel);

