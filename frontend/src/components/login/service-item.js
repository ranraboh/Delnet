import React from 'react';

function ServiceItem(props) {
    return (
        <div className="col-md-4 col-xs-12">
            <div id={ props.id } className="icon-container">
                <p id={props.color + "-icon"} className="icon">{ props.sign }</p>
            </div>
            <h4 id={props.color + "-service-title"} className="service-item-title">{ props.title }</h4>
            <h5 className="service-text">{props.description}</h5>
        </div>
    );
}

export default ServiceItem;
