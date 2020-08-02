import { CHANGE_PASSWORD_ACTIVE, CHANGE_PASSWORD_NONACTIVE } from '../actions/types.js'
import { PERSONAL_DETAILS_ACTIVE, PERSONAL_DETAILS_NONACTIVE } from '../actions/types.js'
import { ACTIVENESS_SECTION_ACTIVE, ACTIVENESS_SECTION_NONACTIVE } from '../actions/types.js'
import { CHANGE_IMAGE_ACTIVE, CHANGE_IMAGE_NONACTIVE } from '../actions/types.js'
import { ACTIVE_SENDER_MESSAGE, ACTIVE_RECIEVE_MESSAGE, ACTIVE_CONTENT_MESSAGE,HIDE_SENDER_MESSAGE ,
    HIDE_RECIEVE_MESSAGE ,HIDE_CONTENT_MESSAGE} from '../actions/types.js'

const initialState = {
    activeness_section_active: true,
    personal_details_active: true,
    change_password_active: false,
    change_image_active: false,
    active_content_message:false,
    active_sender_message:false,
    active_reciever_message:false
   

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
     case ACTIVE_SENDER_MESSAGE:
        return {
            ...state,
            active_sender_message: true
        };
    case ACTIVE_RECIEVE_MESSAGE:
        return {
            ...state,
            active_reciever_message: true
        };    
     case ACTIVE_CONTENT_MESSAGE:
        return {
            ...state,
            active_content_message: true
        };
     case HIDE_SENDER_MESSAGE:
        return {
            ...state,
            active_sender_message: false
        };  
     case HIDE_RECIEVE_MESSAGE:
        return {
            ...state,
            active_reciever_message: false
        };
      case HIDE_CONTENT_MESSAGE:
        return {
            ...state,
            active_content_message: false
        };                       
    default:
      return state
  }
}

