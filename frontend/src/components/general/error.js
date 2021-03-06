
import React, { Component } from 'react';

function ErrorBox(props) {
    if (props.message == '' || props.message == null)
        return ''
    return (
    <div class={ "alert alert-" + props.color }>
        <strong>{ props.strong }</strong> { props.message }
    </div>
    );
}
export default ErrorBox;