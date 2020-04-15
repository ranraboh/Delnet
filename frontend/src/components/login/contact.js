import React, { Component } from 'react';

class Contact extends Component {
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
                    <p>
                        <label className="contact-field">Name:</label>
                        <input type="text" className="form-textbox contact-textbox" />
                    </p>
                    <p>
                        <label className="contact-field">Email:</label>
                        <input type="text" className="form-textbox contact-textbox" />
                    </p>
                    <p>
                        <label className="contact-field">Subject:</label>
                        <input type="text" className="form-textbox contact-textbox" />
                    </p>
                    <p>
                        <textarea id="contact-message" rows="4" cols="50" className="form-textbox" 
                            placeholder="Enter your message"/>
                    </p>
                    <button id="contact-button" type="button" className="btn btn-success">Send Message</button>
                </div>
            </div>
        );
    }
}

export default Contact;