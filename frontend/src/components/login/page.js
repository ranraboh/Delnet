import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Header from './header.js';
import Services from './services.js';
import LoginForm from './login.js';
import Contact from './contact.js';
import Footer from './footer.js';
import SignUpBlock from './signup.js';
import { homepage } from '../../appconf.js';

class LoginPage extends Component {
    
    componentWillMount() {
        console.log(this.props.loggedIn)
        if (this.props.loggedIn === true || this.props.loggedIn === 'true')
            window.location = homepage + '/home'
    }

    render() {
        return (
            <div id='login-page'>
                <Header/>
                <Services/>
                <div id="login">
                    <LoginForm/>
                    <SignUpBlock />
                </div>
                <Contact/>
                <Footer/>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user
    }
}

const mapDispatchToProps = disaptch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);