import { CREATE_AMB_PROJECT, GET_PROJECT_LAYERS, UPDATE_LAYERS, GET_KNOWN_MODELS, SELECT_KNOWN_MODEL } from '../types'
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
export const loadLayers = (project_id, callback_function) => dispatch => {
    console.log("loading layers...")
    axios.get('/api/project/' + project_id + "/layers").then(result => {
        dispatch({
            type: GET_PROJECT_LAYERS,
            payload: result.data
        })
    }).then(callback_function).catch(err => console.log(err));
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
    }).then(callback_function).catch(err => console.log(err));
}

/**
 * get known models
 */
export const getKnownModels = () => dispatch => {
    axios.get('/api/known').then(result => {
        console.log('get known resposne')
        console.log(result.data)
        dispatch({
            type: GET_KNOWN_MODELS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get known models
 */
export const selectKnownModels = (record, callback_function) => dispatch => {
    axios.post('/api/project/popular', record).then(result => {
        dispatch({
            type: SELECT_KNOWN_MODEL,
            payload: result.data
        })
    }).then(callback_function).catch(err => console.log(err));
}