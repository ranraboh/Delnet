import { GET_PROJECT_LAYERS, SELECT_LAYER, UPDATE_LAYER, UPDATE_MODEL_DETAILS, ADD_LAYER, BUILDING_STAGE, KNOWN_MODEL_SELECT, BUILD_TYPE, ABORT_LAYER_SELECTION, DISPATCH_LAYERS, DELETE_LAYER, GET_KNOWN_MODELS } from '../actions/types.js';
import { init_new_layer } from '../components/automated/actions/init.js'
import { INTRO_STAGE, MODEL_TYPE_STAGE ,MODEL_BUILDUP, CUSTOMIZABLE_MODEL } from '../components/automated/actions/enums.js';

const initialState = {
    stage: INTRO_STAGE,
    details: null,
    type: null,
    customizable: {
        layers: [],
        layers_quantity: 0,
        selected_layer: null
    },
    known_model: null,
    known_models: null
}
export function ambReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_LAYER:
            return {
                ...state,
                customizable: {
                    ...state.customizable,
                    selected_layer: action.payload
                }
            }
        case ABORT_LAYER_SELECTION: 
            return {
                ...state,
                customizable: {
                    ...state.customizable,
                    selected_layer: null
                }
            }
        case ADD_LAYER:
            let new_layer = init_new_layer(state, action.payload.height, action.payload.width)
            return {
                ...state,
                customizable: {
                    ...state.customizable,
                    selected_layer: new_layer,
                    layers: state.customizable.layers.concat(new_layer),
                    layers_quantity: state.customizable.layers_quantity + 1
                }
            }
        case DISPATCH_LAYERS: 
            return {
                ...state,
                customizable: {
                    ...state.customizable,
                    layers: action.payload,
                    layers_quantity: action.payload.length
                }
            }
        case DELETE_LAYER:
            let layers = state.customizable.layers
            delete layers[parseInt(action.payload)-1]
            return {
                ...state,
                customizable: {
                    ...state.customizable,
                    layers: layers,
                    layers_quantity: state.customizable.layers_quantity - 1
                }
            }
        case UPDATE_LAYER:
            let new_state = {
                ...state,
                customizable: {
                    ...state.customizable,
                    selected_layer: action.payload
                }
            }
            new_state.customizable.layers[action.payload.id - 1] = action.payload
            if (state.customizable.layers_quantity != action.payload.id)
                new_state.customizable.layers[action.payload.id].input = action.payload.output 
            return new_state
        case UPDATE_MODEL_DETAILS: 
            return {
                ...state,
                details: action.payload
            }
        case BUILDING_STAGE:
            return {
                ...state,
                stage: action.payload
            }
        case KNOWN_MODEL_SELECT: {
            return {
                ...state,
                known_model: {
                    ...state.known_model,
                    name: action.payload
                }
            }
        }
        case BUILD_TYPE:
            return {
                ...state,
                type: action.payload
            }
        case GET_KNOWN_MODELS:
            return {
                ...state,
                known_models: action.payload
            }
        case GET_PROJECT_LAYERS:
            console.log(action.payload)
            if (action.payload.valid == true) {
                return {
                    ...state,
                    customizable: {
                        ...state.customizable,
                        layers: action.payload.layers,
                        layers_quantity: action.payload.layers.length
                    }
                }
            } else {
                return {
                    ...state,
                    customizable: {
                        ...state.customizable,
                        layers: [],
                        layers_quantity: 0
                    }
                }
            }
    default:
      return state
  }
}