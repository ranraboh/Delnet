import React, { Component } from 'react';
import { homepage } from '../../appconf.js';
import { connect } from 'react-redux';
import { getUserDetails } from '../../actions/users.js';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu_display: false
        }
        this.home_handler = this.home_handler.bind(this);
        this.profile_handler = this.profile_handler.bind(this);
        this.projects_handler = this.projects_handler.bind(this);
        this.datasets_handler = this.datasets_handler.bind(this);
        this.amb_handler = this.amb_handler.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        if (this.props.active != null) {
            var element = document.getElementById('menu-' + this.props.active)
            element.className = 'menu-item-active';
        }
        this.props.getUserDetails(this.props.user)
    }

    componentDidUpdate() {
        var element = document.getElementById('menu-profile-image')
        element.style.backgroundImage = "url(" + this.props.image + ")"
    }

    amb_handler() {
        window.location = homepage + '/automated';   
    }

    home_handler() {
        window.location = homepage + '/home';   
    }

    community_handler() {
        window.location = homepage + '/community';   
    }

    profile_handler() {
        window.location = homepage + '/profile';   
    }

    projects_handler() {
        window.location = homepage + '/projects';   
    }

    datasets_handler() {
        window.location = homepage + '/datasets';   
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll() {
        let scroll_position = window.scrollY
        if (scroll_position > 100 && this.state.menu_display == false) {
            this.setState({
                ...this.state,
                menu_display: true
            });
        }
        if (scroll_position < 100 && this.state.menu_display == true) {
            this.setState({
                ...this.state,
                menu_display: false
            });
        }
    }

    render() {
        console.log(this.state.menu_display)
        return ( 
            <div id="menu-section" className={ (this.state.menu_display == false)? "menu-section-nonactive":"menu-section-active"  }>
                <div className="menu-internal">
                    <div id="personal-menu">
                        <div class="row">
                            <div class=" col-sm-3 col-md-6 col-lg-4">
                                <div id="menu-profile-image"></div>
                            </div>
                            <div className="col-sm-9 col-md-6 col-lg-8 menu-profile-text">
                                <p className="menu-profile-title">{ this.props.firstname + " " + this.props.lastname }</p>
                                <p className="menu-profile-subtitle">{ this.props.occupation }</p>
                                <p className="menu-profile-personal">Personal Details</p>
                                <p className="menu-profile-logout">log-out</p>
                            </div>
                        </div>
                    </div>
                    <hr className="menu-seperator"/>
                    <h2 id="menu-title">del<span id="menu-title-prefix">net</span></h2>
                    <ul id="menu-list">
                        <li id="menu-home" className="menu-item">
                            <i className="fa fa-home"></i>
                            <p className="menu-text" onClick={ this.home_handler }>Home</p>
                        </li>
                        <li id="menu-profile" className="menu-item">
                            <i className="fa fa-user"></i>
                            <p className="menu-text" onClick={ this.profile_handler }>Profile</p>
                        </li>
                        <li id="menu-projects" className="menu-item">
                            <i className="fa fa-edit"></i>
                            <p className="menu-text" onClick={ this.projects_handler }>Projects</p>
                        </li>
                        <li id="menu-community" className="menu-item">
                            <i className="fa fa-users"></i>
                            <p className="menu-text" onClick={ this.community_handler }>Community</p>
                        </li>
                        <li id="menu-datasets" className="menu-item">
                            <i className="fa fa-database"></i>
                            <p className="menu-text" onClick={ this.datasets_handler }>Data Sets</p>
                        </li>
                        <li id="menu-amb" className="menu-item">
                            <i className="fa fa-wrench"></i>
                            <p className="menu-text" onClick={ this.amb_handler }>Model Builder</p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        user: state.authentication.user,
        firstname: state.userReducer.firstname,
        lastname: state.userReducer.lastname,
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);