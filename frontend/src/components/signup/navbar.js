import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homepage } from '../../appconf.js'

class RegisterNavBar extends Component {
    constructor(props) {
        super(props);
        this.login_handler = this.login_handler.bind(this);
        this.home_handler = this.home_handler.bind(this);
    }
    login_handler(e) {
        e.preventDefault();
        window.location = "../login";
    }

    home_handler() {
        window.location = "../home";
    }
    render() {
        return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Delnet</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a className="nav-link" onClick={ this.home_handler }>Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" onClick={ this.login_handler }>Login</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="#">Register <span class="sr-only"></span></a>
                </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <button class="btn btn-outline-primary my-2 my-sm-0" type="submit" onClick={ this.login_handler }>Sign In</button>
                </form>
            </div>
        </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterNavBar);