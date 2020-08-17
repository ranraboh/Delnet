import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getUserFollowingDatasets, getPremissions } from '../../actions/dataset/get'
import { selectDataset, followDataset, UnfollowDataset } from '../../actions/dataset/manipulation'
import { homepage } from '../../appconf.js';

class FollowingDatasets extends Component {
    constructor(props) {
        super(props)
        /* bind internal methods */
        this.select_dataset = this.select_dataset.bind(this);
        this.follow_dataset = this.follow_dataset.bind(this);
        this.unfollow_dataset = this.unfollow_dataset.bind(this);
        this.follow_button = this.follow_button.bind(this);
        this.props.getUserFollowingDatasets(this.props.username)
    }

    select_dataset(dataset_id) {
        this.props.selectDataset(dataset_id, () => {
            this.props.getPremissions(dataset_id, this.props.username, () => {
                window.location = homepage + '/dataset';
            })
        });
    }


    follow_dataset(dataset) {
        this.props.followDataset({
            dataset: dataset.id,
            user: this.props.username
        }, () => {
            alert('you are now following ' + dataset.name)
        })
    }

    unfollow_dataset(follow_id, name) {
        this.props.UnfollowDataset(follow_id, () => {
            alert('you are no longer follow ' + name)
            this.props.getUserFollowingDatasets(this.props.username)
        })
    }

    follow_button(follow_id, dataset) {
        if (follow_id < 0) {
            return (<button className="btn btn-outline-success table-button"
                onClick={ () => this.follow_dataset(dataset) } >
                follow
            </button>)
        }
        return (
            <button className="btn btn-success table-button"
                onClick={ () => this.unfollow_dataset(follow_id, dataset.name) } >
                unfollow
            </button>
        )
    }

    render() {
        if (this.props.datasets == null) 
            return ''
        return (
            <div>
                 <table className="table">
                                <thead>
                                    <tr className="table-v1-th">
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Create Date</th>
                                        <th scope="col">Follow</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.datasets.map((dataset) => 
                                        <tr className="table-v1-row-nonhover">
                                            <td className="table-v1-col-hover">
                                                { dataset.id }
                                            </td>
                                            <td className="table-v1-col-hover">
                                                { dataset.name }
                                            </td>
                                            <td className="table-v1-col-hover">
                                                { dataset.description }
                                            </td>
                                            <td className="table-v1-col-hover">
                                                { dataset.user }
                                            </td>
                                            <td>
                                                <button className="btn btn-outline-primary table-button" 
                                                    onClick={ () => this.select_dataset(dataset.id) } >
                                                    view
                                                </button> 
                                                &nbsp;
                                                { this.follow_button(dataset.follow_id, dataset) }
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                <p/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        datasets: state.datasetsReducer.following_datasets,
        reducer: state.datasetsReducer,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        followDataset: (follow_record, callback) => {
            dispatch(followDataset(follow_record, callback))
        },
        UnfollowDataset: (follow_id, callback) => {
            dispatch(UnfollowDataset(follow_id, callback))
        },
        getUserFollowingDatasets: (username) => {
            dispatch(getUserFollowingDatasets(username))
        },
        selectDataset: (dataset_id, callback) => {
            dispatch(selectDataset(dataset_id, callback))
        },
        getPremissions: (dataset_id, username, callback) => {
            dispatch(getPremissions(dataset_id, username, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingDatasets);
