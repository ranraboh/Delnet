import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homepage } from '../../../appconf.js';

class MessagesPopup extends Component {
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
            <div id="messages-popup" className="message_dd">
            <ul className="messages_ul">
                <li className="message-item">
                    <div className="row">
                        <div className="col-sm-">
                            <section className="dropdown-hole">
                                <div className="dropdown-image"></div>
                            </section>
                        </div>
                        <div className="col-8">
                            <h6 id="messages-title">yosidavid</h6>
                            <h6 id="messages-subtitle">hi ran, what's up dude ?</h6>
                            <h6 id="messages-subtitle">long time didn't talk to you</h6>
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
                            <h6 id="messages-title">yosidavid</h6>
                            <h6 id="messages-subtitle">hi, i have ran the model a couple of times</h6>
                            <h6 id="messages-subtitle">and the result wasn't sufficient</h6>
                            <h6 id="messages-subtitle">i will be glad if you keep working on it.</h6>
                        </div>

                    </div>
                </li>
                <li class="show_all">
                    <p class="link">Show All Messages</p>
                </li> 
            </ul>
        </div>
        )
    }
}


const mapStateToProps = state => {
    console.log("sdsdfds")
    console.log(state.userReducer.messageHedear)
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        messageHedear: state.userReducer.messageHedear
    }
}

const mapDispatchToProps = disaptch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPopup);