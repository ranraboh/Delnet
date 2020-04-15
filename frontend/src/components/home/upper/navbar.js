import React, { Component } from 'react';
import { homepage } from '../../../appconf.js';
import { connect } from 'react-redux';
import { logoutAction } from '../../../actions/users.js'
import NotificationsPopup from "./notifications.js";
import MessagesPopup from "./messages.js";


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: false,
            messages: false
        }

        /* bind inner methods */
        this.logout_handler = this.logout_handler.bind(this);
        this.notifications_link = this.notifications_link.bind(this);
        this.notifications_popup = this.notifications_popup.bind(this);
        this.messages_popup = this.messages_popup.bind(this);
        this.messages_link = this.messages_link.bind(this);
    }
    logout_handler() {
        this.props.logoutAction()
        window.location = homepage +'/login';
    }

    home_link() {
        window.location = homepage + '/home';   
    }

    profile_link() {
        window.location = homepage + '/profile';   
    }
    
    notifications_link() {
        this.setState({
            ...this.state,
            messages: false,
            notifications: !this.state.notifications
        })
    }

    
    messages_link() {
        this.setState({
            ...this.state,
            notifications: false,
            messages: !this.state.messages
        })
    }

    notifications_popup() {
        if (this.state.notifications === true) 
            return (<NotificationsPopup />)
        return ''
    }
    
    messages_popup() {
        if (this.state.messages === true)
            return (<MessagesPopup />)
        return ''
    }

    render() {
        let notifications = this.notifications_popup()
        let messages = this.messages_popup()
        return (
            <div id="navbar-section">
                <a class="navbar-brand" href="#">DELNET</a>
                <ul id="nav-links">
                    <li><a className="navbar-link" onClick={ this.home_link }>Home</a></li>
                    <li><a className="navbar-link" onClick={ this.profile_link }>Profile</a></li>
                    <li>
                        <a id="notifcation-link" className="navbar-link" 
                            onClick={ this.notifications_link }>Notifications</a>
                    </li>
                    { notifications }
                    <li>
                        <a id="message-link" className="navbar-link"
                            onClick={ this.messages_link }>Messages</a>
                    </li>
                    { messages }
                    <li>
                        <button id="logout" type="button" class="btn btn-outline-danger btn-logout" onClick={ this.logout_handler }>Log Out</button>
                        
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutAction: () => {
            dispatch(logoutAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);