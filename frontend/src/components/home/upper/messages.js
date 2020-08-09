import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homepage } from '../../../appconf.js';
import { getMessagesHeader } from '../../../actions/users'

class MessagesPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user
        }
        this.props.getMessagesHeader(props.username)
        this.all_handler = this.all_handler.bind(this);
    }

    all_handler() {
        window.location = homepage + "/profile"
    }
    
    render() {
        if (this.props.messagesHeader == null)
            return ''
        return (
            <div id="messages-popup" className="message_dd">
            <ul className="messages_ul">
                {
                    this.props.messagesHeader.slice(0, 2).map((record) =>
                    <li className="message-item">
                        <div className="row">
                            <div className="col-sm-">
                                <section className="dropdown-hole">
                                    <img src={ record.image } className="dropdown-image"></img>
                                </section>
                            </div>
                            <div className="col-8">
                                <h6 id="messages-title">{ record.sender }</h6>
                                <h6 id="messages-subtitle">{ record.content }</h6>
                            </div>

                        </div>
                    </li>
                )}
                <li class="show_all">
                    <p class="link" onClick={ this.all_handler }>Show All Messages</p>
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
        messagesHeader: state.userReducer.messagesHeader,
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getMessagesHeader: (receiver) => {
            disaptch(getMessagesHeader(receiver));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPopup);