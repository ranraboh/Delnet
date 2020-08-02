import { GET_USER_DATASETS, CREATE_DATASET, DELETE_DATASET, SELECT_DATASET, GET_DATASET_TEAM, ADD_ITEM, ADD_LABEL, DELETE_LABEL, DATASET_ANALYZE_ACTIVE, DATASET_ANALYZE_NONACTIVE, GET_DATASET_ANALYSIS, DATASET_STATICS_ACTIVE, DATASET_STATICS_NONACTIVE, DATASET_CONTRIBUTIONS_ACTIVE, DATASET_CONTRIBUTIONS_NONACTIVE, DATASET_MODELS_GRAPH_ACTIVE, DATASET_MODELS_GRAPH_NONACTIVE, DATE_UPLOAD_GRAPH_ACTIVE, DATE_UPLOAD_GRAPH_NONACTIVE, GET_DATE_DISTRIBUTION, GET_USER_CONTRIBUTION, GET_DATASET_PROJECTS_PERFORMANCE } from '../actions/types.js';
import { GET_ITEMS_COUNT, GET_DATASETS_ITEMS_AMOUNT, DATASET_DETAILS_ACTIVE, DATASET_DETAILS_NONACTIVE, GET_LABELS_COUNT, GET_DATASET_LABELS, GET_DATA_ITEMS, DELETE_DATA_ITEM } from '../actions/types.js';
import {GET_NOTIFICATION_DATASET, COLLECTORS_TEAM_ACTIVE, COLLECTORS_TEAM_NONACTIVE, LABELS_SECTION_ACTIVE, LABELS_SECTION_NONACTIVE, ITEMS_SECTION_ACTIVE, ITEMS_SECTION_NONACTIVE, ADD_ITEM_ACTIVE,ADD_LABEL_ACTIVE , ADD_LABEL_NONACTIVE, ADD_ITEM_NONACTIVE, LABEL_DISTRIBUTION_ACTIVE, LABEL_DISTRIBUTION_NONACTIVE } from "../actions/types.js";

const initialState = {
    user_datasets: null,
    show_notification_datasets: null,
    dataset_selected: {
        id: window.localStorage.getItem('dataset-id'),
        name: window.localStorage.getItem('dataset-name'),
        description: window.localStorage.getItem('description'),
        create_date: window.localStorage.getItem('dataset-create-date'),
        user: window.localStorage.getItem('dataset-user'),
        team: null,
        labels: null,
        labels_quantity: null,
        pages: -1,
        items: [],
        analysis: null
    },
    user_contribution: null,
    date_distribution: null,
    dataset_projects: null
}
const toggleInitialState = {
    dataset_display: {
        dataset_details: false,
        collectors_team: false,
        labels_section: false,
        items_section: false, 
        add_label: false,
        add_item: true,
        analyze: true,
        statics: false,
        user_contributions: false,
        date_distribution: false,
        label_distribution: false,
        dataset_projects: false
    }
}
export function datasetsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_NOTIFICATION_DATASET:
            console.log("redusershiran")
            console.log(action.payload)


            return {
                ...state,
                show_notification_datasets: action.payload
            }
        case GET_USER_DATASETS: 
            return {
                ...state,
                user_datasets: action.payload
            }
        case GET_DATASET_TEAM:
            return {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    team: action.payload,
                    team_size: action.payload.length
                }
            }
        case GET_DATA_ITEMS:
            let new_state =  {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    pages: action.payload.count,
                }
            }
            new_state.dataset_selected.items[action.payload.page] = action.payload.results;
            return new_state
        case GET_DATASET_LABELS:
            return {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    labels: action.payload,
                    labels_quantity: action.payload.length
                }
            }  
        case GET_DATASETS_ITEMS_AMOUNT:
            return {
                ...state,
                datasets_items_quantity: action.payload   
            }
        case GET_LABELS_COUNT:
            return {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    labels_quantity: action.payload.count
                }
            }
        case GET_ITEMS_COUNT:
            return {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    items_quantity: action.payload.count
                }
            }      
        case CREATE_DATASET:
            return {
                ...state,
                dataset_inserted: action.payload
            }
        case DELETE_DATASET:
            return {
                ...state,
                dataset_delete: action.payload
            }
        case SELECT_DATASET:
            return {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    id: action.payload.id,
                    name: action.payload.name,
                    description: action.payload.description,
                    create_date: action.payload.create_date,
                    user: action.payload.user,
                }
            }
        case DELETE_DATA_ITEM:
            return {
                ...state,
                dataitem_delete: action.payload
            }
        case DELETE_LABEL:
            return {
                ...state,
                datalabel_delete: action.payload
            }
        case ADD_LABEL:
            return {
                ...state,
                datalabel_added: action.payload
            }
        case ADD_ITEM:
            return {
                ...state,
                dataitem_added: action.payload
            }
        case GET_DATASET_ANALYSIS:
            return {
                ...state,
                analysis: action.payload
            }
        case GET_DATE_DISTRIBUTION:
            return {
                ...state,
                date_distribution: action.payload
            }
        case GET_USER_CONTRIBUTION:
            return {
                ...state,
                user_contribution: action.payload
            }
        case GET_DATASET_PROJECTS_PERFORMANCE:
            return {
                ...state, 
                dataset_projects: action.payload
            }
        default:
            return state;
    }
}

export function datasetsToggleReducer(state = toggleInitialState, action) {
        switch(action.type) {
        case DATASET_DETAILS_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    dataset_details: true
                }
            }
        case DATASET_DETAILS_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    dataset_details: false
                }
            }
        case COLLECTORS_TEAM_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    collectors_team: true
                }
            }
        case COLLECTORS_TEAM_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    collectors_team: false
                }
            }
        case LABELS_SECTION_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    labels_section: true
                }
            }
        case LABELS_SECTION_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    labels_section: false
                }
            }
        case ITEMS_SECTION_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    items_section: true
                }
            }
        case ITEMS_SECTION_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    items_section: false
                }
            }
        case ADD_LABEL_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    add_label: true
                }
            }
        case ADD_LABEL_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    add_label: false
                }
            }
        case ADD_ITEM_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    add_item: true
                }
            }
        case ADD_ITEM_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    add_item: false
                }
            }
        case DATASET_ANALYZE_ACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    analyze: true
                }
            }
        case DATASET_ANALYZE_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    analyze: false
                }
            }
        case DATASET_STATICS_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    statics: true
                }
            }
        case DATASET_STATICS_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    statics: false
                }
            }
        case DATASET_CONTRIBUTIONS_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    user_contributions: true
                }
            }
        case DATASET_CONTRIBUTIONS_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    user_contributions: false
                }
            }
        case DATASET_MODELS_GRAPH_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    dataset_projects: true
                }
            }
        case DATASET_MODELS_GRAPH_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    dataset_projects: false
                }
            }
        case DATE_UPLOAD_GRAPH_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    date_distribution: true
                }
            }
        case DATE_UPLOAD_GRAPH_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    date_distribution: false
                }
            }    
        case LABEL_DISTRIBUTION_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    label_distribution: true
                }
            }
        case LABEL_DISTRIBUTION_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    label_distribution: false
                }
            }          
        default:
            return state;
    }
}