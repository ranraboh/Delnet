import React, { Component } from 'react';
import { detech_errors } from "../actions/computations";
import LinearLayer from './linear.js';
import LongVector from './longvector.js';
import Shape3D from './shape-3d.js';
import ConvolutionLayer from './convolution.js';
import Vector from './vector.js';
import FlattenLayer from "./flatten.js";
import PoolLayer from './pool.js';
import PoolShape3D from './shape-pool.js';
import ErrorShape from './errorbox.js';

class ModelArchitercture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user
        }

        /* bind inner methods */
        this.draw_first_shape = this.draw_first_shape.bind(this);
        this.draw_layer = this.draw_layer.bind(this);
        this.draw_error_shape = this.draw_error_shape.bind(this);
    }

    draw_first_shape() {
        if (this.props.layers.length == 0)
            return ''
        return (
            <Shape3D size={ this.props.layers[0].input } />
        )
    }

    draw_layer(layer) {
        if (layer.type == 'Linear') {
            return (
                <div>
                    <LinearLayer input_size={ layer.input } output_size={ layer.output } />
                    { (layer.output > 6) ? <LongVector size={ layer.output } /> : <Vector size={layer.output} /> }
                </div>
            )
        }
        if (layer.type == 'Convolution') {
            return ( 
                <div>
                    <ConvolutionLayer input_channels={ layer.in_channels } output_channels={ layer.out_channels } strides={ layer.strides } kernels={ layer.kernel_size } input={ layer.input } output={ layer.output } />
                    <Shape3D size={ layer.output } />
            </div>
            )
        }
        if (layer.type == 'Flatten') {
            return (
                <div>
                        <FlattenLayer input={ layer.input } output={ layer.output } />
                        { (layer.output > 6) ? <LongVector size={ layer.output } /> : <Vector size={layer.output} /> }
                </div>
            )
        }
        if (layer.type == 'Pooling') {
            return (
                <div>
                    <PoolLayer type={ layer.type } input={ layer.input } output={ layer.output } />
                    <PoolShape3D size= { layer.output } />
                </div>

            )
        }
        return '';

    }

    draw_error_shape(error) {
        console.log("draw error shape")
        if (error.layer == -1)
            return ''
        return (
            <ErrorShape error={ error.error } />
        )
    }

    render() {
        let first_shape = this.draw_first_shape()
        let error = detech_errors(this.props.layers)
        let error_shape = this.draw_error_shape(error)
        return (
            <div className="container architecture-chart">
                    { first_shape }                       
                    {
                        this.props.layers.map((layer) => {
                            if (error.layer != -1 && layer.id >= error.layer)
                                return ''
                            return (
                                this.draw_layer(layer)
                            )
                        })
                    }
                    { error_shape }
            </div>
        )
    }
}


export default ModelArchitercture;