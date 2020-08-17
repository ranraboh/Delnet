import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addTask, getProjectTeam, updateTask, getTask } from '../../actions/projects.js'
import { projectPage } from '../../appconf.js';
import { ValidateEmail, allLetter, typeOfNaN, lengthOfString,check_itsnot_empty } from "../../actions/validation";



class AddTask extends Component {
    constructor(props) {
        super(props);
        
        /* initialize user details */
        if (this.props.update != null) {
            this.state = {
                errors: {
                    executor_task: '',
                    task: ''                
                },
                task: {
                    id: this.props.update.id,
                    executor_task: this.props.update.executor_task,
                    project: props.project_id.id,
                    task: this.props.update.task
                }
            }
        } else {
            this.state = {
                errors: {
                    executor_task: '',
                    task: ''                
                },
                task: {
                    executor_task: null,
                    project: props.project_id.id,
                    task: ''
                }
            }
        }
        this.restartErrors=this.restartErrors.bind(this);
        this.add_task_action = this.add_task_action.bind(this);
        this.on_change = this.on_change.bind(this);
        this.on_member_select = this.on_member_select.bind(this)
        if (this.props.team == null)
            this.props.getProjectTeam(this.state.task.project)
    }
    restartErrors(errors){
        errors['executor_task'] =''
        errors['task'] =''
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.update != null) {
            this.setState({
                task: {
                    id: nextProps.update.id,
                    executor_task: nextProps.update.executor_task,
                    project: nextProps.project_id.id,
                    task: nextProps.update.task
                }
            })
        } else {
            this.setState({
                task: {
                    executor_task: null,
                    project: nextProps.project_id.id,
                    task: ''
                }
            })
        }
    }

    on_member_select(e) {
        let value = e.target.value
        if (value == "-")
            value = null
        this.setState({
            ...this.state,
            task : {
                ...this.state.task,
                executor_task: value
            }
        })
    }

    on_change(field, value) {
        let task = this.state.task;
        task[field] = value;

        this.setState({
            ...this.state,
            task
        })
	
    }


    add_task_action(e) {

      
        e.preventDefault();
        let errors = this.state.errors
       // let user = this.state.dataset;
        let task = this.state.task
        this.restartErrors(errors);
        var bool=false
        if ((!check_itsnot_empty(task['executor_task']))) {
            console.log("shiran234")
            errors['executor_task'] ="Please fill in the executor task "
            console.log(errors['executor_task'])
            bool=true
        }
         
        
        if ((!check_itsnot_empty(task['task']))) {
            errors['task'] ="Please fill in the task content."
            console.log(errors['task'])
            bool=true

        }
         if(!lengthOfString(task['task'],400)){
                errors['task'] ="It is possible to write up to 400 words, please be careful"
                console.log(errors['task'])
                bool=true

            }
            this.setState({
                ...this.state,
                errors
            })
            if(bool){
                return
            }
       
        task.username = this.props.username
        if (this.props.update == null) {
            this.props.addTask(task, () => {
                alert('task has been inserted successfully')
            })
        } else {
            this.props.updateTask(task, () => {
                alert('task has been modified successfully')
                this.props.getTask(this.props.project_id.id)
            })
        }
    }

    render() {
        let team_options = ''
        if (this.props.team != null) {
            team_options = (
                this.props.team.map((record) =>
                    <option value={ record.user } selected={ this.state.task.executor_task == record.user } >{ record.user }</option>
                )
            )
        }
        return (
            <div class="card-body">
                <form method="POST">
                    <div class="form-row m-b-55">
                    <div className="name">task assigned to: </div>
                        <div class="value">
                            <select class={(this.state.errors.executor_task == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                              name="executor_task" value={ this.state.task.executor_task  }
                             onChange={ (e) => this.on_change('executor_task', e.target.value) }>
                                 <option value="-">-----</option>
                                { team_options }</select>
                                <div class="invalid-feedback">
                                    { this.state.errors.executor_task }
                                </div>
                        </div> 

                    </div>
                    <div class="form-row m-b-55">
                    <div className="name">Task content:</div>
                        <div class="value">
                        
                        <div class="col-sm">
                            <textarea class={(this.state.errors.task == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                             rows="3" cols="100" name="task" value={  this.state.task.task   }
                             onChange={ (e) => this.on_change('task', e.target.value) }
                             placeholder="Enter task content please" />
                                <div class="invalid-feedback">
                                    { this.state.errors.task }
                                </div>
                        </div>
                        </div>
                        </div>

                    
                    <div>
                        <button class="btn register-button" onClick={ this.add_task_action }>{ (this.props.update == null)? 'Add Task' : 'Update Task' }</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        project_id: state.projectReducer.project_selected,
        team: state.projectReducer.project_selected.team,
        update: state.projectReducer.update_state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTask: (task, callback) => {
            dispatch(addTask(task, callback));
        },
        getProjectTeam: (id) => {
            dispatch(getProjectTeam(id))
        },
        updateTask: (task, callback) => {
            dispatch(updateTask(task, callback))
        },
        getTask: (project) => {
            dispatch(getTask(project));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
