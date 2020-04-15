import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BarChart from '../projects/bar-chart.js';

class ItemsQuantityGraph extends Component {
    render() {
        return (
            <div id="items-quantity-graph">
				<BarChart data={ this.props.user_projects } display="project_name" value="result" />
            </div>
        );
    }
}

export default ItemsQuantityGraph;