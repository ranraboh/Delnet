import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {getContentMessages,addMessages} from '../../actions/users'
import { profilePage } from '../../appconf.js';

/*getContentMessages*/
class WriteMessage extends Component {
    constructor(props) {
        super(props)
          /* initialize user details */
          this.state = {
            message: {
                sender:this.props.username,
                receiver: '',
				content: '',
				
            }
        }
        this.send_message = this.send_message.bind(this);
        this.on_change = this.on_change.bind(this);
    }
    /*need to do check before send message ' like if the username is good ..*/
    send_message(e) {
        e.preventDefault();
         this.props.addMessages(this.state.message,()=>{
            alert(' the user sent message successfully');
            window.location = profilePage;
        })
    }

    on_change(field, value) {
        let message = this.state.message;
        message[field] = value;
        this.setState({
            message
        })
    }
   
    render() {
        return (
            <div id="personal-details">
            <div class="card-body">
                <h1 className="register-title">Write Messages</h1>
                <form method="POST">
                    <div class="form-row m-b">
                    <div className="name">The username you want to send a message to</div>
                        <div class="value">
                        <input value={this.state.message.receiver  } className="input--style-5" onChange={ (e)=> this.on_change('receiver', e.target.value)} ></input>
                        </div>
                    </div>
                    <div className="form-row m-b">
                    <div className="name">Write your message</div>
                        <div class="value">
                        <textarea  rows="10" cols="70"  value={this.state.message.content } className="input--style-5" onChange={ (e)=> this.on_change('content', e.target.value)} ></textarea>
                        </div>
                    </div>
                    <div>
                        <button class="btn register-button" onClick={ this.send_message }>Send</button>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        username: state.authentication.user

    }
}

const mapDispatchToProps = disaptch => {
    return {
        getContentMessages: (content) => {
            disaptch(getContentMessages(content));
        },
        addMessages: (message, callback) => {
            disaptch(addMessages(message, callback));
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteMessage);