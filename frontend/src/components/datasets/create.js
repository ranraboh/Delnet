import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { buildDataSet } from '../../actions/dataset/manipulation'
import { homepage } from '../../appconf.js';
import { ValidateEmail, allLetter, typeOfNaN, lengthOfString,check_itsnot_empty } from "../../actions/validation";


class BuildDataset extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {
                name: '',
                description: ''                
            },
            dataset: {
                user: this.props.username,
                name: '',
                description: ''
            }
        }

        /* bind internal methods */
        this.on_change = this.on_change.bind(this);
        this.register_dataset = this.register_dataset.bind(this);
        this.reset_handler = this.reset_handler.bind(this);
        this.restartErrors=this.restartErrors.bind(this);
    }
    restartErrors(errors){
        errors['name'] =''
        errors['description'] =''
    }

    register_dataset(e) {
        e.preventDefault();
       
        let errors = this.state.errors
        let user = this.state.dataset;
        this.restartErrors(errors);
        if ((!check_itsnot_empty(user['name']))) {
            errors['name'] ="Please fill in the project name "
            console.log(errors['name'])
        }
            if(!lengthOfString(user['name'],30)){
                errors['name'] ="It is possible to write up to 30 words, please be careful "
                console.log(errors['name'])
            }
        
        if ((!check_itsnot_empty(user['description']))) {
            errors['description'] ="Please fill in the description."
            console.log(errors['description'])

        }
         if(!lengthOfString(user['description'],200)){
                errors['description'] ="It is possible to write up to 200 words, please be careful"
                console.log(errors['description'])
            }
            this.setState({
                ...this.state,
                errors
            })
        


        this.props.buildDataSet(this.state.dataset, () => {
            window.location = homepage + '/datasets';
        });
        alert('the dataset has been built successfully')
        this.reset_handler()
    }

    reset_handler() {
        this.setState({
            dataset: {
                user: this.props.username,
                name: '',
                description: ''
            }
        })
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
            <div id="datasets-create-internal">
                <div className="row row-form">
                    <div className="col-2">
                        <p className="project-form-field">Dataset Name</p>
                    </div>
                    <div className="col-6">
                        <div class="value">
                            <input class={(this.state.errors.name == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                            type="text" name="dataset_name" value={ this.state.dataset.name } placeholder="Enter name of dataset"
                                onChange={ (e) => this.on_change('name', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.name }
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
                             rows="4" cols="50" name="project_description" value={ this.state.dataset.description  }
                             onChange={ (e) => this.on_change('description', e.target.value) }
                             placeholder="Enter a description for your dataset" />
                                <div class="invalid-feedback">
                                    { this.state.errors.description }
                                </div>
                        </div>
                    </div>
                </div>
                <p/>
                <button class="btn create-button" onClick={ this.register_dataset }>Create</button>&nbsp;&nbsp;
                <button class="btn create-button" onClick={ this.reset_handler }>Reset</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buildDataSet: (dataset, callback) => {
            dispatch(buildDataSet(dataset, callback));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildDataset);
