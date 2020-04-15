import axios from 'axios'
import { LOGIN_SUCCESS, LOGOUT, GET_USER_DETAILS, USER_LOOKUP_SUCCESS, USER_LOOKUP_FAIL, UPDATE_USER, UPLOAD_IMAGE, UPDATE_USER_IMAGE } from './types.js'
import { useReducer } from 'react';
import { homepage } from '../appconf.js';

export const getUserDetails = (username) => dispatch => {
    axios.get('/api/users/' + username).then(result => {
        dispatch({
            type: GET_USER_DETAILS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

export const uploadImage = (image) => dispatch => {
    let formData = new FormData();
    formData.append('image', image.image, image.name);
    formData.append('user', image.user)
    axios.post('/upload/', formData).then(result => {
        console.log('inside action')
        console.log(image)
        result.request = image
        dispatch({
            type: UPLOAD_IMAGE,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

export const loginAction = (username) => dispatch => {
    dispatch({ 
        type: LOGIN_SUCCESS,
        payload: username  
    });
    window.localStorage.setItem('loggedIn', true);
    window.localStorage.setItem('user', username);
}

export const logoutAction = () => dispatch => {
    dispatch({ 
        type: LOGOUT,
        payload: null
    });
    window.localStorage.setItem('loggedIn', false);
    window.localStorage.setItem('user', '');
}
export const createUser = (user, callback_function) => {
    axios.post("/api/users/", user).then(callback_function)
    .catch(err => console.log(err))
}
export const updateUser = (user, callback_function) => dispatch => {
    axios.put('/api/users/update', user).then(result => {
        result.request = user
        dispatch({
            type: UPDATE_USER,
            payload: result.data
        })
    }).then(callback_function).catch(err => console.log(err));
}
export const updateUserImage = (user, callback_function) => dispatch => {
    axios.put('/api/users/image/update', user).then(result => {
        result.request = user
        dispatch({
            type: UPDATE_USER_IMAGE,
            payload: result.data
        })
    }).then(callback_function).catch(err => console.log(err));
}

export const isUserExists = (username) => dispatch => {
    axios.get('/api/users/' + username).then(result => {
        dispatch({
            type: USER_LOOKUP_SUCCESS,
            payload: result.data
        })
    }).catch(err => {
        dispatch({
            type: USER_LOOKUP_FAIL,
            payload: { username, err }
        })    
    });
}

/*
export const authenticate = (username, password) => dispatch => {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    fetch('https://reqres.in/api/login', request).then(handleResponse).then(isLogged => {
        //localStorage.setItem('isLogged') = isLogged;
        return isLogged;
    })
}
handleResponse = (data) => {
    const isLogged = (typeof data.token !== 'undefined' && data.token !== '');
    return isLogged;
}
*/