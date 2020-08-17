import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getDatasetTeam } from '../../actions/dataset/get';
import { deleteMember } from '../../actions/dataset/manipulation';
import AddMember from './add-member.js'

class DatasetTeamTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            update_user: null,
        }
        if (!this.props.dataset_data.team)
            this.props.getDatasetTeam(this.props.dataset_data.id);
        this.update_user = this.update_user.bind(this);
        this.delete_handler = this.delete_handler.bind(this);
    }


    delete_handler(record_id) {
        this.setState({
            ...this.state,
            update_user: null
        }, () => {
            this.props.deleteMember(record_id, () => {
                this.props.getDatasetTeam(this.props.dataset_data.id)
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
        console.log(this.props.dataset_data.team)
        if (!this.props.dataset_data || !this.props.dataset_data.team) {
            return ''
        }
        if (this.props.dataset_data.team.length == 0) {
            return <h4 className="message-text text-blue">There are no collectors of this dataset</h4>
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
                            this.props.dataset_data.team.map((record) => 
                                <tr className="table-text">
                                    <td>
                                        <img className="team-user-image" src={ record.image }></img>
                                    </td>
                                    <td className="team-table-column">{ record.firstname + " " + record.lastname }</td>
                                    <td className="team-table-column">{ record.role }</td>
                                    <td className="team-table-column">{ record.join_date }</td>
                                    {
                                        (this.props.premissions < 5)?'':
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
                        <AddMember update={ true } id={ this.state.update_user.id } user={ this.state.update_user.user } role= { this.state.update_user.role } presmissions={ this.state.update_user.presmissions } getDatasetTeam={this.props.getDatasetTeam} />:''
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataset_data: state.datasetsReducer.dataset_selected,
        username: state.authentication.user,
        premissions: state.datasetsReducer.dataset_selected.premissions
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getDatasetTeam: (id) => {
            dispatch(getDatasetTeam(id))
        },
        deleteMember: (record_id, callback_function) => {
             dispatch(deleteMember(record_id, callback_function)); 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetTeamTable);