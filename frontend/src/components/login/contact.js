import React, { Component } from 'react';
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
                subject: '',
                message: ''
                
            },
            user: {
                name: '',
                email: '',
                subject: '',
                message: ''
            }
        }
        this.register_action = this.register_action.bind(this);
        this.on_change = this.on_change.bind(this);
        
        
         //this.ValidateEmail=this.ValidateEmail.bind(this);
         //this.allLetter=this.allLetter.bind(this);
         //this.check_password=this.check_password.bind(this);
         //this.check_passward_theSame=this.check_passward_theSame.bind(this);
        // this.check_itsnot_empty=this.check_itsnot_empty.bind(this);
        // this.isFileImage=this.isFileImage.bind(this);
         this.restartErrors=this.restartErrors.bind(this);

    }
    on_change(field, value) {
        console.log('on change')
        let user = this.state.user;
        user[field] = value;

        this.setState({
            user
        })
    }
    restartErrors(errors){
        errors['name'] =''
        errors['email'] =''
        errors['subject'] =''
        errors['message'] =''
    }
    register_action(e) {
        e.preventDefault();
        let errors = this.state.errors
        let user = this.state.user;
        this.restartErrors(errors);
        var bool=false
        if (!check_itsnot_empty(user['name'])) {
            errors['name'] ="the name is empy ,enter name."
            bool=true
        }
        if(allLetter(user['name'])){
            errors['name'] ="Numbers must not contain only letters"
            bool=true
        }
        if (!check_itsnot_empty(user['subject'])) {
            errors['subject'] ="your first name is empy ,enter name."
            bool=true
        }
        if (!check_itsnot_empty(user['message'])) {
            errors['message'] ="your last name is empy ,enter name."
            bool=true
        }
        
        if(!validateEmail(user['email'])){
            errors['email']="There is an error in the email address,fix it please."
            bool=true

        }
        if(!check_itsnot_empty(user['email'])){
            errors['email']="your email is empy ,enter email."
            bool=true
        }
        if (!lengthOfString(user['name'], 30)) {
            errors['name'] = "It is possible to write up to 30 words, please be careful "
            console.log(errors['name'])
            bool = true

        }
        if (!lengthOfString(user['subject'], 100)) {
            errors['subject'] = "It is possible to write up to 100 words, please be careful "
            console.log(errors['subject'])
            bool = true

        }
        if (!lengthOfString(user['message'], 300)) {
            errors['message'] = "It is possible to write up to 300 words, please be careful "
            console.log(errors['message'])
            bool = true

        }


        this.setState({
            ...this.state,
            errors
        })
       
    
        if(bool){
            console.log("bool its true-----------------------------------------------------------------------------------")
            return
        }

        //    window.location = homepage + '/login';
           // this.props.createUser(this.state.user, () => {
                alert('the message was sent successfully');
            //    window.location = homepage + '/login';
           // })
        

    
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
                <div className="row row-form">
                    <div className="col-2">
                        <p className="contact-field">Name:</p>
                    </div> 
                    <div className="col-6">
                        <div class="value">
                            <input class={(this.state.errors.name == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                            type="text" name="name" value={ this.state.user.name }
                                onChange={ (e) => this.on_change('name', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.name }
                                </div>
                        </div>

                    </div>
                </div>
                <div className="row row-form">
                    <div className="col-2">
                        <p className="contact-field">Email:</p>
                    </div> 
                    <div className="col-6">
                        <div class="value">
                            <input class={(this.state.errors.email == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                            type="text" name="email" value={ this.state.user.email }
                                onChange={ (e) => this.on_change('email', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.email }
                                </div>
                        </div>

                    </div>
                </div>
                <div className="row row-form">
                    <div className="col-2">
                        <p className="contact-field">Subject:</p>
                    </div> 
                    <div className="col-6">
                        <div class="value">
                            <input class={(this.state.errors.subject == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                            type="text" name="subject" value={ this.state.user.subject }
                                onChange={ (e) => this.on_change('subject', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.subject }
                                </div>
                        </div>

                    </div>
                </div>
                    <div className="col-6">
                        <div class="value">
                            <textarea class={(this.state.errors.message == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                             rows="4" cols="50" name="message" value={ this.state.user.message  }
                             onChange={ (e) => this.on_change('message', e.target.value) }
                             placeholder="Enter your message" />
                                <div class="invalid-feedback">
                                    { this.state.errors.message }
                                </div>
                        </div>
                    </div>
                    <div>
                        <button class="btn register-button" onClick={ this.register_action }>Send Messae</button>
                    </div>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {}
}
//?
const mapDispatchToProps = dispatch => {
    return {}
}

//export default connect(mapStateToProps, mapDispatchToProps)(Contact);

   
export default Contact;