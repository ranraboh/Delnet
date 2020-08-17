import React, { Component } from 'react'
import { updatePassword, getUserDetails } from '../../actions/users.js'
import { connect } from 'react-redux'
import { lengthOfString,check_itsnot_empty } from "../../actions/validation";

class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {
                old_password: '',
                new_password: '',
                password_confirmation: ''
            },
            credentails: {
                username: props.username,
                old_password: '',
                new_password: '',
                password_confirmation: ''
            }
        }

        /* bind inner methods */
        this.on_change = this.on_change.bind(this);
        this.reset_handler = this.reset_handler.bind(this);
        this.update_password = this.update_password.bind(this);
    }

    on_change(field, value) {
        let credentails = this.state.credentails;
        credentails[field] = value;
        this.setState({
            ...this.state,
            credentails
        })
    }

    reset_handler() {
        this.setState({
            ...this.state,
            credentails: {
                username: this.props.username,
                old_password: '',
                new_password: '',
                password_confirmation: ''
            }
        })
    }

    restartErrors(errors){
        errors['user'] =''
        errors['project_name'] =''
        errors['description'] =''
    }

    update_password(e) {
        console.log("checks for errors")
        e.preventDefault();
        let errors = this.state.errors
        let credentails = this.state.credentails;
        this.restartErrors(credentails);
        let has_errors = false
        if ((!check_itsnot_empty(credentails['old_password']))) {
            errors['old_password'] ="Please fill in the your old password "
            has_errors = true
        }
        if(!lengthOfString(credentails['old_password'],30)){
            errors['old_password'] ="password length cannot be over 30 characters"
            has_errors = true
        }
        if ((!check_itsnot_empty(credentails['new_password']))) {
            errors['new_password'] ="Please fill in your new password."
            has_errors = true
        }
        if(!lengthOfString(credentails['new_password'],200)){
            errors['new_password'] ="password length cannot be over 200 characters, please be careful"
            has_errors = true
        }
        if (credentails['new_password'] != credentails['password_confirmation']) {
            errors['password_confirmation'] = 'your password authentication differs from your selected new password '
            has_errors = true
        }
        this.setState({
            ...this.state,
            errors
        })
        if (has_errors == true)
            return
        this.props.updatePassword(this.state.credentails, () => {
            this.reset_handler()
            alert(this.props.password_update.error_message)
        })
    }

    render() {
        console.log(this.state.errors)
        return (
            <div id="personal-details">
                <div id="inner-change-password">
                    <div className="col-sm intro-change-password"> 
                        <h6>In the section you can change your password</h6>
                        <h6>You require to re-enter your old one</h6>
                        <h6>We strongly suggest to put in a strong password for security purpose</h6>
                    </div>
                    <div className="col-sm">
                        <input type="password" class={(this.state.errors.old_password == '')? 'textbox-v1' : 'textbox-v1 form-control is-invalid'} 
                            name="old_password" value={ this.state.credentails.old_password }
                            onChange={ (e) => this.on_change('old_password', e.target.value) } ></input>
                            <div class="invalid-feedback">
                                { this.state.errors.old_password }
                            </div>
                        <label className="label-v1">Old Password</label>
                    </div>
                    <div className="col-sm">
                        <input type="password" class={(this.state.errors.new_password == '')? 'textbox-v1' : 'textbox-v1 form-control is-invalid'} 
                            name="new_password" value={ this.state.credentails.new_password }
                            onChange={ (e) => this.on_change('new_password', e.target.value) } ></input>
                            <div class="invalid-feedback">
                                { this.state.errors.new_password }
                            </div>
                        <label className="label-v1">New Password</label>
                    </div>
                    <div className="col-sm">
                        <input type="password" class={(this.state.errors.password_confirmation == '')? 'textbox-v1' : 'textbox-v1 form-control is-invalid'} 
                            name="password_confirmation" value={ this.state.credentails.password_confirmation }
                            onChange={ (e) => this.on_change('password_confirmation', e.target.value) } ></input>
                            <div class="invalid-feedback">
                                { this.state.errors.password_confirmation }
                            </div>
                            <label className="label-v1">Password Authentication</label>
                    </div>
                    {/* possible profile operations */}
                    <div id="profile-operations">
                        <button type="button" className="button-v1 button-v1-blue button-v1-small"
                            onClick={ this.update_password }>Update</button>
                        <button type="button" className="button-v1 button-v1-purple button-v1-small">Reset</button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        firstname: state.userReducer.firstname,
        lastname: state.userReducer.lastname,
        gender: state.userReducer.gender,
        occupation: state.userReducer.occupation,
        email: state.userReducer.email,
        join_date: state.userReducer.join_date,
        image: state.userReducer.image,
        upload_image: state.userReducer.upload_image,
        password_update: state.userReducer.password_update,
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getUserDetails: (username) => {
            disaptch(getUserDetails(username));
        },
        updatePassword: (user, callback) => {
            disaptch(updatePassword(user, callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);