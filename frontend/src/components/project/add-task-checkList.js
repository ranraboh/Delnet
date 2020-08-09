import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addTask, getProjectTeam, updateTask, getTask } from '../../actions/projects.js'
import { projectPage } from '../../appconf.js';



class AddTask extends Component {
    constructor(props) {
        super(props);
        
        /* initialize user details */
        if (this.props.update != null) {
            this.state = {
                task: {
                    id: this.props.update.id,
                    executor_task: this.props.update.executor_task,
                    project: props.project_id.id,
                    task: this.props.update.task
                }
            }
        } else {
            this.state = {
                task: {
                    executor_task: null,
                    project: props.project_id.id,
                    task: ''
                }
            }
        }
        this.add_task_action = this.add_task_action.bind(this);
        this.on_change = this.on_change.bind(this);
        this.on_member_select = this.on_member_select.bind(this)
        if (this.props.team == null)
            this.props.getProjectTeam(this.state.task.project)
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
        let task = this.state.task
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
                            <select name="project_dataset" className="textbox-v1" onChange={ this.on_member_select }>
                                <option value="-">-----</option>
                                { team_options }
                            </select>   
                        </div>
                    </div>
                    <div class="form-row m-b-55">
                    <div className="name">:</div>
                        <div class="value">
                        <div class="col-sm">
                            <textarea rows="3" cols="100" value={ this.state.task.task } className="textbox-v1" onChange={ (e)=> this.on_change('task', e.target.value)} ></textarea>
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
