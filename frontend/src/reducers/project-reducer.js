import { GET_PROJECT_ANALYSIS, GET_ACCURACY_RANGE, GET_SEARCH_DATASETS, GET_DATASETS_PUBLIC, GET_DATASET_OFFERS, GET_UNLABLED_SMAPLES ,CHANGE_TASK_COMPLETE,GET_CHECKLIST_DONE,GET_CHECKLIST_NOT_DONE,GET_TASK,GET_NOTIFICTION_PROJECT, GET_FILE_CONTENT, UPDATE_PROJECT, GET_PROJECT_FILES ,GET_USER_PROJECTS, CREATE_PROJECT, DELETE_PROJECT, SELECT_PROJECT, GET_PROJECT_TEAM, ADD_MEMBER_TEAM, DELETE_MEMBER_TEAM, SELECT_FILE, GET_PROJECT_STATICS } from '../actions/types.js'
import { ADD_NOTIFICTION_PROJECT, ADD_TASK, CHECKLIST_ABORT_UPDATE_STATE, CHECK_LIST_UPDATE_STATE } from '../actions/types'
 
const initialState = {
    user_projects: null,
    notifications: null,
    tasks:null,
    add_Task:null,
    project_created: null,
    project_deleted: null,
    taskComplete: null,
    taskNotComplete: null,
    changeTaskComplete:null,
    update_state: null,
    project_selected: {
      id: window.localStorage.getItem('project-id'),
      project_name: window.localStorage.getItem('project-name'),
      description: window.localStorage.getItem('description'),
      result: window.localStorage.getItem('result'),
      dataset: window.localStorage.getItem('dataset'),
      model_type: window.localStorage.getItem('model_type'),
      type: window.localStorage.getItem('type'),
      type_description: window.localStorage.getItem('type_description'),
      height: window.localStorage.getItem('height'),
      width: window.localStorage.getItem('width'),
      train_percentage: window.localStorage.getItem('train_percentage'),
      dev_percentage: window.localStorage.getItem('dev_percentage'),
      test_percentage: window.localStorage.getItem('test_percentage'),
      files: [],
      files_quantity: -1,
      statics: null,
      analysis: null,
      accuracy_range: null,
      offers: null,
      unlabled: null,
      team: null
    },
    public_datasets: null,
    search_datasets: null,
    file_selected: {
      id: -1,
      name: null,
      type: null,
      size: null,
      content: null
    }
}
export function projectReducer(state = initialState, action) {
    switch (action.type) {
    case GET_CHECKLIST_DONE:
      return {
        ...state,
        taskComplete: action.payload
      };
    case GET_CHECKLIST_NOT_DONE:
        return {
          ...state,
          taskNotComplete: action.payload
        }; 
    case CHANGE_TASK_COMPLETE:
        return {
          ...state,
          changeTaskComplete: action.payload
        };    
    case GET_TASK:
      return {
        ...state,
        tasks: action.payload
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: state.tasks.concat(action.payload)
      }
    case GET_NOTIFICTION_PROJECT:
      return {
        ...state,
        notifications: action.payload
      };
    case GET_USER_PROJECTS:
      return {
        ...state,
        user_projects: action.payload
      };
    case CREATE_PROJECT: 
    return {
        ...state,
        project_created: action.payload
    }
    case DELETE_PROJECT:
      return {
        ...state,
        project_deleted: action.payload
      }
    case SELECT_PROJECT:
      return {
        ...state,
        project_selected: {
          id: action.payload.id,
          project_name: action.payload.project_name,
          description: action.payload.description,
          result: action.payload.result,
          dataset: action.payload.dataset,
          model_type: action.payload.model_type
        }
      }
    case UPDATE_PROJECT:
      return {
        ...state,
        project_selected: {
          ...state.project_selected,
          project_name: action.payload.request.name,
          description: action.payload.request.description,
          result: action.payload.request.result,
          dataset: action.payload.request.dataset
        }
      }
    case GET_PROJECT_FILES: 
      return {
        ...state,
        project_selected: {
          ...state.project_selected,
          files: action.payload
        } 
      }
    case ADD_NOTIFICTION_PROJECT:
      return {
        ...state,
        notifications: [action.payload].concat(state.notifications)
      }
    case SELECT_FILE: 
      let selected_file = action.payload[0]
      return {
        ...state,
        file_selected: {
          ...state.file_selected,
          id: selected_file.id,
          name: selected_file.name,
          type: selected_file.type,
          size: selected_file.size,
          insert_by: selected_file.insert_by,
          insertion_date: selected_file.insertion_date
        }
      }
    case GET_FILE_CONTENT: 
      return {
        ...state,
        file_selected: {
          ...state.file_selected,
          content: action.payload.content
        }
      }
    case GET_PROJECT_TEAM:
        return {
          ...state,
          project_selected: {
            ...state.project_selected,
            team: action.payload
          }
        }
        case ADD_MEMBER_TEAM: 
        return {
            ...state,
            member_added: action.payload
        }
        case DELETE_MEMBER_TEAM:
          return {
            ...state,
            member_deleted: action.payload
        }
        case GET_PROJECT_STATICS:
          return {
            ...state,
            project_selected: {
              ...state.project_selected,
              statics: action.payload
            }
          }
        case GET_PROJECT_ANALYSIS:
          return {
            ...state,
            project_selected: {
              ...state.project_selected,
              analysis: action.payload
            }
          }
        case CHECK_LIST_UPDATE_STATE:
          return {
            ...state,
            update_state: action.payload
          }
        case CHECKLIST_ABORT_UPDATE_STATE:
          return {
            ...state,
            update_state: null
          }
        case GET_ACCURACY_RANGE:
          return {
            ...state,
            project_selected: {
              ...state.project_selected,
              accuracy_range: action.payload
            }
          }
    default:
      return state
  }
}