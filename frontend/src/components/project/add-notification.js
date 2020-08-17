import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addNotificationpProject } from '../../actions/projects.js'
import { getUserDetails } from '../../actions/users.js'
import { ValidateEmail, allLetter, typeOfNaN, lengthOfString,check_itsnot_empty } from "../../actions/validation";


class AddNotification extends Component {
    constructor(props) {
        super(props);
        /* initialize user details */
        this.state = {
            errors: {
                topic: '',
                content: ''                
            },
            notification: {
                topic: '',
				user: this.props.username,
				project: props.project_id.id,
                content: '',
                image: this.props.image
            }
        }
        this.send_action = this.send_action.bind(this);
        this.on_change = this.on_change.bind(this);
        this.restartErrors=this.restartErrors.bind(this);
        if (this.state.notification.image == undefined)
            this.props.getUserDetails(this.props.username)
    }
    restartErrors(errors){
        errors['topic'] =''
        errors['content'] =''
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let notification = this.state.notification;
        notification['image'] = nextProps.image
        this.setState({
            ...this.state,
            notification
        })
    }
  
    on_change(field, value) {
        let notification = this.state.notification;
        notification[field] = value;
        this.setState({
            ...this.state,
            notification
        })
	
    }

    send_action(e) {
        e.preventDefault();
       
        let errors = this.state.errors
        let notification = this.state.notification;
        this.restartErrors(errors);
        var bool=false
        if (!check_itsnot_empty(notification['topic'])) {
            errors['topic'] ="the topic is empy ,enter topic please."
            console.log(errors['topic'])
            bool=true
        }
        if(!lengthOfString(notification['topic'],200)){
            errors['topic'] ="It is possible to write up to 200 words, please be careful."
            console.log(errors['topic'])
            bool=true
        }
        if (!check_itsnot_empty(notification['content'])) {
            errors['content'] ="the content  is empy ,enter please."
            bool=true
        }
        if(!lengthOfString(notification['content'],500)){
            errors['content'] ="It is possible to write up to 500 words, please be careful."
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



      
        this.props.addNotificationpProject(this.state.notification, () => {
            this.setState({
                ...this.state,
                notification: {
                    topic: '',
                    user: this.props.username,
                    project: this.props.project_id.id,
                    content: ''
                }
            }, () => {
                alert('the notification has been sent');
            })
        })
         
        
    }

    render() {
        return (
            <div className="section-in-main">
                <div className="header-section-v1 header-v1-pink">
                    <h1 id="projects-title">
                        Add Notification
                    </h1>
                    <h2 id="projects-intro">
                        send notification to your project team
                    </h2>
                </div>
            <div class="card-body">
                <form method="POST">
                    <div class="form-row m-b-55">
                    <div className="name">Topic:</div>
                        <div class="value">
                             <div class="col-sm">
                            <input class={(this.state.errors.topic == '')? 'input--style-5' : 'input--style-5 form-control is-invalid'} 
                            type="text" name="topic" value={ this.state.notification.topic }
                                onChange={ (e) => this.on_change('topic', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.topic }
                                </div>                   
                            </div>
                        </div>
                    </div>
                    <div class="form-row m-b-55">
                    <div className="name">Content:</div>
                        <div class="value">
                            <div class="col-sm">
                            <textarea class={(this.state.errors.content == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                             rows="10" cols="50" name="content" value={ this.state.notification.content   }
                             onChange={ (e) => this.on_change('content', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.content }
                                </div>                      
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <button class="btn register-button" onClick={ this.send_action }>Send</button>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        image: state.userReducer.image,
        project_id: state.projectReducer.project_selected,
    }
}

const mapDispatchToProps = disaptch => {
    return {
        addNotificationpProject: (notification, callback) => {
            disaptch(addNotificationpProject(notification, callback));
        },
        getUserDetails: (username) => {
            disaptch(getUserDetails(username))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNotification);
