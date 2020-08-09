import { GET_FOLLOWED_POSTS, GET_POSTS, LIKE_POST, COMMENT_POST, GET_GROUPS, ADD_POST, ASSIGNED_POST_GROUPS, SELECT_GROUP, FOLLOWED_POSTS_STATE, FOLLOWED_QUESTIONS_STATE, MY_POSTS_STATE, MY_QUESTIONS_STATE, GET_USER_POSTS, GET_GROUP_POSTS, GET_QUESTIONS, GET_USER_QUESTIONS, GET_FOLLOWED_QUESTIONS, GET_QUESTIONS_GROUP, HOME_STATE, GET_VIDEOS, GET_VIDEOS_GROUP, GET_FOLLOWED_VIDEOS, NEW_POST_ACTIVE, NEW_POST_INACTIVE, READ_MORE_ACTIVE, DATA_ACHEIVED, READ_MORE_INACTIVE, FOLLOW_POST, FOLLOWED_VIDEOS_STATE } from "../actions/types";

const HOME = 'HOME'
const GROUP = 'GROUP'
const FOLLOWED_POSTS = 'FOLLOWED_POSTS'
const FOLLOWED_QUESTIONS = 'FOLLOWED_QUESTIONS'
const FOLLOWED_VIDEOS = 'FOLLOWED_VIDEOS'
const MY_POSTS = 'MY_POSTS'
const MY_QUESTIONS = 'MY_QUESTIONS'

const initialState = {
    status: HOME,
    new_post_state: false,
    read_more_state: -1,
    empty: {
        videos: false,
        posts: false,
        questions: false
    },
    posts: [],
    questions: [],
    videos: [],
    groups: null,
    updated_post: null,
    new_comment: null,
    group_selected: null,
    follow_record: null
}

export function postsReducer(state = initialState, action) {
    switch (action.type) {
    case GET_POSTS:
    case GET_USER_POSTS:
    case GET_GROUP_POSTS:
    case GET_FOLLOWED_POSTS:
        let posts = state.posts.concat(action.payload)
        return {
            ...state,
            posts: posts,
            empty: {
                ...state.empty,
                posts: action.payload.length == 0
            }
        };
    case GET_QUESTIONS:
    case GET_USER_QUESTIONS:
    case GET_FOLLOWED_QUESTIONS:
    case GET_QUESTIONS_GROUP:
        let questions = state.questions.concat(action.payload)
        return {
            ...state,
            questions: questions,
            empty: {
                ...state.empty,
                questions: action.payload.length == 0
            }
        }; 
    case GET_VIDEOS:
    case GET_VIDEOS_GROUP:
    case GET_FOLLOWED_VIDEOS:
        let videos = state.videos.concat(action.payload)
        return {
            ...state,
            videos: videos,
            empty: {
                ...state.empty,
                videos: action.payload.length == 0
            }
        }; 
    case NEW_POST_ACTIVE:
        return {
            ...state,
            new_post_state: true
        };
    case NEW_POST_INACTIVE:
        return {
            ...state,
            new_post_state: false
        };
    case READ_MORE_ACTIVE:
        return {
            ...state,
            read_more_state: action.payload
        };
    case READ_MORE_INACTIVE:
        return {
            ...state,
            read_more_state: -1
        };
    case LIKE_POST: 
        return {
            ...state,
            updated_post: action.payload
        }
    case FOLLOW_POST:
        return {
            ...state,
            follow_record: action.payload
        }
    case COMMENT_POST:
        return {
            ...state, 
            new_comment: action.payload
        }
    case GET_GROUPS:
        return {
            ...state,
            groups: action.payload
        } 
    case ADD_POST:
        return {
            ...state,
            post_added: action.payload
        }
    case ASSIGNED_POST_GROUPS:
        return {
            ...state,
            post_added: {
                ...state.post_added,
                groups: action.payload
            }
        }
    case SELECT_GROUP:
        return {
            ...state,
            status: GROUP,
            group_selected: action.payload,
            posts: [],
            questions: [],
            videos: [],
            empty: {
                videos: false,
                posts: false,
                questions: false
            },
        }
    case FOLLOWED_POSTS_STATE:
        return {
            ...state,
            status: FOLLOWED_POSTS,
            posts: [],
            questions: [],
            videos: [],
            empty: {
                videos: false,
                posts: false,
                questions: false
            },
        }
    case FOLLOWED_QUESTIONS_STATE:
        return {
            ...state,
            status: FOLLOWED_QUESTIONS,
            posts: [],
            questions: [],
            videos: [],
            empty: {
                videos: false,
                posts: false,
                questions: false
            },
        }
    case FOLLOWED_VIDEOS_STATE:
        return {
            ...state,
            status: FOLLOWED_VIDEOS,
            posts: [],
            questions: [],
            videos: [],
            empty: {
                videos: false,
                posts: false,
                questions: false
            },
        }
    case MY_POSTS_STATE:
        return {
            ...state,
            status: MY_POSTS,
            posts: [],
            questions: [],
            videos: [],
            empty: {
                videos: false,
                posts: false,
                questions: false
            },
        }
    case MY_QUESTIONS_STATE:
        return {
            ...state,
            status: MY_QUESTIONS,
            posts: [],
            questions: [],
            videos: [],
            empty: {
                videos: false,
                posts: false,
                questions: false
            },
        }
    case HOME_STATE:
        return {
            ...state,
            status: HOME,
            posts: [],
            questions: [],
            videos: [],
            empty: {
                videos: false,
                posts: false,
                questions: false
            },
        }
    case DATA_ACHEIVED:
        return {
            ...state,
            data_achivied: true
        };
        default:
            return state;
    }
}