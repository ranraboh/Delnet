import { DEPLOY_MODEL_ACTIVE, DEPLOY_MODEL_NONACTIVE } from '../types.js'
import { LAYERS_DISPLAY_ACTIVE, LAYERS_DISPLAY_NONACTIVE } from '../types.js'
import { ARCHITECTURE_DISPLAY_ACTIVE, ARCHITECTURE_DISPLAY_NONACTIVE } from '../types.js'
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
import { PROJECT_ANALYSIS_ACTIVE, PROJECT_ANALYSIS_NONACTIVE } from '../types.js'
import { PROJECT_TESTS_ACTIVE, PROJECT_TESTS_NONACTIVE } from '../types.js'

export const activateSection = (section) => dispatch => {
    dispatch({ 
        type: activate_map_actiontype(section),
        payload: null  
    });
}
export const hideSection = (section) => dispatch => {
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
        case 'Project Analysis':
            return PROJECT_ANALYSIS_ACTIVE;
        case 'Tests':
            return PROJECT_TESTS_ACTIVE
        case 'Statics':
            return PROJECT_STACTICS_ACTIVE;
        case 'Diagrams':
            return PROJECT_DIAGRAMS_ACTIVE;
        case 'Deploy Model':
            return DEPLOY_MODEL_ACTIVE;
        case 'Run Model':
            return RUN_MODEL_ACTIVE;
        case 'Runs Outcomes':
            return RUNS_OUTCOMES_ACTIVE;
        case 'Access Dataset':
            return ACCESS_DATASET_ACTIVE;
        case 'Model Layers':
            return LAYERS_DISPLAY_ACTIVE;
        case 'Model Architecture':
            return ARCHITECTURE_DISPLAY_ACTIVE;
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
        case 'Project Analysis':
            return PROJECT_ANALYSIS_NONACTIVE;
        case 'Tests':
            return PROJECT_TESTS_NONACTIVE
        case 'Statics':
            return PROJECT_STACTICS_NONACTIVE;
        case 'Diagrams':
            return PROJECT_DIAGRAMS_NONACTIVE;
        case 'Deploy Model':
            return DEPLOY_MODEL_NONACTIVE;
        case 'Run Model':
            return RUN_MODEL_NONACTIVE;
        case 'Runs Outcomes':
            return RUNS_OUTCOMES_NONACTIVE;
        case 'Access Dataset':
            return ACCESS_DATASET_NONACTIVE;
        case 'Model Layers':
            return LAYERS_DISPLAY_NONACTIVE;
        case 'Model Architecture':
            return ARCHITECTURE_DISPLAY_NONACTIVE;
        case 'Check List':
            return CHECK_LIST_NONACTIVE;
        default:
            return '';
    }
}