import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addNotificationpProject } from '../../actions/projects.js'
import { projectPage } from '../../appconf.js';



class AddNotification extends Component {
    constructor(props) {

        super(props);
        
        /* initialize user details */
        this.state = {
            notification: {
                topic: '',
				user: this.props.username,
				project: props.project_id.id,
                content: ''
            }
        }
        this.send_action = this.send_action.bind(this);
        this.on_change = this.on_change.bind(this);
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
        let notification = this.state.notification;
            this.props.addNotificationpProject(this.state.notification, () => {
                alert(' the user send notifcation successfully');
              
                window.location = projectPage;

               
            })
         
        
    }

    render() {
        return (
            <div className="section-in-main">
            <div class="card-body">
                <h1 className="register-title">Add Notification</h1>
                <form method="POST">
                    <div class="form-row m-b-55">
                    <div className="name">Topic:</div>
                        <div class="value">
                             <div class="col-sm">
                            <input value={ this.state.notification.topic } className="textbox-v1" onChange={ (e)=> this.on_change('topic', e.target.value)} ></input>
                        </div>
                        </div>
                    </div>
                    <div class="form-row m-b-55">
                    <div className="name">content:</div>
                        <div class="value">
                             <div class="col-sm">
                            <textarea  rows="10" cols="50"  value={ this.state.notification.content } className="textbox-v1" onChange={ (e)=> this.on_change('content', e.target.value)} ></textarea>
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
        
        project_id: state.projectReducer.project_selected
        
    }
}

const mapDispatchToProps = disaptch => {
    return {
        addNotificationpProject: (notification, callback) => {
            console.log(callback)
            console.log(notification)
            disaptch(addNotificationpProject(notification, callback));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNotification);
