
import React, { Component } from 'react';
import { display_size } from './actions/display.js';

function ConvolutionLayer(props) {
    return (
            <div className="row">
                <div className="col-2">
                    <div className="architecture-chart-text">
                        <h6 className="text text-small">Convolution Layer</h6>
                        <h6 className="text text-small">{ display_size(props.input) } => {display_size(props.output)}</h6>
                    </div>
                </div>
                <div className="col-2">
                    <div className="architecture-chart-text">
                        <h6 className="text text-small">input channels: { props.input_channels }</h6>
                        <h6 className="text text-small">output channels: { props.output_channels }</h6>
                        <h6 className="text text-small">kernels: { display_size(props.kernels) }</h6>
                    </div>
                </div>
                <div className="col-1">
                    <div className="architecture-arrow"></div>
                </div>
            </div>
    );
}

export default ConvolutionLayer;