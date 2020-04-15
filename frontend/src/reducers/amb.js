import { SELECT_LAYER, UPDATE_LAYER, UPDATE_MODEL_DETAILS, ADD_LAYER } from '../actions/types.js';

const initialState = {
    details: null,
    layers: [],
    layers_quantity: 0,
    selected_layer: null
}
export function ambReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_LAYER:
            return {
                ...state,
                selected_layer: action.payload
            }
        case ADD_LAYER:
            let new_layer = {
                id: state.layers_quantity + 1,
                type: 'None',
                input: (state.layers_quantity > 0)? state.layers[state.layers_quantity - 1].output :'--',
                output: '--',
                activation: 'None',
                params_form: []
            }
            return {
                ...state,
                selected_layer: new_layer,
                layers: state.layers.concat(new_layer),
                layers_quantity: state.layers_quantity + 1
            }
        case UPDATE_LAYER:
            let new_state = {
                ...state,
                selected_layer: action.payload
            }
            new_state.layers[action.payload.id - 1] = action.payload
            if (state.layers_quantity != action.payload.id)
                new_state.layers[action.payload.id].input = action.payload.output 
            return new_state
        case UPDATE_MODEL_DETAILS: 
            return {
                details: action.payload
            }
    default:
      return state
  }
}