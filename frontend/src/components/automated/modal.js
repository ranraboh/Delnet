import React, { Component } from 'react';
import { connect } from 'react-redux';
import { disselectLayer, dispatchLayers } from '../../actions/amb/state.js';
import { renew_layers } from './actions/computations'
import SelectedLayer from './select.js';
import LayerParams from './params.js';

class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user
        }

        /* bind inner methods */
        this.close_handler = this.close_handler.bind(this);
    }

    close_handler() {
        let layers = renew_layers(this.props.layers)
        this.props.dispatchLayers(layers)
        this.props.disselectLayer();
    }

    render() {
        return (
            <div id="selected_layer_modal" class="modal">
                <button id="btnclose" type="button" class="btn btn-outline-primary btn-close" onClick={ this.close_handler }>
                    <i className="fa fa-check"></i>
                </button>
                <SelectedLayer />
                <LayerParams />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        layers: state.ambReducer.customizable.layers
    }
}

const mapDispatchToProps = disaptch => {
    return {
        disselectLayer: () => {
            disaptch(disselectLayer())
        },
        dispatchLayers: (layers) => {
            disaptch(dispatchLayers(layers))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);