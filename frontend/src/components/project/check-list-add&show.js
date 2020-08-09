import React, { Component } from 'react'
import AddTaskChecklist from './add-task-checkList.js';
import ShowCheckList from './show-check-list.js';
import { getTask } from '../../actions/projects'
import { connect } from 'react-redux';


class checklistAll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            all: this.props.tasks,
            done: null,
            undone: null,
            status: {
                show: 0,
                add: false
            }
        }
        this.props.getTask(props.project)
        this.add_handler = this.add_handler.bind(this);
        this.show_all = this.show_all.bind(this);
        this.show_done = this.show_done.bind(this);
        this.show_undone = this.show_undone.bind(this);
    }

    show_all() {
        this.setState({
            ...this.state,
            status: {
                ...this.state.status,
                show: 0
            }
        })
    }

    add_handler() {
        this.setState({
            ...this.state,
            status: {
                ...this.state.status,
                add: !this.state.status.add
            }
        })
    }

    show_undone() {
        let undone = []
        this.props.tasks.map((record) => {
            if (record.complete == false)
                undone.push(record)
        })
        this.setState({
            ...this.state,
            undone: undone,
            status: {
                ...this.state.status,
                show: 1
            }
        })
    }

    show_done() {
        let done = []
        this.props.tasks.map((record) => {
            if (record.complete == true)
                done.push(record)
        })
        this.setState({
            ...this.state,
            done: done,
            status: {
                ...this.state.status,
                show: 2
            }
        })
    }
    

    render() {
        if (this.props.tasks == null)
            return ''
        let data = this.props.tasks
        if (this.state.status.show == 1)
            data = this.state.undone
        if (this.state.status.show == 2)
            data = this.state.done
        return (
            <div className="section-in-main">
                <div className="header-section-v1 header-v1-purple">
                    <h1 id="projects-title">
                        Check List
                    </h1>
                    <h2 id="projects-intro">
                        section used to manage the projects tasks
                    </h2>
                </div>
                <ShowCheckList tasks={ data }/>   

                <div className="checklist-buttons">
                <button className="btn btn-outline-info btn-datasets" onClick={ this.show_all } >
                    <i className="fa fa-table"></i> Show All
                </button>
                <button className="btn btn-outline-success btn-datasets" onClick={ this.show_undone } >
                    <i className="fa fa-plus"></i> Show Undone
                </button>
                <button className="btn btn-outline-dark btn-datasets" onClick= { this.show_done } >
                    <i className="fa fa-search"></i> Show Done
                </button>   
                <button className="btn btn-outline-warning btn-datasets" onClick= { this.add_handler } >
                    <i className="fa fa-search"></i> Add Task
                </button> 
                </div>   
                {
                    (this.state.status.add || this.props.update != null)?<AddTaskChecklist/>:''
                }       
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.projectReducer.tasks,
        project: state.projectReducer.project_selected.id,
        username: state.authentication.user,
        update: state.projectReducer.update_state
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getTask: (project) => {
            disaptch(getTask(project));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(checklistAll);