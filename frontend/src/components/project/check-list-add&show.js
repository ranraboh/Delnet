import React, { Component } from 'react'
import AddTaskChecklist from './add-task-checkList.js';
import ShowCheckList from './show-check-list.js';



class checklistAll extends Component {
    render() {
        return (
            <div id="personal-details">
                    <AddTaskChecklist/>
                    <ShowCheckList/>               
            </div>
        )
    }
}

export default checklistAll;