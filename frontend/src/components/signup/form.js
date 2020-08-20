import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createUser } from '../../actions/users.js'
import { homepage } from '../../appconf.js';
import {validateEmail,checkURL,check_passward_theSame, check_password ,allLetter, check_itsnot_empty } from "../../actions/validation";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        
        /* initialize user details */
        this.state = {
            errors: {
                username: '',
                password: '',
                confirm_password: '',
                firstname: '',
                lastname: '',
                occupation: '',
                email: '',
                gender: 'm',
                image: ''
                
            },
            user: {
                username: '',
				password: '',
				confirm_password: '',
                firstname: '',
                lastname: '',
                occupation: '',
                email: '',
                gender: 'm',
                image: ''
            }
        }
        this.register_action = this.register_action.bind(this);
        this.on_change = this.on_change.bind(this);
        this.male_button_change = this.male_button_change.bind(this);
        this.female_button_change = this.female_button_change.bind(this);
        this.restartErrors=this.restartErrors.bind(this);
    }

    on_change(field, value) {
        let user = this.state.user;
        user[field] = value;

        this.setState({
            user
        })
    }

    male_button_change = (e) => {
        let user = this.state.user
        user['gender'] = (e.currentTarget.value) ? 'm' : 'f';
        this.setState({
            user
        })
    }

    female_button_change = (e) => {
        let user = this.state.user
        user['gender'] = (e.currentTarget.value) ? 'f' : 'm';
        this.setState({
            user
        })
    }
    restartErrors(errors){
        errors['username'] =''
        errors['password'] =''
        errors['confirm_password'] =''
        errors['firstname'] =''
        errors['lastname'] =''
        errors['occupation'] =''
        errors['email'] =''
        errors['image'] =''
    }
    register_action(e) {
        e.preventDefault();
        console.log('register')
        let errors = this.state.errors
        let user = this.state.user;
        this.restartErrors(errors);
        var bool=false
        if (!check_itsnot_empty(user['username'])) {
            errors['username'] ="the name is empy ,enter name."
            bool=true
        }
        if(allLetter(user['firstname'])){
            errors['firstname'] ="Numbers must not contain only letters"
            bool=true
        }
        if (!check_itsnot_empty(user['firstname'])) {
            errors['firstname'] ="your first name is empy ,enter name."
            bool=true
        }
        if(allLetter(user['lastname'])){
            errors['lastname'] ="Numbers must not contain only letters"
            bool=true
        }
        if (!check_itsnot_empty(user['lastname'])) {
            errors['lastname'] ="your last name is empy ,enter name."
            bool=true
        }
        if(!check_password(user['password'])){
            errors['password']="the password must contain at least 6 letters."
            errors['confirm_password']=" need to change your passward."
            bool=true
        }else{
            if(!check_passward_theSame(user['password'],user['confirm_password'])){
                errors['confirm_password']="Password mismatch, fix it. "
                bool=true
            }
        }
        if(!check_itsnot_empty(user['occupation'])){
            errors['occupation']="your occupation is empy ,enter occupation."
            bool=true
        }
        if(allLetter(user['occupation'])){
            errors['occupation'] ="Numbers must not contain only letters"
            bool=true
        }
        if(!validateEmail(user['email'])){
            errors['email']="There is an error in the email address,fix it please."
            bool=true
        }
        if(!check_itsnot_empty(user['email'])){
            errors['email']="your email is empy ,enter email."
            bool=true
        }
        if(!checkURL(user['image'])){
            errors['image']="Please enter a suitable image."
            console.log("shiranIMAGE")
            bool=true
        }
        if(!check_itsnot_empty(user['image'])){
            errors['image']="Please enter a suitable image."
            bool=true
        }
        this.setState({
            ...this.state,
            errors
        })
        if(bool){
            return
        }
        this.props.createUser(this.state.user, () => {
            alert('the user added successfully, you are able to log in');
            window.location = homepage + '/login';
        })
    }

    render() {
        return (
            <div class="card-body card-register">
                <h1 className="register-title">Sign Up</h1>
                <form method="POST">
                    <div class="form-row m-b-55">
                    <div className="name">User Name</div>
                        <div class="value">
                            <input class={(this.state.errors.username == '')? 'input--style-5' : 'input--style-5 form-control is-invalid'} 
                            type="text" name="user_name" value={ this.state.user.username }
                                onChange={ (e) => this.on_change('username', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.username }
                                </div>
                        </div>
                    </div>
                    <div className="form-row m-b-55">
                        <div className="name">Name</div>
                        <div className="value">
                            <div class="row row-space">
                                <div class="col-6">
                                    <div class="input-group-desc">
                                    <input class={(this.state.errors.firstname == '')? 'input--style-5' : 'input--style-5 form-control is-invalid'} 
                                    type="text" name="first_name" value={ this.state.user.firstname }
                                            onChange={ (e) => this.on_change('firstname', e.target.value) } />
                                            <div class="invalid-feedback">
                                                { this.state.errors.firstname }
                                            </div>
                                            <label class="label--desc">first name</label>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="input-group-desc">
                                    <input class={(this.state.errors.lastname == '')? 'input--style-5' : 'input--style-5 form-control is-invalid'} 
                                    type="text" name="last_name" value={ this.state.user.lastname }
                                            onChange={ (e) => this.on_change('lastname', e.target.value) } />
                                        <div class="invalid-feedback">
                                                { this.state.errors.lastname }
                                            </div>
                                            <label class="label--desc">last name</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
					   <div class="form-row m-b-55">
                    <div className="name">Password</div>
                        <div class="value">
                            <input class={(this.state.errors.password == '')? 'input--style-5' : 'input--style-5 form-control is-invalid'}
                              type="password" name="password" value={ this.state.user.password }
                                onChange={ (e) => this.on_change('password', e.target.value) } />
                                 <div class="invalid-feedback">
                                    { this.state.errors.password }
                                </div>
                        </div>
                    </div>
					   <div class="form-row m-b-55">
                    <div className="name">Confirm Password</div>
                        <div class="value">
                        <input class={(this.state.errors.confirm_password == '')? 'input--style-5' : 'input--style-5 form-control is-invalid'}
                              type="password" name="confirm_password" value={ this.state.user.confirm_password }
                                onChange={ (e) => this.on_change('confirm_password', e.target.value) } />
                                  <div class="invalid-feedback">
                                    { this.state.errors.confirm_password }
                                </div>
                        </div>
                    </div>
			        <div class="form-row m-b-55">
                        <div class="name">Occupation</div>
                        <div class="value">
                            <div class="input-group">
                            <input class={(this.state.errors.occupation == '')? 'input--style-5' : 'input--style-5 form-control is-invalid'}
                            type="text" name="occupation" value={ this.state.user.occupation }
                                onChange={ (e) => this.on_change('occupation', e.target.value) } />
                                  <div class="invalid-feedback">
                                    { this.state.errors.occupation }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-row m-b-55">
                        <div class="name">Email</div>
                        <div class="value">
                            <div class="input-group">
                            <input class={(this.state.errors.email == '')? 'input--style-5' : 'input--style-5 form-control is-invalid'}
                            type="text" name="email" value={ this.state.user.email }
                                onChange={ (e) => this.on_change('email', e.target.value) } />
                                  <div class="invalid-feedback">
                                    { this.state.errors.email }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-row m-b-55">
                        <div class="name">Image</div>
                        <div className="value">
                        <input class={(this.state.errors.image == '')? 'input--style-5' : 'input--style-5 form-control is-invalid'}
                            type="text" name="image" value={ this.state.user.image }
                                onChange={ (e) => this.on_change('image', e.target.value) } />
                                  <div class="invalid-feedback">
                                    { this.state.errors.image }
                                </div>
                        </div>
                    </div>
                    <div class="form-row p-t-20">
                        <label class="label label--block">Gender</label>
                        <div class="p-t-15">
                            <label class="radio-container m-r-55">Male
                                <input type="radio" name="exist" onClick= { this.male_button_change }
                                    checked={ this.state.user.gender === 'm' } />
                                <span class="checkmark"></span>
                            </label>
                            <label class="radio-container">Female
                                <input type="radio" name="exist" onChange={ this.female_button_change }
                                    checked={ this.state.user.gender === 'f' } />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <button class="btn register-button" onClick={ this.register_action }>Register</button>
                    </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        createUser: (user, callback) => {
            dispatch(createUser(user, callback));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
