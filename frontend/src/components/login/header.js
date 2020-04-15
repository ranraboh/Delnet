import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header id="upper">
                <div id="header">
                    <div id="header-content" className="blue-shadow">
                        <ul id="header-menu">
                            <li>> Home</li>
                            <li>> Services</li>
                            <li>> Contact Us</li>
                            <li>> Sign Up</li>
                        </ul>
                        <button id="login-menu" type="button" className="btn btn-outline-warning">
                            <i className="fa fa-lock" aria-hidden="true"></i>  Log In
                        </button>
                    </div>
                    <div id="main-text">
                        <h1 id="site-name">delnet</h1>
                        <h2 id="site-desc">
                            web application to manage your deep learning projects
                            and making the process more efficient and friendly
                        </h2>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;