import React from 'react';

function StaticsItem(props) {
    console.log('statics item')
    console.log(props)
    if (props.type == 'most-favorite') {
        return (
            <div className="row statics-text">
                <div className="col-6">
                    <h2 className={"tab-indent text-" + props.color }>{ props.category }</h2>
                </div>
                <div className="col-6">
                    <h3>{ props.value[props.id] + ' ( ' + props.value.count + ' times )' }</h3>
                </div>
            </div>
        )
    }
    return (
        <div className="row statics-text">
            <div className="col-6">
                <h2 className={"text-" + props.color }>{ props.category }</h2>
            </div>
            <div className="col-6">
                <h3>{ props.value }</h3>
            </div>
        </div>
    )
}

export default StaticsItem;
