

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MiniSection from './mini';

class Activeness extends Component {
    render() {
        return (
        <div id="activeness-section" className="row">
            <MiniSection size="3" style="primary" category="Projects" value="5" icon="fa-book" />
            <MiniSection size="3" style="info" category="Posts" value="20" icon="fa-comments" />
            <MiniSection size="3" style="success" category="Data Sets" value="1" icon="fa-database" />
            <MiniSection size="3" style="danger" category="Active" value="43/100" icon="fa-thumbs-up" />
        </div>
        );
    }
}
export default Activeness;