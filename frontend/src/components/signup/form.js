import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createUser } from '../../actions/users.js'
import { homepage } from '../../appconf.js';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        
        /* initialize user details */
        this.state = {
            user: {
                username: '',
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
    }

    on_change(field, value) {
        console.log('on change')
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

    register_action(e) {
        e.preventDefault();
        console.log('register')
        this.props.createUser(this.state.user, () => {
            console.log('callback..')
            alert('the user added successfully, you are able to log in');
            window.location = homepage + '/login';
        })
    }

    render() {
        return (
            <div class="card-body">
                <h1 className="register-title">Sign Up</h1>
                <form method="POST">
                    <div class="form-row m-b-55">
                    <div className="name">User Name</div>
                        <div class="value">
                            <input class="input--style-5" type="text" name="user_name" value={ this.state.user.username }
                                onChange={ (e) => this.on_change('username', e.target.value) } />
                        </div>
                    </div>
                    <div className="form-row m-b-55">
                        <div className="name">Name</div>
                        <div className="value">
                            <div class="row row-space">
                                <div class="col-6">
                                    <div class="input-group-desc">
                                        <input class="input--style-5" type="text" name="first_name" value={ this.state.user.firstname }
                                            onChange={ (e) => this.on_change('firstname', e.target.value) } />
                                        <label class="label--desc">first name</label>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="input-group-desc">
                                        <input class="input--style-5" type="text" name="last_name" value={ this.state.user.lastname }
                                            onChange={ (e) => this.on_change('lastname', e.target.value) } />
                                        <label class="label--desc">last name</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="name">Occupation</div>
                        <div class="value">
                            <div class="input-group">
                                <input class="input--style-5" type="text" name="occupation" value={ this.state.user.occupation }
                                    onChange= { (e) => this.on_change('occupation', e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="name">Email</div>
                        <div class="value">
                            <div class="input-group">
                                <input class="input--style-5" type="email" name="email" value={ this.state.user.email } 
                                    onChange={ (e) => this.on_change('email', e.target.value) } />
                            </div>
                        </div>
                    </div>
                    <div class="form-row m-b-55">
                        <div class="name">Image</div>
                        <div className="value">
                            {/*<input type="file" id="img" name="img" accept="image/*" value={ this.state.user.image } 
                                onChange= { (e) => this.on_change('image', e.target.value) }/> */}
                            <input class="input--style-5" type="text" name="image" value={ this.state.user.image } 
                                onChange={ (e) => this.on_change('image', e.target.value) } />
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

const mapDispatchToProps = disaptch => {
    return {
        createUser: (user, callback) => {
            console.log(callback)
            createUser(user, callback);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
