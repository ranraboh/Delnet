import axios from 'axios'
import { GET_USER_DATASETS, GET_DATASETS_ITEMS_AMOUNT, GET_DATASET_TEAM ,CREATE_DATASET, DELETE_DATASET, SELECT_DATASET, ADD_ITEM, ADD_LABEL, DELETE_LABEL, GET_ITEMS_COUNT } from './types.js'
import { DATASET_DETAILS_ACTIVE, DATASET_DETAILS_NONACTIVE, GET_DATASET_LABELS, GET_LABELS_COUNT, GET_DATA_ITEMS, DELETE_DATA_ITEM } from './types.js';
import { COLLECTORS_TEAM_ACTIVE, COLLECTORS_TEAM_NONACTIVE, LABELS_SECTION_ACTIVE, LABELS_SECTION_NONACTIVE, ITEMS_SECTION_ACTIVE, ITEMS_SECTION_NONACTIVE, ADD_ITEM_ACTIVE,ADD_LABEL_ACTIVE , ADD_LABEL_NONACTIVE, ADD_ITEM_NONACTIVE } from "./types";
import { useReducer } from 'react';

/*****************************************
 *  Get Data
 *****************************************/

export const getUserDatasets = (username) => dispatch => {
    axios.get('/api/datasets/user/' + username).then(result => {
        console.log('result from server')
        console.log(result.data)
        dispatch({
            type: GET_USER_DATASETS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}
export const getDatasetTeam = (dataset_id) => dispatch => {
    axios.get('/api/team/dataset/' + dataset_id).then(result => {
        console.log('result from server')
        console.log(result.data)
        dispatch({
            type: GET_DATASET_TEAM,
            payload: result.data
        })
    }).catch(err => console.log(err));
}
export const getDatasetLabels = (dataset_id) => dispatch => {
    axios.get('/api/dataset/' + dataset_id + '/labels').then(result => {
        console.log('in action of getting labels')
        dispatch({
            type: GET_DATASET_LABELS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}
export const getDataItems = (page_number, dataset_id) => dispatch => {
    axios.get('/api/dataset/' + dataset_id + '/items?page=' + page_number).then(result => {
        result.data.page = page_number;
        dispatch({
            type: GET_DATA_ITEMS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/*****************************************************************
 * Get single value
 ******************************************************************/
export const getLabelsCount = (dataset_id) => dispatch => {
    axios.get('/api/dataset/' + dataset_id + '/labels/quantity').then(result => {
        console.log('labels quantity action')
        console.log(result)
        dispatch({
            type: GET_LABELS_COUNT,
            payload: result.data
        })
    }).catch(err => console.log(err));
}
export const getItemsCount = (dataset_id) => dispatch => {
    axios.get('/api/dataset/' + dataset_id + '/items/quantity').then(result => {
        dispatch({
            type: GET_ITEMS_COUNT,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

export const buildDataSet = (dataset, callback_function) => dispatch => {
    axios.post('/api/datasets/', dataset).then(response => {
        console.log(response);
        return dispatch({
            type: CREATE_DATASET,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}
export const deleteDataSet = (dataset_id, callback_function) => dispatch => {
    axios.post('/api/datasets/' + dataset_id + '/').then(response => {
        console.log(response);
        return dispatch({
            type: DELETE_DATASET,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}
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
export const deleteDataItem = (dataitem_id, callback_function) => dispatch => {
    axios.delete('/api/dataitems/' + dataitem_id + '/').then(response => {
        console.log(response);
        return dispatch({
            type: DELETE_DATA_ITEM,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}
export const deleteLabel = (datalabel_id, callback_function) => dispatch => {
    axios.delete('/api/datalabels/' + datalabel_id).then(response => {
        console.log(response);
        return dispatch({
            type: DELETE_LABEL,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

export const addLabel = (datalabel, callback_function) => dispatch => {
    axios.post('/api/datalabels/', datalabel).then(response => {
        console.log(response);
        return dispatch({
            type: ADD_LABEL,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}
export const addDataItem = (dataitem, callback_function) => dispatch => {
    axios.post('/api/items/add', dataitem).then(response => {
        console.log(response);
        return dispatch({
            type: ADD_ITEM,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

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

export const getDatasetsItemsAmount = (username) => dispatch => {
    axios.get('/api/datasets/user/' + username + "/items/quantity").then(result => {
        console.log('result from server')
        console.log(result.data)
        dispatch({
            type: GET_DATASETS_ITEMS_AMOUNT,
            payload: result.data
        })
    }).catch(err => console.log(err));
}


/****************************************
 * toggle dataset sections
 ***************************************/
export const activateSection = (section) => dispatch => {
    console.log('in activate')
    dispatch({ 
        type: activate_map_actiontype(section),
        payload: null  
    });
}
export const hideSection = (section) => dispatch => {
    console.log('in action hide')
    dispatch({ 
        type: hide_map_actiontype(section),
        payload: null  
    });
}
export const activate_map_actiontype = (section) => {
    switch(section) {
        case 'General Details':
            return DATASET_DETAILS_ACTIVE;
        case 'Collectors Team':
            return COLLECTORS_TEAM_ACTIVE;
        case 'Labels Section':
            return LABELS_SECTION_ACTIVE;
        case 'Items Section':
            return ITEMS_SECTION_ACTIVE;
        case 'Add Label':
            return ADD_LABEL_ACTIVE;
        case 'Add Item':
            return ADD_ITEM_ACTIVE;
        default:
            return '';
    }
}
export const hide_map_actiontype = (section) => {
    console.log(section);
    switch(section) {
        case 'General Details':
            return DATASET_DETAILS_NONACTIVE;
        case 'Collectors Team':
            return COLLECTORS_TEAM_NONACTIVE;
        case 'Labels Section':
            return LABELS_SECTION_NONACTIVE;
        case 'Items Section':
            return ITEMS_SECTION_NONACTIVE;
        case 'Add Label':
            return ADD_LABEL_NONACTIVE;
        case 'Add Item':
            return ADD_ITEM_NONACTIVE;
        default:
            return '';
    }
}