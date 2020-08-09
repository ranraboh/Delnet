import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homepage } from '../../../appconf.js';
import { getNotificationsHeader } from '../../../actions/users'
 
class NotificationsPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user
        }
        this.props.getNotificationsHeader(props.username)
        this.all_handler = this.all_handler.bind(this);
    }

    all_handler() {
        window.location = homepage + "/profile"
    }

    render() {
        if (this.props.notifications_header == null)
            return ''
        return (
            <div id="notifications-popup" className="notification_dd">
            <ul className="notification_ul">
                {
                    this.props.notifications_header.map((record) =>
                        <li className="notification-item">
                        <div className="row">
                            <div className="col-sm-">
                                <section className="dropdown-hole">
                                    <img src={ record.image } className="dropdown-image"></img>
                                </section>
                            </div>
                            <div className="col-8">
                                <h6 id="notifications-title">{ record.project + ": " + record.topic }</h6>
                                <h6 id="notifications-subtitle">{ record.content }</h6>
                            </div>

                        </div>
                    </li>
                    )
                }
                <li class="show_all">
                    <p class="link" onClick={ this.all_handler }>Show All Notifications</p>
                </li> 
            </ul>
        </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        notifications_header: state.userReducer.notifications_header,
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getNotificationsHeader: (user) => {
            disaptch(getNotificationsHeader(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPopup);