import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addTask } from '../../actions/projects.js'
import { projectPage } from '../../appconf.js';



class AddTask extends Component {
    constructor(props) {

        super(props);
        
        /* initialize user details */
        this.state = {
            task: {
				executor_task: this.props.username,
				project: props.project_id.id,
                task: ''
            }
        }
        this.add_task_action = this.add_task_action.bind(this);
        this.on_change = this.on_change.bind(this);
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
        let task = this.state.task;
            this.props.addTask(this.state.task, () => {
                alert(' the user add task notifcation successfully');
              
                window.location = projectPage;

               
            })
         
        
    }

    render() {
        return (
            <div class="card-body">
                <h1 className="register-title">Add Task</h1>
                <form method="POST">
                    <div class="form-row m-b-55">
                    <div className="name">the username that executor of the task:</div>
                        <div class="value">
                             <div class="col-sm">
                            <input value={ this.state.task.executor_task } className="textbox-v1" onChange={ (e)=> this.on_change('executor_task', e.target.value)} ></input>
                        </div>
                        </div>
                    </div>
                    <div class="form-row m-b-55">
                    <div className="name">content of the task:</div>
                        <div class="value">
                        <div class="col-sm">
                            <input value={ this.state.task.task } className="textbox-v1" onChange={ (e)=> this.on_change('task', e.target.value)} ></input>
                        </div>
                        </div>
                    </div>
                    
                    <div>
                        <button class="btn register-button" onClick={ this.add_task_action }>Add Task</button>
                    </div>
                </form>
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
        addTask: (task, callback) => {
            console.log(callback)
            
            disaptch(addTask(task, callback));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
