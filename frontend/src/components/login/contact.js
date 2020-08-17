import React, { Component } from 'react';
import { sendMail } from '../../actions/users'
import { connect } from 'react-redux';
import {validateEmail,checkURL,isFileImage,check_passward_theSame, check_password ,
    allLetter, typeOfNaN, lengthOfString,check_itsnot_empty } from "../../actions/validation";

class Contact extends Component {
    constructor(props) {
        super(props);
        
        /* initialize user details */
        this.state = {
            errors: {
                name: '',
                email: '',
                topic: '',
                content: ''
                
            },
            user: {
                name: '',
                content: '',
                topic: '',
                email: ''
            }
        }
        this.register_action = this.register_action.bind(this);
        this.on_change = this.on_change.bind(this);
        this.restartErrors=this.restartErrors.bind(this);
        this.reset_handler = this.reset_handler.bind(this);
    }

    reset_handler() {
        this.setState({
            ...this.state,
            user: {
                name: '',
                content: '',
                topic: '',
                email: ''
            }
        })
    }

    on_change(field, value) {
        let user = this.state.user;
        user[field] = value;

        this.setState({
            user
        })
    }
    restartErrors(errors){
        errors['name'] =''
        errors['email'] =''
        errors['topic'] =''
        errors['content'] =''
    }
    register_action(e) {
        e.preventDefault();
        let errors = this.state.errors
        let user = this.state.user;
        this.restartErrors(errors);
        var bool=false
        if (!check_itsnot_empty(user['name'])) {
            errors['name'] ="Please fill in your name"
            bool=true
        }
        if(allLetter(user['name'])){
            errors['name'] ="Numbers must not contain only letters"
            bool=true
        }
        if (!check_itsnot_empty(user['topic'])) {
            errors['topic'] ="Please fill in a topic"
            bool=true
        }
        if (!check_itsnot_empty(user['content'])) {
            errors['content'] ="Please fill in a content"
            bool=true
        }
        
        if(!validateEmail(user['email'])){
            errors['email']="There is an error in the email address,fix it please."
            bool=true
        }
        if(!check_itsnot_empty(user['email'])){
            errors['email']="Please fill in an email"
            bool=true
        }
        if (!lengthOfString(user['name'], 30)) {
            errors['name'] = "It is possible to write up to 30 words, please be careful "
            bool = true
        }
        if (!lengthOfString(user['topic'], 100)) {
            errors['topic'] = "It is possible to write up to 100 words, please be careful "
            bool = true
        }
        if (!lengthOfString(user['content'], 300)) {
            errors['message'] = "It is possible to write up to 300 words, please be careful "
            bool = true
        }
        this.setState({
            ...this.state,
            errors
        })
        if(bool){
            return
        }
        this.props.sendMail(this.state.user, () => {
            this.reset_handler()
            alert('the message was sent successfully');
        })
    }

    render() {
        return (
            <div id="contact">
                <h1 className="prefix-title">Contact</h1>
                <h1 className="postfix-title"> Us</h1>
                <div id="services-title-seperator">
                    <hr className="seperator" />
                </div>   
                <h5 id="contact-subtitle">
                    for any problem, questions or suggestion of improvement you can contact
                    with us and we will do our utmost to respond as soon as possible.
                </h5>  
                <div id="contact-form">
                <div className="row row-form row-contact-form">
                    <div className="col-2">
                        <p className="contact-field">Name:</p>
                    </div> 
                    <div className="col-6">
                        <div class="value">
                            <input class={(this.state.errors.name == '')? 'form-textbox contact-textbox' : 'form-textbox contact-textbox form-control is-invalid'} 
                            type="text" name="name" value={ this.state.user.name }
                                onChange={ (e) => this.on_change('name', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.name }
                                </div>
                        </div>

                    </div>
                </div>
                <div className="row row-form row-contact-form">
                    <div className="col-2">
                        <p className="contact-field">Email:</p>
                    </div> 
                    <div className="col-6">
                        <div class="value">
                            <input class={(this.state.errors.email == '')? 'form-textbox contact-textbox' : 'form-textbox contact-textbox form-control is-invalid'} 
                            type="text" name="email" value={ this.state.user.email }
                                onChange={ (e) => this.on_change('email', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.email }
                                </div>
                        </div>

                    </div>
                </div>
                <div className="row row-form row-contact-form">
                    <div className="col-2">
                        <p className="contact-field">Subject:</p>
                    </div> 
                    <div className="col-6">
                        <div class="value">
                            <input class={(this.state.errors.topic == '')? 'form-textbox contact-textbox' : 'form-textbox contact-textbox form-control is-invalid'} 
                            type="text" name="topic" value={ this.state.user.topic }
                                onChange={ (e) => this.on_change('topic', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.topic }
                                </div>
                        </div>

                    </div>
                </div>
                    <div className="col-6">
                        <div class="value">
                            <textarea id="contact-message" class={(this.state.errors.content == '')? 'form-textbox' : 'form-textbox form-control is-invalid'} 
                             rows="4" cols="50" name="content" value={ this.state.user.content  }
                             onChange={ (e) => this.on_change('content', e.target.value) }
                             placeholder="Enter your message" />
                                <div class="invalid-feedback">
                                    { this.state.errors.content }
                                </div>
                        </div>
                    </div>
                    <div>
                        <button id="contact-button" className="btn btn-success" onClick={ this.register_action }>Send Message</button>
                    </div>
            </div>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendMail: (email, callback) => {
            dispatch(sendMail(email, callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);