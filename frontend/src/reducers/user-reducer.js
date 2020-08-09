import { ADD_MESSAGES,GET_USER_DETAILS, USER_LOOKUP_SUCCESS, USER_LOOKUP_FAIL, UPLOAD_IMAGE, UPDATE_USER,
   UPDATE_USER_IMAGE,SENDER_MESSAGES,RECEIVER_MESSAGES,CONTENT_MESSAGES,MESSAGES_HEADER, NOTIFICATIONS_HEADER} from '../actions/types.js'
import { media } from '../appconf.js'

const initialState = {
    firstname: null,
    lastname: null,
    occupation: null,
    email: null,
    join_date: null,
    query_receive: 0,
    users_queries: { },
    upload_image: null,
    senderMessages:null,
    receiverMessages:null,
    contentMessages:null,
    messagesHeader:null,
    add_message:null,
    notifications_header:null
    
}
export function userReducer(state = initialState, action) {
    switch (action.type) {
    case ADD_MESSAGES:
      console.log("action----16")
      console.log(action.payload)
      return {
        ...state,
        add_message: action.payload
      };
    case GET_USER_DETAILS:
      return {
        ...state,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
        occupation: action.payload.occupation,
        gender: action.payload.gender,
        join_date: action.payload.join_date,
        image: action.payload.image
      };
    case USER_LOOKUP_SUCCESS:
      state.users_queries[action.payload.username] = true;
      state.query_receive = state.query_receive + 1;
      return state;
    case USER_LOOKUP_FAIL:
      state.users_queries[action.payload.username] = false;
      state.query_receive = state.query_receive + 1;
      return state;
    case UPLOAD_IMAGE: 
      return {
        ...state, 
        image: media + action.payload.url,
        upload_image: media + action.payload.url
      }
    case SENDER_MESSAGES:
    return {
        ...state,
        senderMessages: action.payload
    }
    case MESSAGES_HEADER:
      return {
        ...state,
        messagesHeader: action.payload
    }
    case RECEIVER_MESSAGES:
      return {
        ...state,
        receiverMessages: action.payload
    }
    case CONTENT_MESSAGES:
      return {
        ...state,
        contentMessages: action.payload
    }
    case UPDATE_USER: 
      return {
        ...state
      }
    case NOTIFICATIONS_HEADER:
      return {
        ...state,
        notifications_header: action.payload
      }
    default:
      return state
  }
}