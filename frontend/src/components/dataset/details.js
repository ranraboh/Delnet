import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


class DatasetDetailsForm extends Component {
    constructor(props) {
        super(props)
        console.log('constructor')
        console.log(this.props.dataset_data)
        this.state = {
            dataset: this.props.dataset_data
        }

        /* bind internal methods */
        this.on_change = this.on_change.bind(this);
        this.register_project = this.register_project.bind(this);
        this.reset_handler = this.reset_handler.bind(this);
    }

    register_project() {
        this.reset_handler()
    }

    reset_handler() {
        this.state = {
            dataset: {
                dataset: this.props.dataset_data
            }
        }
    }

    on_change(field, value) {
        let dataset = this.state.dataset;
        project[field] = value;
        this.setState({
            dataset
        })
    }

    render() {
        if (this.state.dataset == null)
            return (<h2>No Details</h2>)
        return (
        <div className="section-in-main">
            <div className="header-section-v2">
            <h1 className="dataset-header-title dataset-header-blue">
                General Details
            </h1>
        </div>
            <div id="dataset-form-internal">
                <div className="row row-form">
                    <div className="col-2">
                        <p className="project-form-field">Dataset Name</p>
                    </div>
                    <div className="col-6">
                        <div class="value">
                            <input class="input-projects" type="text" name="dataset_name"
                            value={ this.state.dataset.name } placeholder="Enter the name of dataset"
                                onChange={ (e) => this.on_change('dataset_name', e.target.value) } />
                        </div>
                    </div>
                </div>
                <div className="row row-form">
                    <div className="col-2">
                        <p className="project-form-field">Description</p>
                    </div>
                    <div className="col-6">
                        <div class="value">
                            <textarea class="input-projects" rows="4" cols="50" name="dataset_description" value={ this.state.dataset.description }
                            onChange={ (e) => this.on_change('description', e.target.value) }
                            placeholder="Enter description of your dataset" />
                        </div>
                    </div>
                </div>
                <div className="row row-form">
                    <div className="col-2">
                        <p className="project-form-field">Creator</p>
                    </div>
                    <div className="col-6">
                        <div class="value">
                        <input class="input-projects" type="text" name="dataset_user"
                            value={ this.state.dataset.user } placeholder="Enter the name of dataset"
                                onChange={ (e) => this.on_change('user', e.target.value) } />
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="dataset-details-operations">
                <button type="button" className="button-v1 button-v1-blue button-v1-small"
                    onClick={ this.update_profile }>Update</button>
                <button type="button" className="button-v1 button-v1-purple button-v1-small">Reset</button>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    console.log('map')
    console.log(state.datasetsReducer.dataset_selected)
    return {
        username: state.authentication.user,
        dataset_data: state.datasetsReducer.dataset_selected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetDetailsForm);
