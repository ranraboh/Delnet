import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createMember } from '../../actions/projects.js'
import { isUserExists } from '../../actions/users.js';
import {validateEmail,checkURL,isFileImage,check_passward_theSame, check_password ,
    allLetter, typeOfNaN, lengthOfString,check_itsnot_empty } from "../../actions/validation";

class EditMemberIn extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            errors: {
                user: '',
                role: '',
                premissions: '1'
                
            },
            member: {
                project: props.project_id,
                user: props.username,
                role: props.role,
                premissions: props.premissions
            },
        }

        /* bind internal methods */
        this.on_change = this.on_change.bind(this);
        this.add_member = this.add_member.bind(this);
        this.reset_handler = this.reset_handler.bind(this);
        this.restartErrors=this.restartErrors.bind(this);
      
    }

    restartErrors(errors){
        errors['user'] =''
        errors['role'] =''
    }

   
    

    

    add_member(e) {
        e.preventDefault();
        let errors = this.state.errors
       // let user = this.state.dataset;
        let memberTeam = this.state.member;
        this.restartErrors(errors);
        var bool=false
        if ((!check_itsnot_empty(memberTeam['user']))) {
            errors['user'] ="Please fill the name of the user"
            console.log(errors['user'])
            bool=true
        }
            if(!lengthOfString(memberTeam['user'],30)){
                errors['user'] ="It is possible to write up to 30 words, please be careful "
                console.log(errors['user'])
                bool=true
            }
        
        if ((!check_itsnot_empty(memberTeam['role']))) {
            errors['role'] ="Please fill the role of the user."
            console.log(errors['role'])
            bool=true
        }
         if(!lengthOfString(memberTeam['role'],200)){
                errors['role'] ="It is possible to write up to 200 words, please be careful"
                console.log(errors['role'])
                bool=true
            }
            this.setState({
                ...this.state,
                errors
            })
            if (bool){
                console.log("shiran1937-----------------------------------------------------------------------------------")
            return
            }
            //?its ok ? not need to add ?
        this.props.createMember(this.state.member);
        alert('the member was inserted successfully')
        //why ?
        //this.reset_handler()
    }

    reset_handler() {
        this.setState({
            member: {
                project: this.props.project_id,
                user: '',
                role: '',
                premissions: '1'
            },
            
        })
        document.getElementById('user-input').className = 'input-projects';

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
                                onChange={ (e) => this.on_change('user', e.target.value) } />
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
            </div>
            <p/>
            <button class="btn create-button" onClick={ this.add_member }>Add Member</button>&nbsp;&nbsp;
            <button class="btn create-button" onClick={ this.reset_handler }>Reset</button>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        project_id: state.projectReducer.project_selected.id,
        users_queries: state.userReducer.users_queries,
        query_receive: state.userReducer.query_receive
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createMember: (member) => {
            dispatch(createMember(member));
        },
        isUserExists: (username) => {
            dispatch(isUserExists(username));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
