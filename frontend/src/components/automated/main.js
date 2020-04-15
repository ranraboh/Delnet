import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import AmbGeneralDetails from './details.js'
import AmbModelGenerator from './model.js'
import ModelArchitercture from './architecture.js';

class AutomatedModelMain extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="main-automated-model">
                <AmbGeneralDetails />
                <AmbModelGenerator />
                <ModelArchitercture />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AutomatedModelMain);
