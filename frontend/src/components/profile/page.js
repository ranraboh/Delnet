import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserDetails } from '../../actions/users';
import Menu from '../home/menu.js';
import Upper from '../home/upper/header.js';
import ProfileSidebar from './sidebar.js';
import MainProfileContent from './main-section.js';
import { homepage } from '../../appconf.js';
 
class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user
        }
    }

    componentWillMount() {
        console.log(this.props.loggedIn)
        if (this.props.loggedIn === false || this.props.loggedIn === 'false')
            window.location = homepage + '/login'
    }

    render() {
        return (
            <div id="notifications-section">
                <div>
                    <Menu active="profile" />
                    <Upper />    
                    <ProfileSidebar/>
                    <MainProfileContent />
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getUserDetails: (username) => {
            disaptch(getUserDetails(username));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);