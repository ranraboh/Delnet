import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import RegisterNavBar from './navbar.js'
import RegisterForm from './form.js'

class RegisterPage extends Component {
    render() {
        return (
            <div id='login-page'>
                <RegisterNavBar />
                <div class="card-background" />
                <div class="card card-5">
                    <RegisterForm />
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = disaptch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);