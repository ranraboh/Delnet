import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { lengthOfString,check_itsnot_empty } from "../../actions/validation";
import { getNotificationDataset } from '../../actions/dataset/get'
import { updateDataset }from "../../actions/dataset/manipulation"



class DatasetDetailsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {
                datasetName: '',
                description: ''               
            },
            dataset: this.props.dataset_data
        }

        /* bind internal methods */
        this.on_change = this.on_change.bind(this);
        this.register_project = this.register_project.bind(this);
        this.reset_handler = this.reset_handler.bind(this);
        this.update_profile = this.update_profile.bind(this);
        this.restartErrors=this.restartErrors.bind(this);
        this.public_view_handler = this.public_view_handler.bind(this);
        this.enable_offer_handler = this.enable_offer_handler.bind(this);

    }

    enable_offer_handler() {
        this.setState({
            ...this.state,
            dataset: {
                ...this.state.dataset,
                enable_offer: !this.state.dataset.enable_offer
            }
        })
    } 

    public_view_handler() {
        this.setState({
            ...this.state,
            dataset: {
                ...this.state.dataset,
                public_view: !this.state.dataset.public_view
            }
        })
    } 

    restartErrors(errors){
        errors['datasetName'] =''
        errors['description'] =''
    }

    update_profile(e) {
        e.preventDefault();
        let errors = this.state.errors
        let componentDataset = this.state.dataset
        componentDataset.username = this.props.username
        this.restartErrors(errors);
        var bool = false
        if ((!check_itsnot_empty(componentDataset['name']))) {
            errors['datasetName'] ="Please fill in the dataset name  "
            bool=true
        }
        if(!lengthOfString(componentDataset['name'],50)){
            errors['datasetName'] ="It is possible to write up to 50 words, please be careful "
            bool=true
        }
        if ((!check_itsnot_empty(componentDataset['description']))) {
            errors['description'] ="Please fill in the description."
            console.log(errors['description'])
            bool=true

        }
        if (!lengthOfString(componentDataset['description'],300)) {
                errors['description'] ="It is possible to write up to 300 words, please be careful"
                bool=true
        }
        this.setState({
            ...this.state,
            errors
        })
        if(bool)
            return
        this.props.updateDataset(componentDataset, () => {
            this.props.getNotificationDataset(this.state.dataset.id)
            alert('dataset update successfully')
        })
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
        dataset[field] = value;
        this.setState({
            dataset
        })
    }

    render() {
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
                            <input class={(this.state.errors.datasetName == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                            type="text" name="dataset_label" value={ this.state.dataset.name } placeholder="Enter the name of dataset"
                                onChange={ (e) => this.on_change('name', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.datasetName }
                                </div>
                        </div>

                    </div>
            </div>
            <div className="row row-form">
                    <div className="col-2">
                        <p className="project-form-field">Description</p>
                    </div>
                    <div className="col-6">
                        <div class="value">
                            <textarea class={(this.state.errors.description == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                             rows="4" cols="50" name="dataset_description" value={ this.state.dataset.description  }
                             onChange={ (e) => this.on_change('description', e.target.value) }
                             placeholder="Enter description of your dataset" />
                                <div class="invalid-feedback">
                                    { this.state.errors.description }
                                </div>
                        </div>
                    </div>
                </div>
                <div className="row row-form">
                    <div className="col-2">
                        <p className="project-form-field">Creator</p>
                    </div>
                    <div className="col-6">
                        <div class="value">
                        <input disabled class="input-projects" type="text" name="dataset_user"
                            value={ this.state.dataset.user } placeholder="Enter the name of dataset"
                                onChange={ (e) => this.on_change('user', e.target.value) } />
                        </div>
                    </div>
                </div>
                <div className="row row-form">
                    <div className="col-2">
                        <p className="project-form-field">Public View</p>
                    </div>
                    <div className="col-6">
                        <p className="project-form-field">select whether you are willing to let other users to view your dataset contents or not</p>
                        <div class="value">
                        <input type="checkbox" name="group" className="radio-button-v1 radio-button-v1-purple" checked={ this.state.dataset.public_view == true || this.state.dataset.public_view == 'true' } />
                                <label className="radio-button-v1-label" onClick={ this.public_view_handler }> Public View</label>
                        </div>
                    </div>
                </div>
                <div className="row row-form">
                    <div className="col-2">
                        <p className="project-form-field">Enable Offers</p>
                    </div>
                    <div className="col-6">
                        <p className="project-form-field">select whether you are willing to let the system to offer your samples to another dataset owners</p>
                        <div class="value">
                        <input type="checkbox" name="group" className="radio-button-v1 radio-button-v1-purple" checked={ this.state.dataset.enable_offer == true || this.state.dataset.enable_offer == 'true' } />
                                <label className="radio-button-v1-label" onClick={ this.enable_offer_handler }> Enable Offers</label>
                        </div>
                    </div>
                </div>
            </div>
            {  
                (this.props.premissions < 5)?'':
                <div id="dataset-details-operations">
                    <button type="button" className="button-v1 button-v1-blue button-v1-small"
                        onClick={ this.update_profile }>Update</button>
                    <button type="button" className="button-v1 button-v1-purple button-v1-small">Reset</button>
                </div>
            }
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        dataset_data: state.datasetsReducer.dataset_selected,
        premissions: state.datasetsReducer.dataset_selected.premissions,
    }
}
//get fun
const mapDispatchToProps = dispatch => {
    return {
        updateDataset: (dataset, callback) => {
            dispatch(updateDataset(dataset, callback));
        },
        getNotificationDataset: (dataset) => {
            dispatch(getNotificationDataset(dataset));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetDetailsForm);
