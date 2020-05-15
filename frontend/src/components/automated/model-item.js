import React from 'react';

function ModelItem(props) {
    return ( 
        <div class="col-sm-6 col-md-4">
        <div class="mu-team-content-single">
            <div class="mu-team-profile">
                <img src={ props.image } alt="team member" className="prebuild-model-image" />
                <div class="mu-team-social-info">
                    <a href="#"><i class="icon-social-facebook">Details</i></a>
                    <a href="#"><i class="icon-social-twitter" onClick={ props.on_select }>Select</i></a>
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
