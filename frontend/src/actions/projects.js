import axios from 'axios'
import { UPDATE_PROJECT , GET_USER_PROJECTS, CREATE_PROJECT, SELECT_PROJECT, GET_PROJECT_TEAM, ADD_MEMBER_TEAM } from './types.js'
import { activate_map_actiontype } from './datasets.js';

export const getUserProjects = (username) => dispatch => {
    axios.get('/api/projects/user/' + username).then(result => {
        console.log('result from server')
        console.log(result.data)
        dispatch({
            type: GET_USER_PROJECTS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}
export const createProject = (project, callback_function) => dispatch => {
    axios.post('/api/projects/', project).then(response => {
        dispatch({
            type: CREATE_PROJECT,
            payload: response.data
        })
        console.log(response);
    }).then(callback_function).catch(err => console.log(err))
}
export const deleteProject = (project_id) => dispatch => {
    axios.delete('/api/projects/' + project_id).then(response => {
        dispatch({
            type: DELETE_PROJECT,
            payload: response.data
        })
    }).catch(err => console.log(err))
}
export const selectProject = (project_id, callback_function) => dispatch => {
    if (!callback_function)
        callback_function = x => x
    axios.get('/api/projects/' + project_id).then(response => {
        /* save data in browser */
        window.localStorage.setItem('project-id', response.data.id)
        window.localStorage.setItem('project-name', response.data.project_name),
        window.localStorage.setItem('description', response.data.description),
        window.localStorage.setItem('result', response.data.result)
        window.localStorage.setItem('dataset', response.data.dataset)

        /* dispatch for store */
        dispatch({
            type: SELECT_PROJECT,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}
export const getProjectTeam = (project_id) => dispatch => {
    console.log("inside action")
    console.log(project_id)
    axios.get('/api/team/project/' + project_id).then(result => {
        console.log('result from server')
        console.log(result.data)
        dispatch({
            type: GET_PROJECT_TEAM,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

export const createMember = (member_record) => dispatch => {
    axios.post('/api/team/projects/', member_record).then(response => {
        console.log(response);
        dispatch({
            type: ADD_MEMBER_TEAM,
            payload: response.data
        })
    }).catch(err => console.log(err))
}

export const deleteMember = (member_record, callback_function) => dispatch => {
    axios.delete('/api/team/projects/' + member_record + '/').then(response => {
        console.log(response);
        return dispatch({
            type: ADD_MEMBER_TEAM,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}
export const updateProject = (project, callback_function) => dispatch => {
    axios.put('/api/projects/update', project).then(result => {
        result.data.request = project
        dispatch({
            type: UPDATE_PROJECT,
            payload: result.data
        })
    }).then(callback_function).catch(err => console.log(err));
}