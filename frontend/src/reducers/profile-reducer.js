import { CHANGE_PASSWORD_ACTIVE, CHANGE_PASSWORD_NONACTIVE } from '../actions/types.js'
import { PERSONAL_DETAILS_ACTIVE, PERSONAL_DETAILS_NONACTIVE } from '../actions/types.js'
import { ACTIVENESS_SECTION_ACTIVE, ACTIVENESS_SECTION_NONACTIVE } from '../actions/types.js'
import { CHANGE_IMAGE_ACTIVE, CHANGE_IMAGE_NONACTIVE } from '../actions/types.js'


const initialState = {
    activeness_section_active: true,
    personal_details_active: true,
    change_password_active: false,
    change_image_active: false
}
export function profileReducer(state = initialState, action) {
    switch (action.type) {
    case CHANGE_PASSWORD_ACTIVE:
        return {
            ...state,
            change_password_active: true
        };
    case CHANGE_PASSWORD_NONACTIVE:
        return {
            ...state,
            change_password_active: false
        };
    case PERSONAL_DETAILS_ACTIVE:
        return {
            ...state,
            personal_details_active: true
        };
    case PERSONAL_DETAILS_NONACTIVE:
        return {
            ...state,
            personal_details_active: false
        };
    case ACTIVENESS_SECTION_ACTIVE:
        return {
            ...state,
            activeness_section_active: true
        };
    case ACTIVENESS_SECTION_NONACTIVE:
        return {
            ...state,
            activeness_section_active: false
        };
    case CHANGE_IMAGE_ACTIVE:
        return {
            ...state,
            change_image_active: true
        };
    case CHANGE_IMAGE_NONACTIVE:
        return {
            ...state,
            change_image_active: false
        };
    default:
      return state
  }
}