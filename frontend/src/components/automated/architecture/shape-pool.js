
import React, { Component } from 'react';
import { display_size } from '../actions/display.js';

function PoolShape3D(props) {
    var td_matrix = [];
    for (var i = 1; i <= Math.min(props.size[0], 6); i++) {
        td_matrix.push(i);
    }
    return (
        <div className="row">
            <div className="shape-3d-wrapper">
            {
                td_matrix.map((index) =>
                    <div id={"shape-" + index} className={"pool-shape-3d shape-3d-" + index }></div>
                )
            }
            </div>
        </div>
    );
}


export default PoolShape3D;
