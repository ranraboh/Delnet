import { DEPLOY_MODEL_ACTIVE, DEPLOY_MODEL_NONACTIVE } from '../actions/types.js'
import { LAYERS_DISPLAY_ACTIVE, LAYERS_DISPLAY_NONACTIVE } from '../actions/types.js'
import { ARCHITECTURE_DISPLAY_ACTIVE, ARCHITECTURE_DISPLAY_NONACTIVE } from '../actions/types.js'
import { RUN_MODEL_ACTIVE, RUN_MODEL_NONACTIVE } from '../actions/types.js'
import { RUNS_OUTCOMES_ACTIVE, RUNS_OUTCOMES_NONACTIVE } from '../actions/types.js'
import { ACCESS_DATASET_ACTIVE, ACCESS_DATASET_NONACTIVE } from '../actions/types.js'
import { CHECK_LIST_ACTIVE, CHECK_LIST_NONACTIVE } from '../actions/types.js'
import { PROJECT_NOTIFICATIONS_ACTIVE, PROJECT_NOTIFICATIONS_NONACTIVE } from '../actions/types.js'
import { PROJECT_DETAILS_ACTIVE, PROJECT_DETAILS_NONACTIVE } from '../actions/types.js'
import { PROJECT_TEAM_ACTIVE, PROJECT_TEAM_NONACTIVE } from '../actions/types.js'
import { MODEL_FILES_ACTIVE, MODEL_FILES_NONACTIVE } from '../actions/types.js'
import { PROJECT_DIAGRAMS_ACTIVE, PROJECT_DIAGRAMS_NONACTIVE } from '../actions/types.js'
import { PROJECT_STACTICS_ACTIVE, PROJECT_STACTICS_NONACTIVE } from '../actions/types.js'
import { PROJECT_ANALYSIS_ACTIVE, PROJECT_ANALYSIS_NONACTIVE } from '../actions/types.js'
import { PROJECT_TESTS_ACTIVE, PROJECT_TESTS_NONACTIVE } from '../actions/types.js'

const initialState = {
    general_details_active: false,
    project_team_active: false,
    model_files_active: false,
    run_outcomes_active: true,
    analysis_active: false,
    tests_active: false,
    diagrams_active: false,
    statics_active: false,
    check_list_active: false,
    access_dataset_active: false,
    run_model_active: true,
    deploy_model_active: false,
    layers_active: false,
    architecture_active: false
}
export function projectSectionsReducer(state = initialState, action) {
    switch (action.type) {
    case PROJECT_DETAILS_ACTIVE:
        return {
            ...state,
            general_details_active: true
        };
    case PROJECT_DETAILS_NONACTIVE:
        return {
            ...state,
            general_details_active: false
        };
    case PROJECT_TEAM_ACTIVE:
        return {
            ...state,
            project_team_active: true
        };
    case PROJECT_TEAM_NONACTIVE:
        return {
            ...state,
            project_team_active: false
        };
    case RUNS_OUTCOMES_ACTIVE:
        return {
            ...state,
            run_outcomes_active: true
        };
    case RUNS_OUTCOMES_NONACTIVE:
        return {
            ...state,
            run_outcomes_active: false
        };
    case PROJECT_ANALYSIS_ACTIVE:
        return {
            ...state,
            analysis_active: true
        };
    case PROJECT_ANALYSIS_NONACTIVE:
        return {
            ...state,
            analysis_active: false
        };
    case PROJECT_TESTS_ACTIVE:
        return {
            ...state,
            tests_active: true
        };
    case PROJECT_TESTS_NONACTIVE:
        return {
            ...state,
            tests_active: false
        };
    case PROJECT_DIAGRAMS_ACTIVE:
        return {
            ...state,
            diagrams_active: true
        };
    case PROJECT_DIAGRAMS_NONACTIVE:
        return {
            ...state,
            diagrams_active: false
        };
    case PROJECT_STACTICS_ACTIVE:
        return {
            ...state,
            statics_active: true
        };
    case PROJECT_STACTICS_NONACTIVE:
        return {
            ...state,
            statics_active: false
        };
    case RUN_MODEL_ACTIVE:
        return {
            ...state,
            run_model_active: true
        };
    case RUN_MODEL_NONACTIVE:
        return {
            ...state,
            run_model_active: false
        };
    case ACCESS_DATASET_ACTIVE:
        return {
            ...state,
            access_dataset_active: true
        };
    case ACCESS_DATASET_NONACTIVE:
        return {
            ...state,
            access_dataset_active: false
        };
    case LAYERS_DISPLAY_ACTIVE:
        return {
            ...state,
            layers_active: true
        };
    case LAYERS_DISPLAY_NONACTIVE:
        return {
            ...state,
            layers_active: false
        };
    case ARCHITECTURE_DISPLAY_ACTIVE:
        return {
            ...state,
            architecture_active: true
        };
    case ARCHITECTURE_DISPLAY_NONACTIVE:
        return {
            ...state,
            architecture_active: false
        };
    case DEPLOY_MODEL_ACTIVE:
        return {
            ...state,
            deploy_model_active: true
        };
    case DEPLOY_MODEL_NONACTIVE:
        return {
            ...state,
            deploy_model_active: false
        };
    case MODEL_FILES_ACTIVE:
        return {
            ...state,
            model_files_active: true
        };
    case MODEL_FILES_NONACTIVE:
        return {
            ...state,
            model_files_active: false
        };
    default:
      return state
  }
}
