import axios from 'axios'
import { ADD_RUN_RECORD, RUN_MODEL, DEPLOY_MODEL, GET_ACCURACY_RANGE, TEST_MODEL, GET_KNOWN_MODELS } from '../types.js';
import { GET_PROJECT_ANALYSIS, GET_OPTIMIZER_TYPES, GET_LOSS_TYPES, GET_UNFINISHED_RUNS, GET_CONFUSION_MATRIX, GET_RECALL_RESULT, GET_PRECISION_RESULT, GET_F1_RESULT } from '../types.js';
import { GET_PROJECT_RUNS, GET_RUN_RESULT_TRAIN, GET_RUN_RESULT_DEV, SELECT_RUN, CLEAR_RUN } from '../types.js';

/**
 * run the model on server side and when the running is completed, update it's results
 * @param {*} run_request object hold the featues of run request
 */
export const runModel = (run_request, callback_function) => dispatch => {
    axios.post('/api/run/model', run_request).then(result => {
        dispatch({
            type: RUN_MODEL,
            payload: result.data
        })
    }).then(callback_function).catch(err => console.log(err));
}

/**
 * deploy and use your own model, send an image and get its prediction
 * @param {*} request details about deploy run request
 */
export const deployModel = (request) => dispatch => {
    console.log(request)
    let formData = new FormData();
    formData.append('project', request.project);
    formData.append('state', request.state);
    formData.append('images_quantity', request.images_quantity);
    for (var i = 0; i < request.images_quantity; i++) {
        formData.append(i , request.images[i]);
    }
    axios.post('/api/deploy/model', formData).then(response => {
        console.log(response);
        return dispatch({
            type: DEPLOY_MODEL,
            payload: response.data
        })
    }).catch(err => console.log(err))
}

/**
 * append into database a new run record
 * @param {*} run_request object hold the featues of run request
 */
export const addRunRecord = (run_request, callback_function) => dispatch => {
    axios.post('/api/runs/', run_request).then(result => {
        dispatch({
            type: ADD_RUN_RECORD,
            payload: result.data
        })
    }).then(callback_function).catch(err => console.log(err));
}

/**
 * get all types of loss function
 */
export const getLossTypes = () => dispatch => {
    axios.get('/api/loss/types').then(result => {
        dispatch({
            type: GET_LOSS_TYPES,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get all types of optimizer algorithms
 */
export const getOptimizerTypes = () => dispatch => {
    axios.get('/api/optimizers').then(result => {
        dispatch({
            type: GET_OPTIMIZER_TYPES,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get finished runs of specific project
 */
export const getProjectRuns = (project_id) => dispatch => {
    axios.get('/api/project/' + project_id + "/runs").then(result => {
        dispatch({
            type: GET_PROJECT_RUNS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get unfinished runs of specific project
 */
export const getUnfinishedRuns = (project_id) => dispatch => {
    axios.get('/api/project/' + project_id + "/runs/unfinished").then(result => {
        dispatch({
            type: GET_UNFINISHED_RUNS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get results on train-set of selected run
 */
export const getTrainResult = (run_code) => dispatch => {
    console.log('get train')
    console.log(run_code)
    axios.get('/api/run/' + run_code + "/results/train").then(result => {
        dispatch({
            type: GET_RUN_RESULT_TRAIN,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get results on dev-set of selected run
 */
export const getDevResult = (run_code) => dispatch => {
    axios.get('/api/run/' + run_code + "/results/dev").then(result => {
        dispatch({
            type: GET_RUN_RESULT_DEV,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * select specific run to display its features and results
 */
export const selectRun = (run_code) => dispatch => {
    axios.get('/api/runs/' + run_code + "/full").then(result => {
        dispatch({
            type: SELECT_RUN,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * undo selection of praticular run
 */
export const clearRunSelection = () => dispatch => {
    dispatch({
        type: CLEAR_RUN,
        payload: null
    })
}

/**
 * get recall metric results of selected run
 */
export const getRecall = (run_code) => dispatch => {
    console.log('get recall')
    axios.get('/api/run/' + run_code + "/results/recall").then(result => {
        console.log(result)
        dispatch({
            type: GET_RECALL_RESULT,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get precision results of selected run
 */
export const getPrecision = (run_code) => dispatch => {
    axios.get('/api/run/' + run_code + "/results/precision").then(result => {
        dispatch({
            type: GET_PRECISION_RESULT,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get f1 scores of selected run
 */
export const getF1Scores = (run_code) => dispatch => {
    axios.get('/api/run/' + run_code + "/results/f1").then(result => {
        dispatch({
            type: GET_F1_RESULT,
            payload: result.data
        })
    }).catch(err => console.log(err));
}
export const getProjectAnalysis = (project_id) => dispatch => {
    axios.get('/api/project/' + project_id + '/recommendations').then(result => {
        dispatch({
            type: GET_PROJECT_ANALYSIS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

export const getAccuracyRange = (project_id) => dispatch => {
    axios.get('/api/project/' + project_id + "/accuracy/range").then(result => {
        dispatch({ 
            type: GET_ACCURACY_RANGE,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get labels matrics results of selected run
 */
export const getConfusionMatrix = (run_code) => dispatch => {
    axios.get('/api/run/' + run_code + "/results/confusionmatrix").then(result => {
        dispatch({
            type: GET_CONFUSION_MATRIX,
            payload: c_matrix_dictionary(result.data)
        })
    }).catch(err => console.log(err));
}

/**
 * test your model
 */
export const testModel = (project_id) => dispatch => {
    axios.get('/api/project/' + project_id + "/test").then(result => {
        dispatch({
            type: TEST_MODEL,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

function c_matrix_dictionary(data) {
    let dict = {}
    var key;
    data.map((record) => {
        key = [record.label, record.prediction].join('#');
        dict[key] = record.value
        console.log(dict)
    })
    return dict;
}
