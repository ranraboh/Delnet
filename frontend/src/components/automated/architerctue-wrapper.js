import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModelArchitercture from './architecture';

class AmbArchitercture extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="model-architecture-wrapper">
                <div id="model-architecture" className="section-in-main">
                    <div className="header-section-v1 header-v1-purple">
                        <h1 id="projects-title">
                            Model Architecture
                        </h1>
                        <h2 id="projects-intro">
                            chart display visually the model architecture 
                        </h2>
                    </div>
                    <ModelArchitercture layers={ this.props.layers } />
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        layers: state.ambReducer.customizable.layers
    }
}

const mapDispatchToProps = disaptch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AmbArchitercture);