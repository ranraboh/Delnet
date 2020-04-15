import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getDatasetTeam } from '../../actions/datasets.js';

class DatasetTeam extends Component {
    constructor(props) {
        super(props)
        console.log('team constructor')
        console.log(props.dataset_data)
        this.state = {
            dataset: {
                user: props.username,
                id: props.dataset_data.id,
                name: props.dataset_data.name,
                description: props.dataset_data.description,
                user: props.dataset_data.user,
                team: props.dataset_data.team
            }
        }
        if (!this.state.dataset.team)
            this.props.getDatasetTeam(this.state.dataset.id);
    }

    componentWillReceiveProps(nextProps) {
        console.log('receive props');
        this.setState({
            dataset: nextProps.dataset_data
        })
        console.log(this.state);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState)
        console.log('should update')
        return true;
    }

    render() {
        console.log('render')
        console.log(this.state)
        if (!this.state.dataset || !this.state.dataset.team) {
            return <h2>No Team</h2>
        }
        return (
            <div id="dataset-team-section" className="section-in-main">
                <div className="header-section-v2">
                    <h1 className="dataset-header-title dataset-header-blue">
                        Collectors Team
                    </h1>
                </div>
                <div id="table">
                    <table class="table">
                        <thead>
                            <tr className="table-primary table-text">
                                <th scope="col">User</th>
                                <th scope="col">Role</th>
                                <th scope="col">Join Date</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.dataset.team.map((record) => 
                                    <tr className="table-text">
                                        <td className="main-field">{ record.user }</td>
                                        <td>{ record.role }</td>
                                        <td>{ record.join_date }</td>
                                        <td>
                                            <button className="btn btn-outline-primary table-button" >
                                                edit
                                            </button> 
                                            &nbsp;
                                            <button className="btn btn-outline-warning table-button">
                                                delete
                                            </button>
                                        </td>
                                    </tr>)
                            } 
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataset_data: state.datasetsReducer.dataset_selected,
        username: state.authentication.user
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getDatasetTeam: (id) => {
            dispatch(getDatasetTeam(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetTeam);

