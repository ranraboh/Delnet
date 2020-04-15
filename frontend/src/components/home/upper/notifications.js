import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homepage } from '../../../appconf.js';
 
class NotificationsPopup extends Component {
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
            <div id="notifications-popup" className="notification_dd">
            <ul className="notification_ul">
                <li className="notification-item">
                    <div className="row">
                        <div className="col-sm-">
                            <section className="dropdown-hole">
                                <div className="dropdown-image"></div>
                            </section>
                        </div>
                        <div className="col-8">
                            <h6 id="notifications-title">Cat and Dogs: new 10 items</h6>
                            <h6 id="notifications-subtitle">ranraboh appended 10 items to Cat and dogs project</h6>
                        </div>

                    </div>
                </li>
                <li>
                    <div className="row">
                        <div className="col-sm-">
                            <section className="dropdown-hole">
                                <div className="dropdown-image"></div>
                            </section>
                        </div>
                        <div className="col-8">
                            <h6 id="notifications-title">Cat and Dogs: run model</h6>
                            <h6 id="notifications-subtitle">ranraboh run the model Cats and Dogs</h6>
                        </div>

                    </div>
                </li>
                <li class="show_all">
                    <p class="link">Show All Notifications</p>
                </li> 
            </ul>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPopup);