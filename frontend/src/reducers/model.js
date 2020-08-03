import { ADD_RUN_RECORD, RUN_MODEL, GET_LOSS_TYPES, GET_OPTIMIZER_TYPES, GET_RUN_RESULT_TRAIN, GET_RUN_RESULT_DEV, SELECT_RUN, GET_PROJECT_RUNS, CLEAR_RUN, GET_UNFINISHED_RUNS, GET_LABELS_METRICS, GET_F1_RESULT, DEPLOY_MODEL, TEST_MODEL } from '../actions/types.js'
import { GET_CONFUSION_MATRIX, GET_RECALL_RESULT, GET_PRECISION_RESULT } from '../actions/types.js';

const initialState = {
    run_added: null,
    optimizers: null, 
    loss_types: null,
    selected_run: {
        results: {
            train: null,
            dev: null,
            total: null,
            recall: null,
            precision: null,
            f1: null,
            confusion_matrix: null
        }
    },
    project_runs: null,
    unfinished_runs: null,
    runs_quantity: 0,
    unfinished_runs_quantity: 0,
    deploy_results: [],
    test: null,
}

export function modelReducer(state = initialState, action) {
        let new_state;
        switch(action.type) {
        case ADD_RUN_RECORD:
            return {
                ...state,
                run_added: {
                    id: action.payload.id
                }
            }
        case GET_OPTIMIZER_TYPES:
            return {
                ...state,
                optimizers: action.payload
            }
        case GET_LOSS_TYPES:
            return {
                ...state,
                loss_types: action.payload
            }
        case GET_RUN_RESULT_TRAIN:
            new_state = {
                ...state,
                selected_run: {
                    ...state.selected_run,
                    results: {
                        ...state.selected_run.results,
                        train: action.payload
                    }
                }
            }
            new_state.selected_run.results.train.map((record) => {
                record.accuracy_percent = record.accuracy_rate * 100;
            })
            return new_state
        case GET_RUN_RESULT_DEV:
            new_state = {
                ...state,
                selected_run: {
                    ...state.selected_run,
                    results: {
                        ...state.selected_run.results,
                        dev: action.payload
                    }
                }
            }
            new_state.selected_run.results.dev.map((record) => {
                record.accuracy_percent = record.accuracy_rate * 100;
            })
            return new_state
        case SELECT_RUN:
            let data = action.payload[0]
            return {
                ...state,
                selected_run: {
                    ...state.selected_run,
                    id: data.id,
                    user: data.user,
                    date: data.date,
                    batch_size: data.batch_size,
                    epochs: data.epochs,
                    optimizer: data.optimizer,
                    loss: data.loss_type,
                    learning_rate: data.learning_rate,
                    weight_decay: data.weight_decay,
                    time: data.time,
                    accuracy: data.accuracy,
                    loss_value: data.loss,
                    results: {
                        train: null,
                        dev: null,
                        total: null,
                        labels: null
                    }
                }
            }
        case CLEAR_RUN:
            return {
                ...state,
                selected_run: {
                    results: {
                        train: null,
                        dev: null,
                        total: null,
                        labels: null
                    }
                }
            }
        case GET_PROJECT_RUNS:
            return {
                ...state,
                project_runs: action.payload,
                runs_quantity: action.payload.length
            }
        case GET_UNFINISHED_RUNS:
            return {
                ...state,
                unfinished_runs: action.payload,
                unfinished_runs_quantity: action.payload.length
            }
        case GET_RECALL_RESULT:
            return {
                ...state,
                selected_run: {
                    ...state.selected_run,
                    results: {
                        ...state.selected_run.results,
                        recall: action.payload
                    }
                }
            }
        case GET_PRECISION_RESULT:
            return {
                ...state,
                selected_run: {
                    ...state.selected_run,
                    results: {
                        ...state.selected_run.results,
                        precision: action.payload
                    }
                }
            }
        case GET_F1_RESULT:
            return {
                ...state,
                selected_run: {
                    ...state.selected_run,
                    results: {
                        ...state.selected_run.results,
                        f1: action.payload
                    }
                }
            }
        case GET_CONFUSION_MATRIX:
            return {
                ...state,
                selected_run: {
                    ...state.selected_run,
                    results: {
                        ...state.selected_run.results,
                        confusion_matrix: action.payload
                    }
                }
            }
        case DEPLOY_MODEL:
            return {
                ...state,
                deploy_results: action.payload
            }
        case TEST_MODEL:
            return {
                ...state,
                test: action.payload
            }
        default:
            return state;
    }
}