
import React, { Component } from 'react';

function LongVector(props) {
    return (
        <div className="col-md-1 col-xs-4">
            <div className="neuron-shape"></div>
            <div className="neuron-shape"></div>
            <div className="neuron-shape"></div>
            <div className="neuron-shape"></div>
            <div className="neuron-shape"></div>
            <div className="dots"></div>
            <div className="dots"></div>
            <div className="dots"></div>
            <div className="neuron-shape"></div>
            <h6 className="text">Size: { props.size }</h6>
        </div>
    );
}


export default LongVector;