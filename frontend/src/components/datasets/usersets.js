import React, { Component, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getUserDatasets, getPremissions } from '../../actions/dataset/get';
import { selectDataset } from '../../actions/dataset/manipulation'
import { homepage } from '../../appconf.js';

class DataSetsUser extends Component {
    constructor(props) {
        super(props)
        this.props.getUserDatasets(this.props.username)
        this.select_dataset = this.select_dataset.bind(this);
    }

    select_dataset(dataset_id) {
        this.props.selectDataset(dataset_id, () => {
            this.props.getPremissions(dataset_id, this.props.username, () => {
                window.location = homepage + '/dataset';
            })
        });
    }

    render() {
        if (!this.props.user_datasets) {
            return (<h2>No Datasets</h2>)
        }
        return (
                <div id="table">
                    <table className="table">
                        <thead>
                            <tr className="table-primary table-text">
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Create Date</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.user_datasets.map((dataset) => 
                                    <tr className="table-text">
                                        <td className="table-main-field">{ dataset.name }</td>
                                        <td>{ dataset.description }</td>
                                        <td>{ dataset.create_date }</td>
                                        <td>
                                            <button className="btn btn-outline-primary table-button" 
                                                onClick={ () => this.select_dataset(dataset.id) } >
                                                view
                                            </button> 
                                            &nbsp;
                                            <button className="btn btn-outline-danger table-button" >
                                                delete
                                            </button>
                                        </td>
                                    </tr>)
                            } 
                        </tbody>
                    </table>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user_datasets: state.datasetsReducer.user_datasets,
        username: state.authentication.user
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getUserDatasets: (username) => {
            dispatch(getUserDatasets(username));
        },
        selectDataset: (dataset_id, callback) => {
            dispatch(selectDataset(dataset_id, callback))
        },
        getPremissions: (dataset_id, username, callback) => {
            dispatch(getPremissions(dataset_id, username, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSetsUser);
