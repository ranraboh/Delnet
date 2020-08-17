import React from 'react';
import { display_size } from './actions/display';
import { valid_layer_configuration } from './actions/computations'

function LayerItem(props) {
    let colors = [ 'blue', 'red', 'green', 'aqua', 'pink', 'yellow', 'orange', 'purple' ];
    let color = colors[(props.id - 1) % colors.length]
    let isValid = valid_layer_configuration(props.layer)
    if (props.params == null)
        return ''
    return (
        <div className={ (!isValid)?"warning-layer row layer-row" : (props.error)?"error-layer row layer-row":(props.concern)?"concern-layer row layer-row":"row layer-row" }>
                <div className="col-4">
                    <div className={ "icon-container icon-container-" + color }>
                        <p>{ props.id }</p>
                    </div>
                    <h4 className={ "text-" + color } >Type: { props.type }</h4>
                    {
                        (props.enable_modifications)?
                        <div className="buttons">
                            <i className="fa fa-edit fa-lg edit-primary" onClick={ () => props.on_select(props.layer) }></i>
                            &nbsp;
                            <i className="fa fa-close fa-lg delete-danger" onClick={ () => props.on_delete(props.layer.id) }></i>
                            &nbsp;&nbsp;
                            <i className="fa fa-plus add-success" onClick={ () => props.on_insert(props.layer.id) }></i>
                        </div>: ''
                    }
                    <h6 className="warning-text" >
                            {
                                (!isValid)?" Crucial parameters does not set and therefore layer configuration is invalid":""
                            }
                    </h6>
                </div>
                <div className="col-4">
                    <h5>Type: { props.type }</h5>
                    <h5>Input: { props.input }</h5>
                    <h5>Output: { (isValid)? props.output: "Unknown" }</h5>
                    <h5>Activation: { props.layer.activation }</h5>
                </div>
                <div className="col-4">
                {
                        (props.layer.reshape)?(<h5 className="text-blue">Reshape: { props.layer.reshape }</h5>): ""
                }
                {
                    (props.params.length > 0)?
                    props.params.map((param) => {
                        if (param.dimensions == 0)  {
                            let value = props.layer[param.id]
                            if (value == "")
                                return <h5>{param.name + ' : Unset'}</h5>
                            return <h5>{param.name + ' : ' +  props.layer[param.id]}</h5>
                        } else {
                            if (param.type == 'choose') 
                                return <h5>{ param.name + " : " + param.options[props.layer[param.id]] }</h5>
                            else{
                                if (param.name == "Input Features" && props.layer.parameters != null && 'in_features' in props.layer.parameters)
                                    return <h5>{ param.name + ' : ' + props.layer.parameters['in_features'] } </h5>
                                return <h5>{ param.name + ' : ' + display_size(props.layer[param.id]) }</h5>
                            }
                        }
                    }):''
                }
                <p/>

                </div>
            </div>
    );
}
export default LayerItem;
