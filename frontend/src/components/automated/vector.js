
import React, { Component } from 'react';

function Vector(props) {
    var neurons = [];
    for (var i = 0; i < props.size; i++) {
        neurons.push(i);
    }
    return (
        <div className="col-md-1 col-xs-4 vector-section">
            {
                neurons.map((neuron) =>
                    <div className="neuron-shape"></div>
                )
            }
            <h6 className="text">Size: { props.size }</h6>
        </div>
    );
}


export default Vector;