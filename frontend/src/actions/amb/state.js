import { DELETE_LAYER ,ABORT_LAYER_SELECTION, BUILDING_STAGE, SELECT_LAYER, UPDATE_LAYER, UPDATE_MODEL_DETAILS, ADD_LAYER, KNOWN_MODEL_SELECT, BUILD_TYPE, DISPATCH_LAYERS } from '../types';
import { KNOWN_MODEL, CUSTOMIZABLE_MODEL } from '../../components/automated/actions/enums'

export const selectLayer = (layer) => dispatch => {
    dispatch({ 
        type: SELECT_LAYER,
        payload: layer
    });
}

export const disselectLayer = () => dispatch => {
    dispatch({ 
        type: ABORT_LAYER_SELECTION,
        payload: null
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

export const stageAdvance = (stage) => dispatch => {
    console.log(stage)
    dispatch({ 
        type: BUILDING_STAGE,
        payload: stage
    });
}

export const selectKnownModel = () => dispatch => {
    dispatch({
        type: BUILD_TYPE,
        payload: KNOWN_MODEL
    })
}

export const selectCustomizableModel = () => dispatch => {
    dispatch({
        type: BUILD_TYPE,
        payload: CUSTOMIZABLE_MODEL
    })
}

export const chooseKnownModel = (model_name) => dispatch => {
    dispatch({
        type: KNOWN_MODEL_SELECT,
        payload: model_name
    })
}

export const dispatchLayers = (layers) => dispatch => {
    dispatch({
        type: DISPATCH_LAYERS,
        payload: layers
    })
}

export const deleteLayer = (layer_id) => dispatch => {
    dispatch({
        type: DELETE_LAYER,
        payload: layer_id
    })
}