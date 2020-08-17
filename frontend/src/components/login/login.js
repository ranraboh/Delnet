import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loginAction, authenticate } from '../../actions/users.js'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            credentials: {
                username: '',
                password: ''
            }
        }
        this.login_system = this.login_system.bind(this);
        this.reset_handler = this.reset_handler.bind(this);
    }
    
    reset_handler() {
        this.setState({
            ...this.state,
            credentials: {
                username: '',
                password: ''
            }
        })
    }

    login_system() {
        if (this.state.credentials.username == '') {
            alert("fill up your username account")
            return
        } else if (this.state.credentials.password == '') {
            alert("you haven't fill in your password of your account")
            return
        }
        this.props.authenticate(this.state.credentials, () => {
            console.log(this.props.authentication)
            if (this.props.authentication.success == true) {
                this.props.login(this.state.credentials.username);
                window.location = "../home";
            } else {
                this.reset_handler()
                alert(this.props.authentication.error_message)
            }
        })

    }

    username_change_handler = (e) => {
        let credentials = this.state.credentials
        credentials.username = e.target.value
        this.setState({
            ...this.state,
            credentials
        })
    }

    password_change_handler = (e) => {
        let credentials = this.state.credentials
        credentials.password = e.target.value
        this.setState({
            ...this.state,
            credentials
        })
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
                        value={ this.state.credentials.username } />
                </p>
                <p>
                    <label id="password-text">Password:</label>
                    <input type="password" className="form-textbox" onChange={ this.password_change_handler } 
                        value={ this.state.credentials.password }/>
                </p>
                <button id='login_button' type="button" className="btn btn-primary send-button"
                    onClick={ this.login_system }>Send</button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        authentication: state.userReducer.authenticate
    }
}

const mapDispatchToProps = disaptch => {
    return {
        login: (username) => {
            disaptch(loginAction(username));
        },
        authenticate: (credentials, callback) => {
            disaptch(authenticate(credentials, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
