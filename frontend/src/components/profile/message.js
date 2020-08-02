import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getUserDetails, updateUser, uploadImage } from '../../actions/users'

class senderMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message : {
                sender: props.sender,
                receiver: props.receiver,
                content: props.content,
                date: props.date,
                time: props.time
            }
        }
        /* bind methods */
        this.props.getSenderMessages(props.sender)
    }
   

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            user : {
                sender: nextProps.sender,
                receiver: nextProps.receiver,
                content: nextProps.content,
                date: nextProps.date,
                time: nextProps.time,
            }
        })
    }

    render() {
        return (
            <div id="Your sender Messages">
                <form method="POST">
                <div id="inner-sender_message" className="container">
                    <div className="row intro-sender_message">
                        <h6>This is your messages sent.</h6>
                    </div>
                    <div className="row">
                        <div class="col-sm">
                            <div class="value">
                            <label className="label-v1">sender:</label>
                            <input value={ this.state.message.sender } className="textbox-v1" disabled="true"></input>
                         </div>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-sm">
                            <div class="value">
                            <label className="label-v1">receiver:</label>
                            <input value={ this.state.message.receiver } className="textbox-v1" disabled="true"></input>
                         </div>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-sm">
                            <div class="value">
                            <label className="label-v1">content:</label>
                            <input value={ this.state.message.content } className="textbox-v1" disabled="true"></input>
                         </div>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-sm">
                            <div class="value">
                            <label className="label-v1">date:</label>
                            <input value={ this.state.message.date } className="textbox-v1" disabled="true"></input>
                         </div>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-sm">
                            <div class="value">
                            <label className="label-v1">time:</label>
                            <input value={ this.state.message.time } className="textbox-v1" disabled="true"></input>
                         </div>
                        </div>
                    </div>
                   
                </div>
                </form>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {  
        sender: state.userReducer.sender,
        receiver: state.userReducer.receiver,
        content: state.userReducer.content,
        date: state.userReducer.date,
        time: state.userReducer.time
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getSenderMessages: (sender) => {
            disaptch(getSenderMessages(sender));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(senderMessage);