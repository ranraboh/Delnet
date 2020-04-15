import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homepage } from '../../appconf.js';
import LinearLayer from './linear.js';
import Shape2D from "./shape-2d.js";
import LongVector from './longvector.js';
import Shape3D from './shape-3d.js';
import ConvolutionLayer from './convolution.js';
import Vector from './vector.js';

class ModelArchitercture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user
        }

        /* bind inner methods */
        this.draw_first_shape = this.draw_first_shape.bind(this);
        this.draw_layer = this.draw_layer.bind(this);
    }

    draw_first_shape() {
        console.log('first draw')
        console.log(this.props.layers)
        if (this.props.layers.length == 0)
            return
        if (this.props.layers[0].type == 'Linear')
            return (
                <div className="row">
                    <LongVector size={ this.props.layers[0].input } />
                </div>
            )
        return ''
    }

    draw_layer(layer) {
        if (layer.type == 'Linear') {
            return (
                <div className="row">
                <LinearLayer input_size={ layer.input } output_size={ layer.output } />
                { (layer.output > 6) ? <LongVector size={ layer.output } /> : <Vector size={layer.output} /> }
            </div>

            )
        }
        return '';

    }

    componentWillMount() {
        console.log(this.props.loggedIn)
        if (this.props.loggedIn === false || this.props.loggedIn === 'false')
            window.location = homepage + '/login'
    }

    render() {
        let first_shape = this.draw_first_shape()
        return (
            <div className="model-architecture-wrapper">
                <div  id="model-architecture" className="section-in-main">
                    <div className="header-section-v2">
                        <h1 className="dataset-header-title dataset-header-blue">
                            Model Architecture
                        </h1>
                    </div>
                    <div className="architecture-chart container">
                        <div className="row">
                            { first_shape }                               
                            {
                                this.props.layers.map((layer) => 
                                    this.draw_layer(layer)
                                )
                            }
                            {/*
                            <Shape2D height="20" width="30" />
                            <LinearLayer input_size="50" output_size="30" />
                            <LongVector size="50" />
                            <ConvolutionLayer input_channels="30" output_channels="50" kernels="1024" strides="1" />
                            <Shape3D /> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        layers: state.ambReducer.layers
    }
}

const mapDispatchToProps = disaptch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelArchitercture);