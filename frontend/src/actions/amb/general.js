import { CREATE_AMB_PROJECT, GET_PROJECT_LAYERS, UPDATE_LAYERS } from '../types'
import axios from 'axios'


/**
 * create model using the infomation gathered by the automated builder
 * @param {*} data model information
 */
export const createAutomatedModel = (data, callback_function) => dispatch => {
    axios.post('/api/amb/create', data).then(result => {
        console.log('result from server')
        console.log(result.data)
        dispatch({
            type: CREATE_AMB_PROJECT,
            payload: result.data
        })
    }).then(callback_function).catch(err => console.log(err));
}

/**
 * return the layers list of praticular project
 * @param {*} project_id identification number of specific project
 */
export const loadLayers = (project_id) => dispatch => {
    axios.get('/api/project/' + project_id + "/layers").then(result => {
        dispatch({
            type: GET_PROJECT_LAYERS,
            payload: result.data
        })
    })
}

/**
 * save layers list on database
 */
export const saveLayers = (request, callback_function) => dispatch => {
    axios.post('/api/layers/save', request).then(result => {
        dispatch({
            type: UPDATE_LAYERS,
            payload: result.data
        })
    }).then(callback_function)
}