import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { ValidateEmail, allLetter, typeOfNaN, lengthOfString,check_itsnot_empty } from "../../actions/validation";

import { updateDataset }from "../../actions/dataset/manipulation"



class DatasetDetailsForm extends Component {
    constructor(props) {
        super(props)
        console.log('constructor')
        console.log(this.props.dataset_data)
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

    }
    restartErrors(errors){
        errors['datasetName'] =''
        errors['description'] =''
    }

    update_profile(e) {
        e.preventDefault();
        let errors = this.state.errors
       // let user = this.state.dataset;
        let componentDataset = this.state.dataset
        this.restartErrors(errors);
        var bool=false
        console.log(componentDataset['name'])
        if ((!check_itsnot_empty(componentDataset['name']))) {
            errors['datasetName'] ="Please fill in the dataset name  "
            console.log(errors['datasetName'])
            bool=true
        }
            if(!lengthOfString(componentDataset['name'],50)){
                errors['datasetName'] ="It is possible to write up to 50 words, please be careful "
                console.log(errors['datasetName'])
                bool=true

            }
        
        if ((!check_itsnot_empty(componentDataset['description']))) {
            errors['description'] ="Please fill in the description."
            console.log(errors['description'])
            bool=true

        }
         if(!lengthOfString(componentDataset['description'],300)){
                errors['description'] ="It is possible to write up to 300 words, please be careful"
                console.log(errors['description'])
                bool=true

            }
            this.setState({
                ...this.state,
                errors
            })
            if(bool){
                console.log("the bool is true , you have errors")
                return
            }
            //?addLable ?
        this.props.updateDataset(this.state.dataset, () => {
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
//get fun
const mapDispatchToProps = dispatch => {
    return {
        updateDataset: (dataset, callback) => {
            dispatch(updateDataset(dataset, callback));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetDetailsForm);
