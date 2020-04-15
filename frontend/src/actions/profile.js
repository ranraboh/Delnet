import { CHANGE_PASSWORD_ACTIVE, CHANGE_PASSWORD_NONACTIVE } from '../actions/types.js'
import { PERSONAL_DETAILS_ACTIVE, PERSONAL_DETAILS_NONACTIVE } from '../actions/types.js'
import { ACTIVENESS_SECTION_ACTIVE, ACTIVENESS_SECTION_NONACTIVE } from '../actions/types.js'
import { CHANGE_IMAGE_ACTIVE, CHANGE_IMAGE_NONACTIVE } from '../actions/types.js'
import store from '../store.js';

/* Personal Details */
export const activatePersonalDetails = () => dispatch => {
    dispatch({ 
        type: PERSONAL_DETAILS_ACTIVE,
        payload: null  
    });
}
export const hidePersonalDetails = () => dispatch => {
    dispatch({ 
        type: PERSONAL_DETAILS_NONACTIVE,
        payload: null  
    });
}

/* Change Password */
export const activateChangePassword = () => dispatch => {
    dispatch({ 
        type: CHANGE_PASSWORD_ACTIVE,
        payload: null  
    });
}
export const hideChangePassword = () => dispatch => {
    dispatch({ 
        type: CHANGE_PASSWORD_NONACTIVE,
        payload: null  
    });
}

/* Activeness Section */
export const activateActivnessSection = () => dispatch => {
    dispatch({ 
        type: ACTIVENESS_SECTION_ACTIVE,
        payload: null  
    });
}
export const hideActivnessSection = () => dispatch => {
    dispatch({ 
        type: ACTIVENESS_SECTION_NONACTIVE,
        payload: null  
    });
}

/* Change Password */
export const activateChangeImage = () => dispatch => {
    dispatch({ 
        type: CHANGE_IMAGE_ACTIVE,
        payload: null  
    });
}
export const hideChangeImage = () => dispatch => {
    dispatch({ 
        type: CHANGE_IMAGE_NONACTIVE,
        payload: null  
    });
}