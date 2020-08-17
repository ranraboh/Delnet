import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getProjectTeam, selectProject } from '../../actions/projects.js';
import { deleteMember } from '../../actions/projects.js';
import AddMember from './add-member.js'

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
            },
            update_user: null,
        }
        if (!this.state.project.team)
            this.props.getProjectTeam(this.state.project.project_id);
        this.update_user = this.update_user.bind(this);
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
        this.setState({
            ...this.state,
            update_user: null
        }, () => {
            this.props.deleteMember(record_id, () => {
                this.props.getProjectTeam(this.props.project_data.id)
            });
        })
    }

    update_user(record) {
        if (this.state.update_user == record) {
            this.setState({
                ...this.state,
                update_user: null
            })
        } else {
        this.setState({
            ...this.state,
            update_user: null
        }, () => {
            this.setState({
                ...this.state,
                update_user: record
            })
        })
        }

    }

    render() {
        if (!this.state.project || !this.state.project.team) {
            return ''
        }
        if (this.state.project.team.length == 0) {
            return <h4 className="message-text text-blue">There are no team members for this project</h4>
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
                            {
                                (this.props.premissions < 4)?'':
                                <th scope="col">Actions</th>
                            }
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
                                    {
                                        (this.props.premissions < 4)?'':
                                        <td className="team-table-column">
                                            <button className="btn btn-outline-primary table-button" onClick={ () => this.update_user(record) }>
                                                edit
                                            </button> 
                                            &nbsp;
                                            <button className="btn btn-outline-warning table-button" 
                                                onClick={ () => this.delete_handler(record.id) } >
                                                delete
                                            </button>
                                        </td>
                                    }
                                </tr>)
                        } 
                    </tbody>
                </table>
                {
                    (this.state.update_user != null)?
                        <AddMember update={ true } id={ this.state.update_user.id } user={ this.state.update_user.user } role= { this.state.update_user.role } presmissions={ this.state.update_user.presmissions } getProjectTeam={this.props.getProjectTeam} />:''
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        project_data: state.projectReducer.project_selected,
        username: state.authentication.user,
        premissions: state.projectReducer.project_selected.premissions
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