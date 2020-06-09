import React, { Component } from 'react';
import { connect } from 'react-redux';
import { testModel } from '../../actions/project/model';
 
class TestModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'test_set': false
        }
        this.display_test_results = this.display_test_results.bind(this);
        this.test_model = this.test_model.bind(this);
        this.print_boolean = this.print_boolean.bind(this);
    }

    test_model() {
        this.setState({
            ...this.state,
            'test_set': true
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
        if (this.props.test == null) {
            if (this.state.test_set == true) {
                return (
                    <h4 className="project-analysis-text text-purple">
                        please be petient and wait for the test results...
                    </h4>
                )
            }
            return ''
        }

        return (
            <h4 className="project-analysis-text">
                <span className="underline">Dataset set:</span>  { this.print_boolean(!this.props.test.dataset.exists.is_error) } <br/>
                { this.props.test.dataset.exists.error_message } <p/>
                <span className="underline">Model buildup:</span> { this.print_boolean(!this.props.test.model.create_model.is_error) } <br/>
                { this.props.test.model.create_model.error } <p/>
                <span className="underline">Model run:</span> { this.print_boolean(!this.props.test.model.run_model.is_error) } <br/>
                { this.props.test.model.run_model.error_message } <p/>
                <span className="underline">Items:</span> { this.print_boolean(!this.props.test.dataset.items.is_error) } <br/>
                { this.props.test.dataset.items.error_message } <p/>
                <span className="underline">Labels:</span> { this.print_boolean(!this.props.test.dataset.labels.is_error) } <br/>
                { this.props.test.dataset.labels.error_message } <p/>
                <span className="underline">Model output match:</span> { this.print_boolean(!this.props.test.dataset.output_match.is_error) } <br/>
                { this.props.test.dataset.output_match.error_message } <p/>
            </h4>
        )
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
                <p/>  
                { this.display_test_results() }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        project_data: state.projectReducer.project_selected,
        test: state.modelReducer.test
    }
}

const mapDispatchToProps = dispatch => {
    return {
        testModel: (request) => {
            dispatch(testModel(request))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestModel);

