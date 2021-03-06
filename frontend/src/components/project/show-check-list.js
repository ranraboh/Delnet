import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {changeComplete,getTask, updateState, abortUpdateState} from '../../actions/projects'

class checkList extends Component {
    constructor(props) {
        super(props)
        /* bind methods */
        this.toggleComplete=this.toggleComplete.bind(this);
        this.update_handler = this.update_handler.bind(this)
    }

    update_handler(record) {
        this.props.updateState(record)
    }

    toggleComplete(record){
        if (this.props.premissions < 3) {
            alert("you are not authorized to perform this action")
            return
        }
        this.props.changeComplete({id:record.id, username: this.props.username}, () => {
            this.props.getTask(this.props.project)
        })
    }

    render() {
        if(this.props.tasks==null)
            return ''
        if (this.props.tasks.length == 0) {
            return <h4 className="message-text text-blue">No Tasks</h4>
        }
        return (
            <table className="table">
                <thead>
                    <tr className="table-v1-th">
                        <th className="task-td">Task</th>
                        <th>Date</th>
                        <th>Executer</th>
                        <th>Done</th>
                        {
                            (this.props.premissions < 3)?'':
                            <th>Update</th>
                        }
                    </tr>
                </thead>
                {
                    Object.values(this.props.tasks).map(function (record) {
                        return (
                                <tbody>
                                    {
                                        <tr className="table-v1-row-nonhover">
                                            <td className="task-td">{ record.task }</td>
                                            <td>{ record.date }</td>
                                            <td>{ (record.executor_task==null)?'-': record.executor_task }</td>
                                            <td>
                                                <label onClick={()=>this.toggleComplete(record)} class="container"> 
                                                    <input type="checkbox"  checked={ record.complete==true } />
                                                    <span class="checkmark"></span>
                                                </label>    
                                            </td>   
                                            {
                                                (this.props.premissions < 3)?'':
                                                <td>
                                                    <button type="button" class="btn btn-danger" onClick={ () => this.update_handler(record) }>Update</button>
                                                </td>
                                            }                                         
                                        </tr>
                                    }
                                </tbody>)
                        },this)
                    } 
                    </table>
        )
    }
}


const mapStateToProps = state => {
    return {
        project: state.projectReducer.project_selected.id,
        username: state.authentication.user,
        premissions: state.projectReducer.project_selected.premissions
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getTask: (project) => {
            disaptch(getTask(project));
        },
        changeComplete: (project, callback) => {
            disaptch(changeComplete(project, callback));
        },
        abortUpdateState: () => {
            disaptch(abortUpdateState())
        },
        updateState: (task) => {
            disaptch(updateState(task))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(checkList);