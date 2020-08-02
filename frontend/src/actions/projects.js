import axios from 'axios'
import {CHANGE_TASK_COMPLETE,GET_CHECKLIST_NOT_DONE,GET_CHECKLIST_DONE,ADD_TASK, GET_TASK,GET_NOTIFICTION_PROJECT,ADD_NOTIFICTION_PROJECT,UPDATE_PROJECT , GET_USER_PROJECTS, CREATE_PROJECT, SELECT_PROJECT, GET_PROJECT_TEAM, ADD_MEMBER_TEAM, GET_PROJECT_STATICS } from './types.js'

/**
 * get set of all projects of given user
 * @param {*} username nickname of user
 */
export const getUserProjects = (username) => dispatch => {
    axios.get('/api/projects/user/' + username).then(result => {
        dispatch({
            type: GET_USER_PROJECTS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * create a new project and record it in database
 * @param {*} project information about project
 */
export const createProject = (project, callback_function) => dispatch => {
    axios.post('/api/projects/', project).then(response => {
        dispatch({
            type: CREATE_PROJECT,
            payload: response.data
        })
        console.log(response);
    }).then(callback_function).catch(err => console.log(err))
}

/**
 * delete existing project
 * @param {*} project_id 
 */
export const deleteProject = (project_id) => dispatch => {
    axios.delete('/api/projects/' + project_id).then(response => {
        dispatch({
            type: DELETE_PROJECT,
            payload: response.data
        })
    }).catch(err => console.log(err))
}

/**
 * selectProject triggered when user select to view specific project
 * @param {*} project_id identification number of selected project
 */
export const selectProject = (project_id, callback_function) => dispatch => {
    axios.get('/api/projects/' + project_id).then(response => {
        /* save data in browser storage */
        window.localStorage.setItem('project-id', response.data.id)
        window.localStorage.setItem('project-name', response.data.project_name)
        window.localStorage.setItem('description', response.data.description)
        window.localStorage.setItem('result', response.data.result)
        window.localStorage.setItem('dataset', response.data.dataset)
        window.localStorage.setItem('model_type', response.data.model_type)
        let type_description = ''
        if (response.data.model_type == 'c') {
            type_description = 'Automated Customizable Model'
        } else if (response.data.model_type == 'k') {
            type_description = 'Automated Known Model'
        } else {
            type_description = 'User Model'
        }
        window.localStorage.setItem('type_description', type_description)

        /* dispatch to store project data */
        dispatch({
            type: SELECT_PROJECT,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

/**
 * get a list of the team members working on given project
 * @param {*} project_id identification number of project
 */
export const getProjectTeam = (project_id) => dispatch => {
    axios.get('/api/team/project/' + project_id).then(result => {
        dispatch({
            type: GET_PROJECT_TEAM,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * insert new user\member into the project team
 * @param {*} member_record contains information about newly joined member 
 */
export const createMember = (member_record) => dispatch => {
    axios.post('/api/team/projects/', member_record).then(response => {
        console.log(response);
        dispatch({
            type: ADD_MEMBER_TEAM,
            payload: response.data
        })
    }).catch(err => console.log(err))
}

/**
 * delete a member from the project team
 * @param {*} member_record contains information about this member
 */
export const deleteMember = (member_record, callback_function) => dispatch => {
    axios.delete('/api/team/projects/' + member_record + '/').then(response => {
        console.log(response);
        return dispatch({
            type: ADD_MEMBER_TEAM,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

/**
 * update the credentials of existing project
 * @param {*} project new data of project
 */
export const updateProject = (project, callback_function) => dispatch => {
    axios.put('/api/projects/update', project).then(result => {
        result.data.request = project
        dispatch({
            type: UPDATE_PROJECT,
            payload: result.data
        })
    }).then(callback_function).catch(err => console.log(err));
}
export const getProjectStatics = (project_id, callback_function) => dispatch => {
    axios.get('/api/project/' + project_id + '/statics').then(result => {
        dispatch({
            type: GET_PROJECT_STATICS,
            payload: result.data
        })
    }).then(callback_function).catch(err => console.log(err));
}


/**
 * get project statics-----------------------------------------------------------------------------------------
 * @param {*} project_id identification number of selected project
 */
export const getTaskComplete = (project_id, callback_function) => dispatch => {
    axios.get('/api/projectCheckList/complete/'+project_id).then(result => {
        dispatch({
            type: GET_CHECKLIST_DONE,
            payload: result.data
        })
    }).then(callback_function).catch(err => console.log(err));
}

export const getTaskNotComplete = (project_id, callback_function) => dispatch => {
    axios.get('/api/projectCheckList/notComplete/'+project_id).then(result => {
        dispatch({
            type: GET_CHECKLIST_NOT_DONE,
            payload: result.data
        })
    }).then(callback_function).catch(err => console.log(err));
}

export const changeComplete = (project_id, callback_function) => dispatch => {
    console.log("1:21")
    console.log(project_id)
    axios.post('/api/checkList/changeComplete', project_id).then(response => {
        dispatch({
            type: CHANGE_TASK_COMPLETE,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

/*----------------------------------------------------------------------------*/

export const addNotificationpProject = (notification, callback_function) => dispatch => {
    console.log("now1")
        console.log("response")
    axios.post('/api/notifications/projects/', notification).then(response => {
        console.log("now2")
        console.log(response)
        dispatch({
            type: ADD_NOTIFICTION_PROJECT,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}



export const getNotification = (project_id, callback_function) => dispatch => {
    console.log("arrive")
    axios.get('/api/projects/header/'+ project_id).then(response => {
        console.log(response)
        dispatch({
            type: GET_NOTIFICTION_PROJECT,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

export const getTask = (project_id, callback_function) => dispatch => {
    console.log("rannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn29")
    axios.get('/api/project/'+project_id+'/checkList').then(response => {
        console.log("rannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn29")

        console.log(response)
        dispatch({
            type: GET_TASK,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}


export const addTask = (project_id, callback_function) => dispatch => {
    console.log("addTask-FrontAction")
        console.log("response")
    axios.post('/api/checkList/', project_id).then(response => {
        console.log("FrontAction2")
        console.log(response)
        dispatch({
            type: ADD_TASK,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}