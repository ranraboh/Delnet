import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loginAction } from '../../actions/users.js'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            submitted: false,
            username: '',
            password: ''
        }
        this.login_system = this.login_system.bind(this);
    }
    
    login_system() {
        this.props.login(this.state.username);
        window.location = "../home";
    }

    username_change_handler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    password_change_handler = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return (
            <div className="form-login">
                <h1 id="login-title">Login</h1>
                <p className="intro-login">
                    log-in and experience a community of programmers connect, share content
                    and collaborate together to help each other reach their goals.
                </p>
                <p>
                    <label id="username-text">Username:</label>
                    <input type="text" className="form-textbox" onChange={ this.username_change_handler } 
                        value={ this.state.username } />
                </p>
                <p>
                    <label id="password-text">Password:</label>
                    <input type="password" className="form-textbox" onChange={ this.password_change_handler } 
                        value={ this.state.password }/>
                </p>
                <button id='login_button' type="button" className="btn btn-primary send-button"
                    onClick={ this.login_system }>Send</button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = disaptch => {
    return {
        login: (username) => {
            disaptch(loginAction(username));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
