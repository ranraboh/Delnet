import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {getNotification} from '../../actions/projects'

class ShowNotification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            page_size: 6
        }
        this.props.getNotification(props.project)
        /* bind methods */
        this.more_click = this.more_click.bind(this);
    }

    more_click() {
        this.setState({
            ...this.state,
            page: this.state.page + 1
        })
    }
    
    render() {
        if(this.props.show_notification_project==null)
            return ''
        if (this.props.show_notification_project.length == 0) {
            return <div className="section-in-main">
                <div className="header-section-v1 header-v1-blue">
                    <h1 id="projects-title">
                        Show Notifications
                    </h1>
                    <h2 id="projects-intro">
                        show project notifications
                    </h2>
                </div>
                <div className="message-text text-blue">
                    There are no notifications for this project
                </div>
            </div>
        }
        return (
            <div className="section-in-main">
                <div className="header-section-v1 header-v1-blue">
                    <h1 id="projects-title">
                        Show Notifications
                    </h1>
                    <h2 id="projects-intro">
                        show project notifications
                    </h2>
                </div>
            <div  class="container">              
                {        
                    Object.values(this.props.show_notification_project.slice(0, this.state.page * this.state.page_size)).map(function (record) {
                        return (
                        <div className="row notification-record">
                            <div class="col-2">
                                <img className="team-user-image" src={ record.image }></img>
                            </div>
                            <div className="col-3">
                                <h4 className="notifications-text">User: {record.user}</h4>
                                <h4 className="notifications-text">{record.date}</h4>
                                <h4 className="notifications-text">{ record.time.substring(0,8) }</h4>
                            </div>
                            <div className="col-7">
                                <h4 className="notifications-text text-bold">Topic: {record.topic}</h4>
                                <h4 className="notifications-text">{ record.content }</h4>
                            </div>
                        </div>)
                    },this)
                } 
                            <a id="projects_button" className="button-v2" onClick={ this.more_click }>
                                <svg class="icon-arrow before">
                                    <use href="#arrow"></use>
                                </svg>
                                <span class="label">More</span>
                                <svg class="icon-arrow after">
                                    <use href="#arrow"></use>
                                </svg>
                            </a>
                            <svg>
                            <defs>
                                <symbol id="arrow" viewBox="0 0 35 15">
                                <title>Arrow</title>
                                <path d="M27.172 5L25 2.828 27.828 0 34.9 7.071l-7.07 7.071L25 11.314 27.314 9H0V5h27.172z "/>
                                </symbol>
                            </defs>
                            </svg>
            
             </div>
             
                </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        show_notification_project: state.projectReducer.notifications,
        project: state.projectReducer.project_selected.id,
        username: state.authentication.user
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getNotification: (project) => {
            disaptch(getNotification(project));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowNotification);