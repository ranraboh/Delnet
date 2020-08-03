import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { buildDataSet } from '../../actions/dataset/manipulation'
import { homepage } from '../../appconf.js';

class BuildDataset extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
    }

    register_dataset() {
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
                            <input class="input-projects" type="text" name="dataset_name"
                            value={ this.state.dataset.name } placeholder="Enter name of dataset"
                                onChange={ (e) => this.on_change('name', e.target.value) } />
                        </div>
                    </div>
                </div>
                <div className="row row-form">
                    <div className="col-2">
                        <p className="project-form-field">Description</p>
                    </div>
                    <div className="col-6">
                        <div class="value">
                            <textarea class="input-projects" rows="4" cols="50" name="project_description" value={ this.state.dataset.description }
                            onChange={ (e) => this.on_change('description', e.target.value) }
                            placeholder="Enter a description for your dataset" />
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
