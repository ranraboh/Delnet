import React from 'react';

function ModelItem(props) {
    return ( 
        <div class="col-sm-6 col-md-4">
        <div class="mu-team-content-single">
            <div class="mu-team-profile">
                <img src={ props.image } className={ (props.update)?"prebuild-project-image" : "prebuild-model-image"} onClick={ props.on_select } />
                <div className={(props.is_selected)?'known-selected':'known-selected-hide'} >
                    <h4 className="known-selected-text">Selected</h4>
                </div>
            </div>
            <div class="mu-team-info">
                <h4>{ props.name }</h4>
                <span>{ props.description }</span>
            </div>
        </div>
    </div>
    );
}

export default ModelItem;
