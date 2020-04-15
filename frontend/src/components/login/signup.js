import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loginAction } from '../../actions/users.js'
import { homepage } from '../../appconf.js';

class SignUpBlock extends Component {
    constructor(props) {
        super(props)
        this.signup_handler = this.signup_handler.bind(this);
    }
    
    signup_handler() {
        window.location = homepage + "/register";
    }

    render() {
        return (
            <div id="sign-up-block">
                <h1 id="sign-title">Sign Up</h1>
                <br/>
                <p className="intro-login">
                    our service can greatly help you in building your deep-learning projects
                    and save you up a lot of time and frustration.
                    join for free to the community of developers who are already using our service
                </p>
                <p />
                <button id='login_button' type="button" className="btn btn-info send-button"
                    onClick={ this.signup_handler }>Register</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpBlock);
