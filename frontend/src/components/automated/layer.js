import React from 'react';
import { display_size } from './actions/display.js';

function LayerItem(props) {
    let colors = [ 'blue', 'red', 'green', 'aqua', 'pink', 'yellow', 'orange', 'purple' ];
    let color = colors[(props.id - 1) % colors.length]
    return (
        <div className={ (props.error)?"error-layer row layer-row": "row layer-row" }>
                <div className="col-4">
                    <div className={ "icon-container icon-container-" + color }>
                        <p>{ props.id }</p>
                    </div>
                    <h4 className={ "text-" + color } >Type: { props.type }</h4>
                    <div className="buttons">
                    <i className="fa fa-edit fa-lg edit-primary" onClick={ () => props.on_select(props.layer) }></i>
                    &nbsp;
                    <i className="fa fa-close fa-lg delete-danger" onClick={ () => props.on_delete(props.layer.id) }></i>
                    {/*btn btn-outline-info btn-datasets */}
                    <i className="fa fa-add fa-lg add-success" onClick={ () => props.on_insert(props.layer.id) }></i>
                </div>
                </div>
                <div className="col-4">
                    <h5>Type: { props.type }</h5>
                    <h5>Input: { props.input }</h5>
                    <h5>Output: { props.output }</h5>
                    <h5>Activation: { props.activation }</h5>
                </div>
                <div className="col-4">
                {
                    props.params.map((param) => {
                        if (param.dimensions == 0)  
                            return <h5>{param.name + ' : ' +  props.layer[param.id]}</h5>
                        else {
                            if (param.type == 'choose') 
                                return <h5>{ param.name + " : " + param.options[props.layer[param.id]] }</h5>
                            else
                                return <h5>{param.name + ' : ' + display_size(props.layer[param.id])}</h5>
                        }
                    })
                }
                </div>
            </div>
    );
}
export default LayerItem;
