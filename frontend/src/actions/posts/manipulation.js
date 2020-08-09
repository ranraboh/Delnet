import axios from 'axios'
import { LIKE_POST, UNLIKE_POST, COMMENT_POST, ASSIGNED_POST_GROUPS, ADD_POST, FOLLOW_POST, UNFOLLOW_POST } from '../types'

export const LikePost = (data, callback_function) => dispatch => {
    axios.post('/api/likes/', data).then(response => {
        return dispatch({
            type: LIKE_POST,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

export const UnlikePost = (like_id, callback_function) => dispatch => {
    axios.delete('/api/likes/' + like_id).then(response => {
        return dispatch({
            type: UNLIKE_POST,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

export const CommentPost = (comment, callback_function) => dispatch => {
    console.log(comment)
    axios.post('/api/comments/', comment).then(response => {
        response.data.image = comment.image
        return dispatch({
            type: COMMENT_POST,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}


export const followPost = (follow_record, callback_function) => dispatch => {
    axios.post('/api/followed/posts/', follow_record).then(response => {
        return dispatch({
            type: FOLLOW_POST,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

export const unfollowPost = (follow_record, callback_function) => dispatch => {
    axios.delete('/api/followed/posts/' + follow_record).then(response => {
        return dispatch({
            type: UNFOLLOW_POST,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

export const addPost = (record, callback_function) => dispatch => {
    axios.post('/api/posts/', record).then(response => {
        return dispatch({
            type: ADD_POST,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}

export const assignedGroups = (record, callback_function) => dispatch => {
    axios.post('/api/posts/groups/assigned', record).then(response => {
        return dispatch({
            type: ASSIGNED_POST_GROUPS,
            payload: response.data
        })
    }).then(callback_function).catch(err => console.log(err))
}
