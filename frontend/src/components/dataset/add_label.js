import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addLabel } from '../../actions/dataset/manipulation';

class AddLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
    }

    add_label_handler() {
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
                            <input class="input-projects" type="text" name="dataset_label"
                                onChange={ (e) => this.on_change('name', e.target.value) }
                                value={ this.state.label.name } placeholder="Enter the name of label" />
                        </div>
                    </div>
                </div>
                <div className="row row-form">
                    <div className="col-2">
                        <p className="project-form-field">Description</p>
                    </div>
                    <div className="col-6">
                        <div class="value">
                            <textarea class="input-projects" rows="4" cols="50" name="dataset_description" value={ this.state.label.description }
                            onChange={ (e) => this.on_change('description', e.target.value) }
                            placeholder="Enter description of your label" />
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
