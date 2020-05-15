import { INTRO_STAGE, PROJECT_DETAILS_STAGE, MODEL_TYPE_STAGE, MODEL_BUILDUP   } from './actions/enums.js'
import { KNOWN_MODEL, CUSTOMIZABLE_MODEL } from './actions/enums.js'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import AmbGeneralDetails from './details'
import AmbModelGenerator from './model'
import AmbArchitercture from './architerctue-wrapper';
import IntroModelBuilder from './intro';
import BuildOptions from '../automated/build-options';
import Prebuild from './prebuild';

class AutomatedModelMain extends Component {
    constructor(props) {
        super(props)
        this.stage_components = this.stage_components.bind(this);
    }

    stage_components() {
        console.log(this.props.stage)
        console.log(this.props.model_type)
        if (this.props.stage == INTRO_STAGE) {
            return (
                <IntroModelBuilder/>
            )
        } else if (this.props.stage == PROJECT_DETAILS_STAGE) {
            return (
                <AmbGeneralDetails />
            )
        } else if (this.props.stage == MODEL_TYPE_STAGE) {
            return (
                <BuildOptions />
            )
        } else if (this.props.stage == MODEL_BUILDUP && this.props.model_type == KNOWN_MODEL) {
            return (
                <Prebuild />
            )
        } else if (this.props.stage == MODEL_BUILDUP && this.props.model_type == CUSTOMIZABLE_MODEL) {
            return (<div>
                <AmbModelGenerator />
                <AmbArchitercture />
            </div>)
        }
    }

    render() {
        return (
            <div id="main-automated-model">
                { this.stage_components() }    
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        stage: state.ambReducer.stage,
        model_type: state.ambReducer.type
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AutomatedModelMain);
