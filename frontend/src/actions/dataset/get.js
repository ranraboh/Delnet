import { GET_DATASET_ANALYSIS, GET_USER_DATASETS, GET_DATASETS_ITEMS_AMOUNT, GET_DATASET_TEAM, GET_ITEMS_COUNT, GET_DATASET_LABELS, GET_LABELS_COUNT, GET_DATA_ITEMS, GET_DATASET_OFFERS, GET_SEARCH_DATASETS, GET_UNLABLED_SMAPLES, GET_DATASETS_PUBLIC } from '../types.js'
import { GET_DATE_DISTRIBUTION, GET_USER_CONTRIBUTION, GET_DATASET_PROJECTS_PERFORMANCE } from '../types.js'
import axios from 'axios'

/**
 * get set of datasets of praticular user
 * @param {*} username username of speicific user 
 */
export const getUserDatasets = (username) => dispatch => {
    axios.get('/api/datasets/user/' + username).then(result => {
        dispatch({
            type: GET_USER_DATASETS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get team members of praticular dataset
 * @param {*} dataset_id identification number of dataset
 */
export const getDatasetTeam = (dataset_id) => dispatch => {
    axios.get('/api/team/dataset/' + dataset_id).then(result => {
        dispatch({
            type: GET_DATASET_TEAM,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * analyze preticular dataset collection 
 * @param {*} dataset_id identification of specific dataset 
 */
export const getDatasetAnalysis = (dataset_id) => dispatch => {
    axios.get('/api/dataset/' + dataset_id + '/analyze').then(result => {
        dispatch({
            type: GET_DATASET_ANALYSIS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get set of labels of praticular dataset
 * @param {*} dataset_id identification of specific dataset 
 */
export const getDatasetLabels = (dataset_id) => dispatch => {
    axios.get('/api/dataset/' + dataset_id + '/labels').then(result => {
        dispatch({
            type: GET_DATASET_LABELS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get fixed-sized subset of items or samples of praticular dataset.
 * the subset depends on the page number given as parameter
 * @param {*} page_number page number 
 * @param {*} dataset_id identification of specific dataset 
 */
export const getDataItems = (page_number, dataset_id) => dispatch => {
    axios.get('/api/dataset/' + dataset_id + '/items?page=' + page_number).then(result => {
        result.data.page = page_number;
        dispatch({
            type: GET_DATA_ITEMS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * returns the number of labels of praticular dataset
 * @param {*} dataset_id identification of specific dataset 
taset_id 
 */
export const getLabelsCount = (dataset_id) => dispatch => {
    axios.get('/api/dataset/' + dataset_id + '/labels/quantity').then(result => {
        dispatch({
            type: GET_LABELS_COUNT,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * returns the number of items or samples of praticular dataset
 * @param {*} dataset_id identification of specific dataset 
 */
export const getItemsCount = (dataset_id) => dispatch => {
    axios.get('/api/dataset/' + dataset_id + '/items/quantity').then(result => {
        dispatch({
            type: GET_ITEMS_COUNT,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * returns items quantity for all the datasets that the given user take part in 
 * @param {*} username username of the specific user
 */
export const getDatasetsItemsAmount = (username) => dispatch => {
    axios.get('/api/datasets/user/' + username + "/items/quantity").then(result => {
        dispatch({
            type: GET_DATASETS_ITEMS_AMOUNT,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**************************************
 * data for graphs
 **************************************/

 /**
 * get contribution of each team member of praticular dataset,
 * i.e how many items each user uploaded
 * @param {*} dataset_id identification of specific dataset 
 */ 
export const getUserContributions = (dataset_id) => dispatch => {
    axios.get('/api/dataset/' + dataset_id + '/team/contributions').then(result => {
        dispatch({
            type: GET_USER_CONTRIBUTION,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

 /**
 * get how many items or samples have been uploaded in each date
 * @param {*} dataset_id identification of specific dataset 
 */ 
export const getDateDistribution = (dataset_id) => dispatch => {
    axios.get('/api/dataset/' + dataset_id + '/date').then(result => {
        dispatch({
            type: GET_DATE_DISTRIBUTION,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

 /**
 * get all projects (and their result/performance) that are using the specific-given dataset
 * @param {*} dataset_id identification of specific dataset 
 */ 
export const getDatasetProjects = (dataset_id) => dispatch => {
    axios.get('/api/dataset/' + dataset_id + '/projects').then(result => {
        dispatch({
            type: GET_DATASET_PROJECTS_PERFORMANCE,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

export const getItemsOffers = (dataset_id) => dispatch => {
    axios.get('/api/dataset/' + dataset_id + '/offers').then(result => {
        dispatch({
            type: GET_DATASET_OFFERS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

export const getDatasetByName = (dataset_name, username) => dispatch => {
    axios.get('/api/datasets/search/' + dataset_name + '/user/' + username).then(result => {
        dispatch({
            type: GET_SEARCH_DATASETS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

export const getUnlabeledSamples = (dataset_id) => dispatch => {
    axios.get('/api/dataset/' + dataset_id + "/unlabeled").then(result => {
        dispatch({
            type: GET_UNLABLED_SMAPLES,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

export const datasetsPublicView = (username) => dispatch => {
    console.log(username)
    axios.get('/api/datasets/public/view/' + username).then(result => {
        dispatch({
            type: GET_DATASETS_PUBLIC,
            payload: result.data
        })
    }).catch(err => console.log(err));
}