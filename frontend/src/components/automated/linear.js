
import React, { Component } from 'react';

function LinearLayer(props) {
    return (
        <div className="linear-section">
            <div className="architecture-arrow"></div>
            <div className="linear-text">
                <h6 className="text text-small">Fully Connected</h6>
                <h6 className="text text-small">{ props.input_size } => { props.output_size }</h6>
                <h6 className="text text-small">input nodes: { props.input_size }</h6>
                <h6 className="text text-small">output nodes: { props.output_size }</h6>
            </div>
        </div>
    );
}


export default LinearLayer;