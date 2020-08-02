
import React, { Component } from 'react';

function ErrorShape(props) {
    console.log("error shape")
    return (
        <div className="row">
            <div className="error-shape">
                <h4>
                    <span className="text-bold"> Error: </span>
                    { props.error }
                </h4>
            </div>
            <p/>
        </div>
    );
}


export default ErrorShape;