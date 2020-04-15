import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getUserDetails, updateUser, uploadImage } from '../../actions/users'

class PersonalDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user : {
                username: props.username,
                firstname: props.firstname,
                lastname: props.lastname,
                gender: props.gender,
                occupation: props.occupation,
                email: props.email,
                join_date: props.join_date,
                image: props.image
            },
        }
        
        /* bind methods */
        this.props.getUserDetails(props.username)
        this.update_profile = this.update_profile.bind(this);
        this.female_select_handler = this.female_select_handler.bind(this);
        this.male_select_handler = this.male_select_handler.bind(this);
    }

    update_profile() {
        console.log(this.state.user)
        this.props.updateUser(this.state.user, () =>{
            alert('your details successfully updated')
        })
    }

    on_change(field, value) {
        let user = this.state.user;
        user[field] = value;

        this.setState({
            ...this.state,
            user
        })
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
                <div id="inner-personal-details" className="container">
                    <div className="row intro-personal-details">
                        <h6>This section contains your perosnal details that you had mentioned earlier.</h6>
                        <h6>You are able to ascertain its correctness and modify them accordingly.</h6>
                    </div>
                    <div className="row">
                        <div class="col-sm">
                            <input value={ this.state.user.username } className="textbox-v1" disabled="true" onChange={ (e)=> this.on_change('username', e.target.value)} ></input>
                            <label className="label-v1">Username</label>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-sm">
                            <input value={ this.state.user.firstname } className="textbox-v1" onChange={ (e)=> this.on_change('firstname', e.target.value)} ></input>
                            <label className="label-v1">First Name</label>
                        </div>
                        <div class="col-sm">
                            <input value={ this.state.user.lastname } className="textbox-v1" onChange={ (e)=> this.on_change('lastname', e.target.value)} ></input>
                            <label className="label-v1">Last Name</label>
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