import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { MODEL_BUILDUP } from './actions/enums.js';
import { stageAdvance, selectKnownModel, selectCustomizableModel } from '../../actions/amb/state.js'

class BuildOptions extends Component {
    constructor(props) {
        super(props)

        /* bind inner methods */
        this.select_known_model = this.select_known_model.bind(this);
        this.select_customizable_model = this.select_customizable_model.bind(this);
    }

    select_known_model() {
        this.props.stageAdvance(MODEL_BUILDUP);
        this.props.selectKnownModel()
    }

    select_customizable_model() {
        this.props.stageAdvance(MODEL_BUILDUP);
        this.props.selectCustomizableModel()
    }

    render() {
        return (
            <section id="build-options" class="section-in-main">
                <h1 id="build-options-title">
                    Model Building Options
                </h1>
                <div id="build-options-inner">

                    <div className="container">
                        <div className="row">
                            <div className="col-4" onClick={ this.select_known_model }>
                            <h2>
                                Well-known Models
                            </h2>
                            <h4>
                                you can select a neural network model from set of pre-build deep learning models which are well-known top-notch models  
                                for addressing different tasks including image-classification
                            </h4>
                            </div>
                            <div className="col-4" onClick={ this.select_customizable_model }>
                                <h2>
                                Customizable Model
                            </h2>
                            <h4>
                                build a customiazable deep-learning model, declare the structure and architecture of your model
                                using a friendly interface
                            </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        stageAdvance: (stage) => {
            dispatch(stageAdvance(stage))
        },
        selectKnownModel: () => {
            dispatch(selectKnownModel())
        },
        selectCustomizableModel: () => {
            dispatch(selectCustomizableModel())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildOptions);
