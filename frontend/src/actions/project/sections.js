import { MODEL_INTERACTION_ACTIVE, MODEL_INTERACTION_NONACTIVE } from '../types.js'
import { EMBED_APPLICATION_NONACTIVE, EMBED_APPLICATION_ACTIVE } from '../types.js'
import { RUN_MODEL_ACTIVE, RUN_MODEL_NONACTIVE } from '../types.js'
import { ACCESS_DATASET_ACTIVE, ACCESS_DATASET_NONACTIVE } from '../types.js'
import { CHECK_LIST_ACTIVE, CHECK_LIST_NONACTIVE } from '../types.js'
import { RUNS_OUTCOMES_ACTIVE, RUNS_OUTCOMES_NONACTIVE } from '../types.js'
import { PROJECT_NOTIFICATIONS_ACTIVE, PROJECT_NOTIFICATIONS_NONACTIVE } from '../types.js'
import { PROJECT_DETAILS_ACTIVE, PROJECT_DETAILS_NONACTIVE } from '../types.js'
import { PROJECT_TEAM_ACTIVE, PROJECT_TEAM_NONACTIVE } from '../types.js'
import { MODEL_FILES_ACTIVE, MODEL_FILES_NONACTIVE } from '../types.js'
import { PROJECT_DIAGRAMS_ACTIVE, PROJECT_DIAGRAMS_NONACTIVE } from '../types.js'
import { PROJECT_STACTICS_ACTIVE, PROJECT_STACTICS_NONACTIVE } from '../types.js'
import { PROJECT_RECOMMENDATIONS_ACTIVE, PROJECT_RECOMMENDATIONS_NONACTIVE } from '../types.js'
import { PROJECT_TESTS_ACTIVE, PROJECT_TESTS_NONACTIVE } from '../types.js'

export const activateSection = (section) => dispatch => {
    console.log('in activate')
    dispatch({ 
        type: activate_map_actiontype(section),
        payload: null  
    });
}
export const hideSection = (section) => dispatch => {
    console.log('in action hide')
    dispatch({ 
        type: hide_map_actiontype(section),
        payload: null  
    });
}
export const activate_map_actiontype = (section) => {
    console.log(section)
    switch(section) {
        case 'General Details':
            return PROJECT_DETAILS_ACTIVE;
        case 'Project Team':
            return PROJECT_TEAM_ACTIVE;
        case 'Model Files':
            return MODEL_FILES_ACTIVE;
        case 'Notifications':
            return PROJECT_NOTIFICATIONS_ACTIVE;
        case 'Runs Outcomes':
            return RUNS_OUTCOMES_ACTIVE;
        case 'Recommendations':
            return PROJECT_RECOMMENDATIONS_ACTIVE;
        case 'Tests':
            return PROJECT_TESTS_ACTIVE
        case 'Statics':
            return PROJECT_STACTICS_ACTIVE;
        case 'Diagrams':
            return PROJECT_DIAGRAMS_ACTIVE;
        case 'Model Interaction':
            return MODEL_INTERACTION_ACTIVE;
        case 'Run Model':
            return RUN_MODEL_ACTIVE;
        case 'Runs Outcomes':
            return RUNS_OUTCOMES_ACTIVE;
        case 'Access Dataset':
            return ACCESS_DATASET_ACTIVE;
        case 'Embed In Application':
            return EMBED_APPLICATION_ACTIVE;
        case 'Check List':
            return CHECK_LIST_ACTIVE;
        default:
            return '';
    }
}

export const hide_map_actiontype = (section) => {
    switch(section) {
        case 'General Details':
            return PROJECT_DETAILS_NONACTIVE;
        case 'Project Team':
            return PROJECT_TEAM_NONACTIVE;
        case 'Model Files':
            return MODEL_FILES_NONACTIVE;
        case 'Notifications':
            return PROJECT_NOTIFICATIONS_NONACTIVE;
        case 'Runs Outcomes':
            return RUNS_OUTCOMES_NONACTIVE;
        case 'Recommendations':
            return PROJECT_RECOMMENDATIONS_NONACTIVE;
        case 'Tests':
            return PROJECT_TESTS_NONACTIVE
        case 'Statics':
            return PROJECT_STACTICS_NONACTIVE;
        case 'Diagrams':
            return PROJECT_DIAGRAMS_NONACTIVE;
        case 'Model Interaction':
            return MODEL_INTERACTION_NONACTIVE;
        case 'Run Model':
            return RUN_MODEL_NONACTIVE;
        case 'Runs Outcomes':
            return RUNS_OUTCOMES_NONACTIVE;
        case 'Access Dataset':
            return ACCESS_DATASET_NONACTIVE;
        case 'Embed In Application':
            return EMBED_APPLICATION_NONACTIVE;
        case 'Check List':
            return CHECK_LIST_NONACTIVE;
        default:
            return '';
    }
}