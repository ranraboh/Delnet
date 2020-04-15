
import React, { Component } from 'react';

function Shape2D(props) {
    return (
        <div className="col-md-1 col-xs-3">
            <div className="twod-shape">

            </div>
            <p/>
            <h6 className="text">Size: { props.width }X{ props.height }</h6>
        </div>
    );
}


export default Shape2D;