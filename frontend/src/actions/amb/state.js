import { SELECT_LAYER, UPDATE_LAYER, UPDATE_MODEL_DETAILS, ADD_LAYER } from '../types.js';

export const selectLayer = (layer) => dispatch => {
    dispatch({ 
        type: SELECT_LAYER,
        payload: layer
    });
}
export const updateLayer = (layer) => dispatch => {
    dispatch({ 
        type: UPDATE_LAYER,
        payload: layer
    });
}
export const updateGeneralDetails = (layer) => dispatch => {
    dispatch({ 
        type: UPDATE_MODEL_DETAILS,
        payload: layer
    });
}
export const addLayer = () => dispatch => {
    dispatch({ 
        type: ADD_LAYER,
        payload: null
    });
}