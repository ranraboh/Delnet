import { GET_USER_DETAILS, USER_LOOKUP_SUCCESS, USER_LOOKUP_FAIL, UPLOAD_IMAGE, UPDATE_USER, UPDATE_USER_IMAGE } from '../actions/types.js'
import { media } from '../appconf.js'

const initialState = {
    firstname: null,
    lastname: null,
    occupation: null,
    email: null,
    join_date: null,
    query_receive: 0,
    users_queries: { },
    upload_image: null
}
export function userReducer(state = initialState, action) {
    switch (action.type) {
    case GET_USER_DETAILS:
      return {
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
        occupation: action.payload.occupation,
        gender: action.payload.gender,
        join_date: action.payload.join_date,
        image: action.payload.image
      };
    case USER_LOOKUP_SUCCESS:
      console.log('success reducer')
      state.users_queries[action.payload.username] = true;
      state.query_receive = state.query_receive + 1;
      return state;
    case USER_LOOKUP_FAIL:
      console.log('fail reducer')
      state.users_queries[action.payload.username] = false;
      state.query_receive = state.query_receive + 1;
      return state;
    case UPLOAD_IMAGE: 
      console.log('upload reducer')
      console.log(action.payload)
      return {
        ...state, 
        image: media + action.payload.url,
        upload_image: media + action.payload.url
      }
    case UPDATE_USER: 
      return {
        ...state
      }
    default:
      return state
  }
}