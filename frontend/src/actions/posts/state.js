import { HOME_STATE, SELECT_GROUP, FOLLOWED_POSTS_STATE, FOLLOWED_QUESTIONS_STATE, MY_POSTS_STATE, MY_QUESTIONS_STATE, DATA_ACHEIVED, READ_MORE_INACTIVE, READ_MORE_ACTIVE, NEW_POST_ACTIVE, NEW_POST_INACTIVE, FOLLOWED_VIDEOS_STATE } from "../types";


export const homeState = () => dispatch => {
    dispatch({ 
        type: HOME_STATE,
        payload: null
    });
}

export const selectGroup = (group) => dispatch => {
    dispatch({ 
        type: SELECT_GROUP,
        payload: group
    });
}


export const followedPostsState = () => dispatch => {
    dispatch({ 
        type: FOLLOWED_POSTS_STATE,
        payload: null
    });
}


export const followedQuestionsState = () => dispatch => {
    dispatch({ 
        type: FOLLOWED_QUESTIONS_STATE,
        payload: null
    });
}

export const followedVideosState = () => dispatch => {
    dispatch({ 
        type: FOLLOWED_VIDEOS_STATE,
        payload: null
    });
}

export const myPostsState = () => dispatch => {
    dispatch({ 
        type: MY_POSTS_STATE,
        payload: null
    });
}

export const myQuestionsState = () => dispatch => {
    dispatch({ 
        type: MY_QUESTIONS_STATE,
        payload: null
    });
}


export const newPostActivate = () => dispatch => {
    dispatch({ 
        type: NEW_POST_ACTIVE,
        payload: null
    });
}


export const newPostHide = () => dispatch => {
    dispatch({ 
        type: NEW_POST_INACTIVE,
        payload: null
    });
}

export const readMoreActivate = (post) => dispatch => {
    dispatch({ 
        type: READ_MORE_ACTIVE,
        payload: post
    });
}

export const readMoreHide = () => dispatch => {
    dispatch({ 
        type: READ_MORE_INACTIVE,
        payload: null
    });
}

export const dataAcheived = () => dispatch => {
    dispatch({ 
        type: DATA_ACHEIVED,
        payload: null
    });
}