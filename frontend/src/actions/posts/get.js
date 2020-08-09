import axios from 'axios'
import { GET_FOLLOWED_POSTS,GET_POSTS, GET_GROUPS, GET_GROUP_POSTS, GET_USER_POSTS, GET_USER_QUESTIONS, GET_FOLLOWED_QUESTIONS, GET_QUESTIONS_GROUP, GET_QUESTIONS, GET_FOLLOWED_VIDEOS, GET_VIDEOS_GROUP, GET_VIDEOS } from '../types';

/**
 * get new posts
 * @param {*} page number of page 
 */
export const getPosts = (username, page) => dispatch => {
    axios.get('/api/posts/feed/user/' + username + '/page/' + page).then(result => {
        dispatch({
            type: GET_POSTS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get new posts
 * @param {*} page number of page 
 */
export const getQuestions = (username, page) => dispatch => {
    axios.get('/api/questions/feed/user/' + username + '/page/' + page).then(result => {
        dispatch({
            type: GET_QUESTIONS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get new posts
 * @param {*} page number of page 
 */
export const getVideos = (username, page) => dispatch => {
    axios.get('/api/videos/feed/user/' + username + '/page/' + page).then(result => {
        dispatch({
            type: GET_VIDEOS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get groups records
 * @param {*} page number of page 
 */
export const getGroups = () => dispatch => {
    axios.get('/api/groups/').then(result => {
        dispatch({
            type: GET_GROUPS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}
/**
 * get posts associated with given group
 * @param {*} page number of page 
 */
export const getPostsGroup = (group, username, page) => dispatch => {
    axios.get('/api/posts/group/' + group + '/user/' + username + '/page/' + page).then(result => {
        dispatch({
            type: GET_GROUP_POSTS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get questions associated with given group
 * @param {*} page number of page 
 */
export const getQuestionsGroup = (group, username, page) => dispatch => {
    axios.get('/api/questions/group/' + group + '/user/' + username + '/page/' + page).then(result => {
        dispatch({
            type: GET_QUESTIONS_GROUP,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get questions associated with given group
 * @param {*} page number of page 
 */
export const getVideosGroup = (group, username, page) => dispatch => {
    axios.get('/api/videos/group/' + group + '/user/' + username + '/page/' + page).then(result => {
        dispatch({
            type: GET_VIDEOS_GROUP,
            payload: result.data
        })
    }).catch(err => console.log(err));
}

/**
 * get all posts of given user
 * @param {*} page number of page 
 */
export const getUserPosts = (user, page) => dispatch => {
    axios.get('/api/posts/user/' + user + '/page/' + page).then(result => {
        dispatch({
            type: GET_USER_POSTS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}
/**
 * get all questions posts of given user
 * @param {*} page number of page 
 */
export const getUserQuestions = (user, page) => dispatch => {
    axios.get('/api/questions/user/' + user + '/page/' + page).then(result => {
        dispatch({
            type: GET_USER_QUESTIONS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}
/**
 * get all followed posts of given user
 * @param {*} page number of page 
 */
export const getFollowedPosts = (user, page) => dispatch => {
    axios.get('/api/followed/posts/user/' + user + '/page/' + page).then(result => {
        dispatch({
            type: GET_FOLLOWED_POSTS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}
/**
 * get all followed questions of given user
 * @param {*} page number of page 
 */
export const getFollowedQuestions = (user, page) => dispatch => {
    axios.get('/api/followed/questions/user/' + user + '/page/' + page).then(result => {
        dispatch({
            type: GET_FOLLOWED_QUESTIONS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}
/**
 * get all followed videos of given user
 * @param {*} page number of page 
 */
export const getFollowedVideos = (user, page) => dispatch => {
    axios.get('/api/followed/videos/user/' + user + '/page/' + page).then(result => {
        dispatch({
            type: GET_FOLLOWED_VIDEOS,
            payload: result.data
        })
    }).catch(err => console.log(err));
}



