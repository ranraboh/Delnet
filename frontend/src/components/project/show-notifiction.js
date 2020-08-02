import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {getNotification} from '../../actions/projects'

/*
topic=models.TextField(unique=False, blank=True, default='')
    user = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, default=None, on_delete=models.CASCADE)
    content=models.TextField(unique=False, blank=True, default='')
    date=models.DateField(auto_now_add=True)
    time=models.TimeField(auto_now_add=True,null=True, blank=True)   */

class ShowNotification extends Component {
    constructor(props) {
        console.log("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
        super(props)
        this.props.getNotification(props.project)
        /* bind methods */
    }
    

 
   
    render() {
        if(this.props.show_notification_project==null)return ''
        return (
            <div className="section-in-main">
            <div  class="container">              
                {        
                    Object.values(this.props.show_notification_project).map(function (record) {
                        return (
                        <div className="row">
                            <div className="col-4">
                                <label id="gender-label" className=" col-form-label"><h4>User:{record.user}</h4></label> 
                                <div class="col-sm-6">
                                <label id="gender-label" className=" col-form-label"><h4>Image</h4></label> 
                                        <img src={ record.image } className="personal-image" />
                                </div>
                            </div>
                            <div className="col-8">
                            <label id="gender-label" className=" col-form-label"><h4>Topic:{record.topic}</h4></label> 
                                <div class="col-sm-6">
                                <label id="gender-label" className=" col-form-label"><h4>Content:{record.content}</h4></label> 
                                </div>
                                <div class="col-sm-6">
                                <label id="gender-label" className="col-form-label"><h4>Date:{record.date}</h4></label> 
                                </div>
                                <div class="col-sm-6">
                                <label id="gender-label" className=" col-form-label"><h4>Time:{record.time.substring(0,5)}</h4></label> 
                                </div>
                            </div>
                        </div>)
                    })
                } 
            
             </div>
                </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        show_notification_project: state.projectReducer.show_notification_project,
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