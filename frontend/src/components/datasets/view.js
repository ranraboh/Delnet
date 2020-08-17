import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { datasetsPublicView, getDatasetByName, getPremissions } from '../../actions/dataset/get'
import { selectDataset, followDataset, UnfollowDataset } from '../../actions/dataset/manipulation'
import { homepage } from '../../appconf.js';

class ViewDatasets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search_str:'',
            all: true
        }

        /* bind internal methods */
        this.search_string = this.search_string.bind(this);
        this.search_operation = this.search_operation.bind(this);
        this.reset_handler = this.reset_handler.bind(this);
        this.select_dataset = this.select_dataset.bind(this);
        this.follow_dataset = this.follow_dataset.bind(this);
        this.unfollow_dataset = this.unfollow_dataset.bind(this);
        this.follow_button = this.follow_button.bind(this);
        console.log('username')
        console.log(this.props.username)
        this.props.datasetsPublicView(this.props.username)
    }

    select_dataset(dataset_id) {
        this.props.selectDataset(dataset_id, () => {
            this.props.getPremissions(dataset_id, this.props.username, () => {
                window.location = homepage + '/dataset';
            })
        });
    }



    search_operation() {
        if (this.state.search_str != '') {
            this.props.getDatasetByName(this.state.search_str, this.props.username)
            this.setState({
                ...this.state,
                all: false
            })
        } else {
            this.props.datasetsPublicView(this.props.username)
            this.setState({
                ...this.state,
                all: true
            })
        }
    }

    search_string(str) {
        this.setState({
            ...this.state,
            search_str: str
        })
    } 

    reset_handler() {
        this.setState({
            ...this.state,
            search_str: '',
            all: true
        })
    }

    follow_dataset(dataset) {
        this.props.followDataset({
            dataset: dataset.id,
            user: this.props.username
        }, () => {
            alert('you are now following ' + dataset.name)
            this.search_operation()
        })
    }

    unfollow_dataset(follow_id, name) {
        this.props.UnfollowDataset(follow_id, () => {
            alert('you no longer follow ' + name)
            this.search_operation()
        })
    }

    follow_button(follow_id, dataset) {
        console.log(dataset)
        console.log(follow_id)
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
        if (this.state.all == true)
            var datasets = this.props.datasets
        else
            var datasets = this.props.search
        console.log(this.props.reducer)    
        if (datasets == null)
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
                                        datasets.map((dataset) => 
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
                <div className="col-sm">
                        <input type="text" value={ this.state.search_str } className="textbox-v1" onChange={ (e) => this.search_string(e.target.value) } ></input>
                        <label className="label-v1">Search Filter</label>
                </div>
                <button class="btn create-button" onClick={ this.search_operation }>Search</button>&nbsp;&nbsp;
                <button class="btn create-button" onClick={ this.reset_handler }>Reset</button>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        datasets: state.datasetsReducer.public_datasets,
        reducer: state.datasetsReducer,
        search: state.datasetsReducer.search_datasets,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        datasetsPublicView: (username) => {
            dispatch(datasetsPublicView(username));
        },
        getDatasetByName: (dataset_name, username) => {
            dispatch(getDatasetByName(dataset_name, username));
        },
        selectDataset: (dataset_id, callback) => {
            dispatch(selectDataset(dataset_id, callback))
        },
        followDataset: (follow_record, callback) => {
            dispatch(followDataset(follow_record, callback))
        },
        UnfollowDataset: (follow_id, callback) => {
            dispatch(UnfollowDataset(follow_id, callback))
        },
        getPremissions: (dataset_id, username, callback) => {
            dispatch(getPremissions(dataset_id, username, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDatasets);
