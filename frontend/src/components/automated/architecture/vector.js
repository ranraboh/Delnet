
import React, { Component } from 'react';

function Vector(props) {
    var neurons = [];
    for (var i = 0; i < props.size; i++) {
        neurons.push(i);
    }
    return (
        <div className="row">
            {
                neurons.map((neuron) =>
                    <span className="neuron-shape"></span>
                )
            }
            {/*<h6 className="text">Size: { props.size }</h6> */}
        </div>
    );
}


export default Vector;