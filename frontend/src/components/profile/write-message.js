import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {getContentMessages,addMessages} from '../../actions/users'
import { profilePage } from '../../appconf.js';
import { ValidateEmail, allLetter, typeOfNaN, lengthOfString,check_itsnot_empty } from "../../actions/validation";


/*getContentMessages*/
class WriteMessage extends Component {
    constructor(props) {
        super(props)
          /* initialize user details */
          this.state = {
            errors: {
                receiver: '',
                content: ''                
            },
            message: {
                sender:this.props.username,
                receiver: '',
				content: '',
				
            }
        }
        this.send_message = this.send_message.bind(this);
        this.on_change = this.on_change.bind(this);
        this.restartErrors=this.restartErrors.bind(this);

    }
    restartErrors(errors){
        errors['receiver'] =''
        errors['content'] =''
    }
    /*need to do check before send message ' like if the username is good ..*/
    send_message(e) {
        e.preventDefault();
       
        let errors = this.state.errors
        let message = this.state.message;
        this.restartErrors(errors);
        var bool=false
        if (!check_itsnot_empty(message['receiver'])) {
            errors['receiver'] ="the name of the receiver is empy ,enter name please."
            bool=true
        }
        if (!check_itsnot_empty(message['content'])) {
            errors['content'] ="the content  is empy ,enter please."
            bool=true
        }
        if(!lengthOfString(message['content'],900)){
            errors['content'] ="It is possible to write up to 900 words, please be careful."
            console.log(errors['content'])
            bool=true
        }
        
        this.setState({
            ...this.state,
            errors
        })
       
    
        if(bool){
            console.log("shiran1937-----------------------------------------------------------------------------------")
            return
        }

        
        console.log("sendMessage16");
        console.log(this.state.message);
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
                    <div className="name">The username you want to send a message to:  </div>
                        <div class="value">
                            <input class={(this.state.errors.receiver == '')? 'input--style-5' : 'input--style-5 form-control is-invalid'} 
                            type="text" name="receiver" value={ this.state.message.receiver }
                                onChange={ (e) => this.on_change('receiver', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.receiver }
                                </div>
                        </div>
                    </div>
                    <div className="form-row m-b">
                    <div className="name">Write your message:  </div>
                        <div class="value">
                            <textarea class={(this.state.errors.content == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                             rows="10" cols="70" name="content" value={ this.state.message.content  }
                             onChange={ (e) => this.on_change('content', e.target.value) }
                             placeholder="Please write the content of the message" />
                                <div class="invalid-feedback">
                                    { this.state.errors.content }
                                </div>
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