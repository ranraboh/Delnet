import { UPLOAD_MODEL_FILES, GET_PROJECT_FILES, SELECT_FILE, GET_FILE_CONTENT, UPDATE_FILE_CONTENT } from '../types.js'
import axios from 'axios'

/**
 * action which uploads set of files to the server
 * @param {*} update_object contains information about the request such as user, files-list
 */
export const uploadFiles = (update_object, callback_function) => dispatch => {
    let formData = new FormData();
    let files_quantity = update_object.files.length;
    for (var i = 0; i < files_quantity; i++)
        formData.append(i, update_object.files[i]);
    formData.append('project', update_object.project);
    formData.append('user', update_object.user);
    formData.append('files_quantity', files_quantity)
    axios.post('/upload/project', formData).then(result => {
        dispatch({
            type: UPLOAD_MODEL_FILES,
            payload: result.data
        })
    }).then(callback_function).catch(err => console.log(err));
}
/**
 * return all the files associated to the given project
 * @param {*} project_id 
 */
export const getProjectFiles = (project_id) => dispatch => {
    axios.get('/api/project/' + project_id +'/files').then(result => {
        dispatch({
            type: GET_PROJECT_FILES,
            payload: result.data
        })
    }).catch(err => console.log(err));
}
/**
 * user selected a specific file to view 
 * @param {*} file_id id of selected file
 */
export const selectFile = (file_id) => dispatch => {
    axios.get('/api/file/' + file_id + "/info").then((result)=> {
        dispatch({
            type: SELECT_FILE,
            payload: result.data
        })
    }).catch(err => console.log(err))
}
/**
 * returns the content of particular file
 * @param {*} file_id 
 */
export const getFileContent = (file_id) => dispatch => {
    axios.get('/api/file/' + file_id + "/content").then((result) => {
        dispatch({
            type: GET_FILE_CONTENT,
            payload: result.data
        })
    })
}
/**
 * the action updates given model file content
 * @param {*} file file updated information
 */
export const updateFileContent = (file, callback_function) => dispatch => {
    axios.put('/api/file/content', file).then((result) => {
        dispatch({
            type: UPDATE_FILE_CONTENT,
            payload: result.data
        })
    }).then(callback_function)
}