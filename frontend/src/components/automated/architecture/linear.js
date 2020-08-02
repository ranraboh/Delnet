
import React, { Component } from 'react';
import { display_size } from '../actions/display.js'

function LinearLayer(props) {
    
    return (
        <div className="row">
            <div className="col-2">
                <div className="architecture-chart-text">
                    <h6 className="text text-small">Fully Connected</h6>
                    <h6 className="text text-small">{ props.input_size + ' => ' + props.output_size }</h6>
                    <h6 className="text text-small">input nodes: { display_size(props.input_size) }</h6>
                    <h6 className="text text-small">output nodes: { props.output_size }</h6>
                </div>
            </div>
            <div className="col-2">
                <div className="architecture-arrow"></div>
            </div>
        </div>
    );
}


export default LinearLayer;