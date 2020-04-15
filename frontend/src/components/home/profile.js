import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { getUserDetails, logoutAction } from '../../actions/users.js';
import { homepage } from '../../appconf.js'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.logout_handler = this.logout_handler.bind(this);
        this.props.getUserDetails(props.user);
    }

    logout_handler() {
        this.props.logoutAction();
        window.location = homepage + "/login";
    }

    profile_details() {
        window.location = "../profile";
    }

    componentWillReceiveProps(nextProps) {
        var element = document.getElementById("profile-image");
        element.style.backgroundImage = 'url(' + nextProps.image + ")";
    }

    render() {
        return (
        <div id="profile-section">
            {/* Profile Header */}
            <div id="profile-header">
                <section class="image-shape">
                    <div id="profile-image"></div>
                </section>
            </div>
            
            {/* Profile Section */}
            <div id="profile">

                {/* Personal Details */}
                <h6 id="profile-name">{ this.props.user } </h6>
                <h6 id="profile-occupation">{ this.props.occupation }</h6>
                <hr className="seperator"></hr>
                
                {/* Links */}
                <h6 className="profile-link" onClick={ this.profile_details }>Personal Details</h6>
                <h6 className="profile-link" onClick={ this.logout_handler }>Log Out</h6>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        user: state.authentication.user,
        occupation: state.userReducer.occupation,
        image: state.userReducer.image
    }
}


const mapDispatchToProps = dispatch => {
    return {
        logoutAction: () => {
            dispatch(logoutAction())
        },
        getUserDetails: (username) => {
            dispatch(getUserDetails(username));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);