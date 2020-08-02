import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {changeComplete,getTask} from '../../actions/projects'

/*
topic=models.TextField(unique=False, blank=True, default='')
    user = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, default=None, on_delete=models.CASCADE)
    content=models.TextField(unique=False, blank=True, default='')
    date=models.DateField(auto_now_add=True)
    time=models.TimeField(auto_now_add=True,null=True, blank=True)   */

class checkList extends Component {
    constructor(props) {
        super(props)
        this.props.getTask(props.project)
        /* bind methods */
        this.toggleComplete=this.toggleComplete.bind(this);
    }
    toggleComplete(record){
        /*record.complete=!record.complete*/
        console.log("01:05")
        console.log(this.props.changeComplete)
        this.props.changeComplete({id:record.project}, () => {
            this.props.getTask(this.props.project)
        })
    }

    render() {
      
        if(this.props.tasks==null){console.log("no");
        return '';}
        return (
            <div  class="container">
                <h1 className="register-title">Show The checkList</h1>              
                {
                    Object.values(this.props.tasks).map(function (record) {
                        return (
                        <div className="row">
                            <div className="col-8">
                                <label id="gender-label" className=" col-form-label"><h4>the username that executor of the task:{record.executor_task}</h4></label> 
                                <div class="col-sm-6">
                                    <label id="gender-label" className=" col-form-label"><h4>The task is::{record.task}</h4></label> 
                                </div>
                               <div className="col-sm-6">
                                <label onClick={()=>this.toggleComplete(record)} class="container">Done 
                                <input type="checkbox"  checked={ record.complete==true } />
                                <span class="checkmark"></span>
                                </label>
                                </div>                                  
                                <div class="col-sm-6">
                                <label id="gender-label" className="col-form-label"><h4>Date:{record.date}</h4></label> 
                                </div>
                                <div class="col-sm-6">
                                <label id="gender-label" className=" col-form-label"><h4>Time:{record.time.substring(0,5)}</h4></label> 
                                </div>
                            </div>
                        </div>)
                    },this)
                } 
            
             </div>
        )
    }
}


const mapStateToProps = state => {
    console.log("show111111111111111111111111111111")
    return {
        tasks: state.projectReducer.tasks,
        project: state.projectReducer.project_selected.id,
        username: state.authentication.user
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getTask: (project) => {
            disaptch(getTask(project));
        },
        changeComplete: (project, callback) => {
            disaptch(changeComplete(project, callback));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(checkList);