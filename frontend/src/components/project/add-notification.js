import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addNotificationpProject } from '../../actions/projects.js'
import { getUserDetails } from '../../actions/users.js'

class AddNotification extends Component {
    constructor(props) {
        super(props);
        /* initialize user details */
        this.state = {
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

        if (this.state.notification.image == undefined)
            this.props.getUserDetails(this.props.username)
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
                                <input value={ this.state.notification.topic } className="textbox-v1" onChange={ (e)=> this.on_change('topic', e.target.value)} ></input>
                            </div>
                        </div>
                    </div>
                    <div class="form-row m-b-55">
                    <div className="name">Content:</div>
                        <div class="value">
                            <div class="col-sm">
                                <textarea rows="10" cols="50"  value={ this.state.notification.content } className="textbox-v1" onChange={ (e)=> this.on_change('content', e.target.value)} ></textarea>
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
