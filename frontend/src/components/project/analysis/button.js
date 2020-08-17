import React from 'react';

function AnalysisButton(props) {
    if (props.selected == true) {
        return (
            <button className="btn btn-warning small-spacing text-poppins text-bold" onClick={ props.onClick }>
                { props.text }
            </button> 
        )
    }
    return (
        <button className="btn btn-primary small-spacing text-poppins text-bold" onClick={ props.onClick }>
            { props.text }
        </button> 
    )
}

export default AnalysisButton;