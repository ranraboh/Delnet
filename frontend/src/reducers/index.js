import { combineReducers } from 'redux';
import { authentication } from './auth.js';
import { userReducer } from './user-reducer.js';
import { projectReducer } from './project-reducer.js';
import { profileReducer } from './profile-reducer.js';
import { datasetsReducer, datasetsToggleReducer } from './dataset-reducer.js';
import { projectSectionsReducer } from './project-sections.js';
import { ambReducer } from "./amb.js";
import { modelReducer } from './model.js';
import { postsReducer } from './posts.js';


/* combine into single reducer function */
export default combineReducers({
    authentication, userReducer, projectReducer, profileReducer, datasetsReducer, datasetsToggleReducer, 
    projectSectionsReducer, ambReducer, modelReducer, postsReducer
})