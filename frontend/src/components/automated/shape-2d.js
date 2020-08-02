
import React, { Component } from 'react';

function Shape2D(props) {
    return (
        <div className="row">
            <div className="shape-2d">

            </div>
            <p/>
            <h6 className="text">Size: { props.width }X{ props.height }</h6>
        </div>
    );
}


export default Shape2D;