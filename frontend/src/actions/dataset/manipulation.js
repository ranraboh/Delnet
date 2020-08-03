import {ADD_UNLABLED_SMAPLES, FOLLOW_DATASET, UNFOLLOW_DATASETADD_NOTIFICTION_DATASET, CREATE_DATASET, DELETE_DATASET, SELECT_DATASET, ADD_ITEM, ADD_LABEL, DELETE_LABEL, DELETE_DATA_ITEM } from '../types.js'
import axios from 'axios'

/**
 * create or build new dataset collection
 * @param {*} dataset details of the newly dataset
 */
export const buildDataSet = (dataset, callback_function) => dispatch => {
    axios.post('/api/datasets/', dataset).then(response => {
        return dispatch({
            type: CREATE_DATASET,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

/**
 * delete specific dataset collection
 * @param {*} dataset_id 
 */
export const deleteDataSet = (dataset_id, callback_function) => dispatch => {
    axios.post('/api/datasets/' + dataset_id + '/').then(response => {
        console.log(response);
        return dispatch({
            type: DELETE_DATASET,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

/**
 * select praticular dataset to view in the web application,
 * the application displays full details about the dataset: set of items, labels, analysis and so on
 * @param {*} dataset_id 
 */
export const selectDataset = (dataset_id, callback_function) => dispatch => {
    if (!callback_function)
        callback_function = x => x
    axios.get('/api/datasets/' + dataset_id).then(response => {
        /* save data in browser */
        window.localStorage.setItem('dataset-id', response.data.id)
        window.localStorage.setItem('dataset-name', response.data.name),
        window.localStorage.setItem('dateset-description', response.data.description),
        window.localStorage.setItem('dataset-create-date', response.data.create_date)
        window.localStorage.setItem('dataset-user', response.data.user)

        /* dispatch for store */
        dispatch({
            type: SELECT_DATASET,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}
/**
 * delete an item or sample of praticular dataset
 * @param {*} dataitem_id 
 */
export const deleteDataItem = (dataitem_id, callback_function) => dispatch => {
    axios.delete('/api/dataitems/' + dataitem_id + '/').then(response => {
        console.log(response);
        return dispatch({
            type: DELETE_DATA_ITEM,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

/**
 * delete a label of the dataset
 * @param {*} datalabel_id 
 */
export const deleteLabel = (datalabel_id, callback_function) => dispatch => {
    axios.delete('/api/datalabels/' + datalabel_id).then(response => {
        console.log(response);
        return dispatch({
            type: DELETE_LABEL,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

/**
 * add a new label to a praticular dataset
 * @param {*} datalabel details of the newly inserted label 
 */
export const addLabel = (datalabel, callback_function) => dispatch => {
    axios.post('/api/datalabels/', datalabel).then(response => {
        console.log(response);
        return dispatch({
            type: ADD_LABEL,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

/**
 * add a new item or sample to the dataset
 * @param {*} dataitem sample object
 */
export const addDataItem = (dataitem, callback_function) => dispatch => {
    axios.post('/api/items/add', dataitem).then(response => {
        return dispatch({
            type: ADD_ITEM,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

/**
 * upload items / images and stores them on the server 
 * @param {*} items_list set of images
 */
export const uploadItems = (items_list, callback_function) => dispatch => {
    let formData = new FormData();
    console.log(items_list.item)
    let items_quantity = items_list.item.length;
    for (var i = 0; i < items_quantity; i++)
        formData.append(i, items_list.item[i]);
        formData.append('dataset', items_list.dataset);
        formData.append('insert_by', items_list.insert_by);
        formData.append('label', items_list.label);
        formData.append('items_quantity', items_quantity);
        axios.post('/api/items/upload', formData).then(response => {
            console.log(response);
            return dispatch({
                type: ADD_ITEM,
                payload: response.data
            })
    }).then(callback_function).catch(err => console.log(err))
}
export const addNotificationDataset = (notification, callback_function) => dispatch => {
    axios.post('/api/dataset/Notification/', notification).then(response => {
        console.log("shhhhhhhhhhhh")
        console.log(response)
        dispatch({
            type: ADD_NOTIFICTION_DATASET,

/**
 * delete an unlabeled item or sample of praticular dataset
 * @param {*} dataitem_id 
 */
export const deleteUnlabeled = (dataitem_id, callback_function) => dispatch => {
    axios.delete('/api/unlabled/' + dataitem_id + '/').then(response => {
        console.log(response);
        return dispatch({
            type: DELETE_DATA_ITEM,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

export const followDataset = (follow_record, callback_function) => dispatch => {
    axios.post('/api/followers/datasets/', follow_record).then(response => {
        return dispatch({
            type: FOLLOW_DATASET,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

export const UnfollowDataset = (follow_id, callback_function) => dispatch => {
    axios.delete('/api/followers/datasets/' + follow_id).then(response => {
        return dispatch({
            type: UNFOLLOW_DATASET,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}
