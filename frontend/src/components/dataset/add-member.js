import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getDatasetTeam } from '../../actions/dataset/get'
import { createMember, updateCollector } from '../../actions/dataset/manipulation'
import { isUserExists } from '../../actions/users.js';
import { lengthOfString,check_itsnot_empty } from "../../actions/validation";

class AddMember extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {
                user: '',
                role: '',
                premissions: '1',
            },
            member: {
                id: (props.update)?props.id:'',
                dataset: props.dataset_data.id,
                user: (props.update)?props.user:'',
                role: (props.update)?props.role:'',
                premissions: (props.update)? Math.min(props.presmissions, 5): '1',
                permissions_text: [ 'able to view any information about the dataset: notifications, samples, labels, analysis etc', 'able to label untagged samples', 'able to add new items/samples', 'able to add new labels', 'manager: has full premmisions such as update project details, manage the team etc' ]
            },
        }

        /* bind internal methods */
        this.on_change = this.on_change.bind(this);
        this.add_member = this.add_member.bind(this);
        this.reset_handler = this.reset_handler.bind(this);
        this.restartErrors=this.restartErrors.bind(this);
      
    }

    reset_handler() {
        this.setState({
            ...this.state,
            member: {
                dataset: this.props.dataset_data.id,
                user: '',
                role: '',
                premissions: '1',
                permissions_text: [ 'able to view any information about the dataset: notifications, samples, labels, analysis etc', 'able to label untagged samples', 'able to add new items/samples', 'able to add new labels', 'manager: has full premmisions such as update project details, manage the team etc' ]
            },
        })
        document.getElementById('user-input').className = 'input-projects';
    }

    restartErrors(errors){
        errors['user'] =''
        errors['role'] =''
    }

    add_member(e) {
        e.preventDefault();
        let errors = this.state.errors
        let memberTeam = this.state.member;
        this.restartErrors(errors);
        var bool=false
        if ((!check_itsnot_empty(memberTeam['user']))) {
            errors['user'] ="Please fill the name of the user"
            bool=true
        }
        if(!lengthOfString(memberTeam['user'],30)){
            errors['user'] ="It is possible to write up to 30 words, please be careful "
            bool=true
        }
        
        if ((!check_itsnot_empty(memberTeam['role']))) {
            errors['role'] ="Please fill the role of the user."
            bool=true
        }
        if(!lengthOfString(memberTeam['role'],200)){
            errors['role'] ="It is possible to write up to 200 words, please be careful"
            bool=true
        }
        this.setState({
            ...this.state,
            errors
        })
        if (bool)
            return
        if (this.props.update) {
            this.props.updateCollector(this.state.member, () => {
                this.props.getDatasetTeam(this.props.dataset_data.id)
                alert('the member was updated successfully')
            })
        } else {
            this.props.createMember(this.state.member, () => {
                this.props.getDatasetTeam(this.props.dataset_data.id)
                alert('the member was inserted successfully')
                this.reset_handler()
            });
        }
    }


    on_change(field, value) {
        let member = this.state.member;
        member[field] = value;
        this.setState({
            member
        })
    }

    render() {
        return (
        <div id="projects-create">
            <div className="row row-form">
                <div className="col-2">
                    <p className="project-form-field">User</p>
                </div>
                <div className="col-6">
                <div class="value">
                            <input class={(this.state.errors.user == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                            type="text" name="user" value={ this.state.member.user  } placeholder="Enter the new-join user"
                                onChange={ (e) => this.on_change('user', e.target.value) } disabled={ (this.props.update)? true:false } />
                                <div class="invalid-feedback">
                                    { this.state.errors.user }
                                </div>
                        </div>
                </div>
            </div>
            <div className="row row-form">
                <div className="col-2">
                    <p className="project-form-field">Role</p>
                </div>
                <div className="col-6">
                    <div class="value">
                            <input class={(this.state.errors.role == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                            type="text" name="role" value={ this.state.member.role }placeholder="Enter the member role"
                                onChange={ (e) => this.on_change('role', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.role }
                                </div>
                    </div>
                </div>
            </div>
            <div className="row row-form">
                <div className="col-2">
                    <p className="project-form-field">Premissions</p>
                </div>
                <div className="col-6">
                    <div class="value">
                        <input type='number' min="1" max="5" className="input-projects" name="premissions" value={ this.state.member.premissions }
                        onChange={ (e) => this.on_change('premissions', e.target.value) }  />
                    </div>
                </div>
                <ul>
                    {
                        this.state.member.permissions_text.slice(0, this.state.member.premissions).map((record) =>
                            <li><p className="project-form-field">{ record  }</p></li>
                        )
                    }
                </ul>
            </div>
            <p/>
            <button class="btn create-button" onClick={ this.add_member }>{(this.props.update)?'Update Member': 'Add Member' }</button>&nbsp;&nbsp;
            <button class="btn create-button" onClick={ this.reset_handler }>Reset</button>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        dataset_data: state.datasetsReducer.dataset_selected,
        users_queries: state.userReducer.users_queries,
        query_receive: state.userReducer.query_receive,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createMember: (member, callback) => {
            dispatch(createMember(member, callback));
        },
        isUserExists: (username) => {
            dispatch(isUserExists(username));
        },
        updateCollector: (record, callback) => {
            dispatch(updateCollector(record, callback))
        },
        getDatasetTeam: (dataset_id) => {
            dispatch(getDatasetTeam(dataset_id))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
