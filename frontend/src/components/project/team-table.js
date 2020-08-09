import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getProjectTeam, selectProject } from '../../actions/projects.js';
import { deleteMember } from '../../actions/projects.js';

class TeamTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project: {
                user: props.username,
                project_id: props.project_data.id,
                project_name: props.project_data.project_name,
                description: props.project_data.description,
                result: props.project_data.result,
                team: props.project_data.team
            }
        }
        console.log(this.state.project)
        if (!this.state.project.team)
            this.props.getProjectTeam(this.state.project.project_id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            project: nextProps.project_data
        })
        console.log(this.state)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    delete_handler(record_id) {
        this.props.deleteMember(record_id, () => {
            this.props.getProjectTeam(this.state.project.id)
        });
    }

    render() {
        if (!this.state.project || !this.state.project.team) {
            return <h2>No Team</h2>
        }
        return (
            <div id="table">
                <table class="table">
                    <thead>
                        <tr className="table-primary table-text">
                            <th scope="col">Profile</th>
                            <th scope="col">Member</th>
                            <th scope="col">Role</th>
                            <th scope="col">Join Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.project.team.map((record) => 
                                <tr className="table-text">
                                    <td>
                                        <img className="team-user-image" src={ record.image }></img>
                                    </td>
                                    <td className="team-table-column">{ record.firstname + " " + record.lastname }</td>
                                    <td className="team-table-column">{ record.role }</td>
                                    <td className="team-table-column">{ record.join_date }</td>
                                    <td className="team-table-column">
                                        <button className="btn btn-outline-primary table-button" >
                                            edit
                                        </button> 
                                        &nbsp;
                                        <button className="btn btn-outline-warning table-button" 
                                            onClick={ () => this.delete_handler(record.id) } >
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
        project_data: state.projectReducer.project_selected,
        username: state.authentication.user
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getProjectTeam: (id) => {
            dispatch(getProjectTeam(id))
        },
        selectProject: (id) => {
            dispatch(selectProject(id))
        },
        deleteMember: (record_id, callback_function) => {
             dispatch(deleteMember(record_id, callback_function)); 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamTable);