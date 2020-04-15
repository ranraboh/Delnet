import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getDatasetsItemsAmount } from '../../actions/datasets.js';
import BarChart from '../graph/bar.js'

class DatasetsItemsGraph extends Component {
    constructor(props) {
		super(props)
        this.props.getDatasetsItemsAmount(this.props.username);
	}
	
    render() {
        return (
            <div id="items-graph-section" className="section-in-main">
                <div className="header-section-v1 header-v1-red">
                    <h1 className="header-v1-title">
                        Items Graph
                    </h1>
                    <h2 className="header-v1-intro">
                        the graph shows the quantity of items of each of your data-sets
                    </h2>
                </div>
				<BarChart data={ this.props.datasets_items_quantity } display="name" value="items_quantity" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        datasets_items_quantity: state.datasetsReducer.datasets_items_quantity,
        username: state.authentication.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
		getDatasetsItemsAmount: (username) => {
            dispatch(getDatasetsItemsAmount(username))
        }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetsItemsGraph);
