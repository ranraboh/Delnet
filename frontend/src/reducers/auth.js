import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from '../actions/types.js';

const initialState = {
    loggedIn:window.localStorage.getItem('loggedIn'),
    user:window.localStorage.getItem('user')
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload
      };
    case LOGIN_FAILURE:
      return {
          loggedIn: false,
          user: null
      };
    case LOGOUT:
      return {
        loggedIn: false,
        user: null
      }
    default:
      return state
  }
}