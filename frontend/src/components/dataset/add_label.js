import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addLabel } from '../../actions/dataset/manipulation';
import { compose } from 'redux';
import { ValidateEmail, allLetter, typeOfNaN, lengthOfString,check_itsnot_empty } from "../../actions/validation";


class AddLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {
                name: '',
                description: ''                
            },
            dataset: this.props.dataset_data,
            label: {
                name: '',
                description: '',
                insert_by: this.props.username,
                dataset: this.props.dataset_data.id
            }
        }

        /* bind internal methods */
        this.on_change = this.on_change.bind(this);
        this.reset_handler = this.reset_handler.bind(this);
        this.add_label_handler = this.add_label_handler.bind(this);
        this.restartErrors=this.restartErrors.bind(this);
    }

    restartErrors(errors){
        errors['name'] =''
        errors['description'] =''
    }

    add_label_handler(e) {
        console.log("shiran23")
        e.preventDefault();
        let errors = this.state.errors
       // let user = this.state.dataset;
        let labelDataset = this.state.label;
        this.restartErrors(errors);
        console.log(labelDataset['name'])
        if ((!check_itsnot_empty(labelDataset['name']))) {
            console.log("shiran234")
            errors['name'] ="Please fill in the project name "
            console.log(errors['name'])
        }
            if(!lengthOfString(labelDataset['name'],30)){
                errors['name'] ="It is possible to write up to 30 words, please be careful "
                console.log(errors['name'])
            }
        
        if ((!check_itsnot_empty(labelDataset['description']))) {
            errors['description'] ="Please fill in the description."
            console.log(errors['description'])
        }
         if(!lengthOfString(labelDataset['description'],200)){
                errors['description'] ="It is possible to write up to 200 words, please be careful"
                console.log(errors['description'])
            }
            this.setState({
                ...this.state,
                errors
            })

        this.props.addLabel(this.state.label, () => {
            alert('label added successfully')
            this.reset_handler()
        })
    }

    reset_handler() {
        this.setState({
            ...this.state,
            label: {
                name: '',
                description: '',
                insert_by: this.props.username,
                dataset: this.props.dataset_data.id
            }
        })
    }

    on_change(field, value) {
        let label = this.state.label;
        label[field] = value;
        this.setState({
            label
        })
    }

    render() {
        if (this.state.label == null)
            return (<h2>No Details</h2>)
        return (
        <div className="section-in-main">
            <div className="header-section-v2">
            <h1 className="dataset-header-title dataset-header-blue">
                Add Label
            </h1>
        </div>
            <div id="dataset-form-internal">
                <div className="row row-form">
                    <div className="col-2">
                        <p className="project-form-field">Label</p>
                    </div>
                    <div className="col-6">
                        <div class="value">
                            <input class={(this.state.errors.name == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                            type="text" name="dataset_label" value={ this.state.label.name } placeholder="Enter the name of label"
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
                             rows="4" cols="50" name="dataset_description" value={ this.state.label.description  }
                             onChange={ (e) => this.on_change('description', e.target.value) }
                             placeholder="Enter description of your label" />
                                <div class="invalid-feedback">
                                    { this.state.errors.description }
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="dataset-details-operations">
                <button type="button" className="button-v1 button-v1-blue button-v1-small"
                    onClick={ this.add_label_handler }>Add Label</button>
                <button type="button" className="button-v1 button-v1-purple button-v1-small"
                    onClick={ this.reset_handler }>Reset</button>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        dataset_data: state.datasetsReducer.dataset_selected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addLabel: (label, callback) => {
            dispatch(addLabel(label, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLabel);
