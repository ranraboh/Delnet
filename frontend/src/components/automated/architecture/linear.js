
import React, { Component } from 'react';

function LinearLayer(props) {
    
    return (
        <div className="row">
            <div className="col-2">
                <div className="architecture-chart-text">
                    <h6 className="text text-small">Fully Connected</h6>
                    <h6 className="text text-small">{ props.input_size } => { props.output_size }</h6>
                    <h6 className="text text-small">input nodes: { props.input_size }</h6>
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