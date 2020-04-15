
import React, { Component } from 'react';

function ConvolutionLayer(props) {
    return (
        <div className="col-md-2 col-xs-6">
            <div className="architecture-arrow"></div>
            <div className="linear-text">
                <h6 className="text text-small">Convolution Layer</h6>
                <h6 className="text text-small">input channels: { props.input_channels }</h6>
                <h6 className="text text-small">output channels: { props.output_channels }</h6>
                <h6 className="text text-small">kernels: { props.kernels }</h6>
                <h6 className="text text-small">strides: { props.strides }</h6>
            </div>
        </div>
    );
}


export default ConvolutionLayer;