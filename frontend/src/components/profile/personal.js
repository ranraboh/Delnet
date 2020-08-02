import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getUserDetails, updateUser, uploadImage } from '../../actions/users'

class PersonalDetails extends Component {
    constructor(props) {
        super(props)
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
            user : {
                username: props.username,
                firstname: props.firstname,
                lastname: props.lastname,
                gender: props.gender,
                occupation: props.occupation,
                email: props.email,
                join_date: props.join_date,
                image: props.image
            }
        }
        
        /* bind methods */
        this.props.getUserDetails(props.username)
        this.update_profile = this.update_profile.bind(this);
        this.female_select_handler = this.female_select_handler.bind(this);
        this.male_select_handler = this.male_select_handler.bind(this);
        this.on_change = this.on_change.bind(this);
        this.restartErrors = this.restartErrors.bind(this);

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
    update_profile(e) {
        e.preventDefault();
        console.log('register')
        let errors = this.state.errors
        let user = this.state.user;
        
        this.restartErrors(errors);
      //  if (!this.check_itsnot_empty(user['username'])) {
        if (false) {
            errors['username'] ="the name is empy ,enter name."
        }
        this.setState({
            ...this.state,
            errors
        })
        console.log(this.state.user)
        if(user['image']==''){
        this.props.updateUser(this.state.user, () =>{
            alert('your details successfully updated')
            window.location = homepage + '/profile';
        })}
    }

    on_change(field, value) {
        console.log('on change')
        let user = this.state.user;
        user[field] = value;

        this.setState({
            user
        })

      //  this.setState({
      //      ...this.state,
       //     user
      //  })
    }

    female_select_handler() {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                gender: 'f'
            }
        })
    }

    male_select_handler() {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                gender: 'm'
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            user : {
                username: nextProps.username,
                firstname: nextProps.firstname,
                lastname: nextProps.lastname,
                gender: nextProps.gender,
                occupation: nextProps.occupation,
                email: nextProps.email,
                join_date: nextProps.join_date,
                image: nextProps.upload_image,
            }
        })
    }

    render() {
        return (
            <div id="personal-details">
                <form method="POST">
                <div id="inner-personal-details" className="container">
                    <div className="row intro-personal-details">
                        <h6>This section contains your perosnal details that you had mentioned earlier.</h6>
                        <h6>You are able to ascertain its correctness and modify them accordingly.</h6>
                    </div>
                    <div className="row">
                        <div class="col-sm">
                            <div class="value">
                            <input class={(this.state.errors.username == '')? 'input--style-5' : 'input--style-5 form-control is-invalid'} 
                            type="text" name="user_name" value={ this.state.user.username }className="textbox-v1" 
                            onChange={ (e) => this.on_change('username', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.username }
                                </div>
                                <label className="label-v1">Usernamell</label>
                         </div>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-sm">
                        <div class="value">
                            <input class={(this.state.errors.firstname == '')? 'input--style-5' : 'input--style-5 form-control is-invalid'} 
                            type="text" name="first_name" value={ this.state.user.firstname }className="textbox-v1" 
                            onChange={ (e) => this.on_change('firstname', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.firstname }
                                </div>
                                <label className="label-v1">First Name</label>
                         </div>
                        </div>
                        <div class="col-sm">
                        <div class="value">
                            <input class={(this.state.errors.lastname == '')? 'input--style-5' : 'input--style-5 form-control is-invalid'} 
                            type="text" name="last_name" value={ this.state.user.lastname }className="textbox-v1" 
                            onChange={ (e) => this.on_change('lastname', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.lastname }
                                </div>
                                <label className="label-v1">Last Name</label>
                         </div>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-sm">
                            <input value={ this.state.user.email } className="textbox-v1" onChange={ (e)=> this.on_change('email', e.target.value)} ></input>
                            <label className="label-v1">Email</label>
                        </div>
                        <div class="col-sm">
                            <input value={ this.state.user.occupation } className="textbox-v1" onChange={ (e)=> this.on_change('occupation', e.target.value)} ></input>
                            <label className="label-v1">Occupation</label>
                        </div>
                    </div>
                    <div className="row">
                        <label id="gender-label" className="col-sm-4 col-form-label">Gender</label>
                        <div class="col-sm-6">
                            <p>
                                <input type="radio" id="button_male" name="gender-group" className="radio-button-v1 radio-button-v1-blue" checked= { this.state.user.gender === 'm' } />
                                <label className="radio-button-v1-label" for="male" onClick={ this.male_select_handler }>Male</label>
                            </p>
                            <p>
                                <input type="radio" id="button_female" name="gender-group" className="radio-button-v1 radio-button-v1-pink" checked= { this.state.user.gender === 'f' } />
                                <label className="radio-button-v1-label" for="female" onClick={ this.female_select_handler }>Female</label>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <label id="gender-label" className="col-sm-4 col-form-label">Image</label> 
                        <div class="col-sm-6">
                            <img src={ this.props.image } className="personal-image" />
                        </div>
                    </div>
                    <div className="row">
                        <label id="gender-label" className="col-sm-4 col-form-label">Join Date</label> 
                        <div class="col-sm-6">
                            <label className="static-personal-data">{ this.props.join_date }</label>
                        </div>
                    </div>

                    {/* possible profile operations */}
                    <div id="profile-operations">
                        <button type="button" className="button-v1 button-v1-green button-v1-small"
                            onClick={ this.update_profile }>Update</button>
                        <button type="button" className="button-v1 button-v1-red button-v1-small">Reset</button>
                    </div>
                </div>
                </form>
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
        upload_image: state.userReducer.upload_image
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getUserDetails: (username) => {
            disaptch(getUserDetails(username));
        },
        updateUser: (user, callback) => {
            disaptch(updateUser(user, callback))
        },
        uploadImage: (image) => {
            disaptch(uploadImage(image))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);