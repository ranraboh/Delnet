import React from 'react';

function DatasetMenuItem(props) {
    if (props.state === true) {
        return (
            <tr className="dataset-menu-row">
            <td>
                <button type="button" class={"btn btn-" + props.button_type + " button-dataset-menu"} onClick={ () => props.hide(props.name) } >
                    <i className={ "fa " + props.icon }></i>
                </button>
            </td>
            <td>
                <span className="dataset-links" onClick={ () => props.hide(props.name) }>{ props.name }</span>
                <span className="dataset-description-link">
                    { props.description }
                </span>
            </td>
        </tr>
        )}
        return (
            <tr className="dataset-menu-row">
            <td>
                <button type="button" class={"btn btn-outline-" + props.button_type + " button-dataset-menu"} onClick={ () => props.activate(props.name) } >
                    <i className={ "fa " + props.icon }></i>
                </button>
            </td>
            <td>
                <span className="dataset-links" onClick={ () => props.activate(props.name) }>{ props.name }</span>
                <span className="dataset-description-link">
                    { props.description }
                </span>
            </td>
        </tr>
        )
}

export default DatasetMenuItem;