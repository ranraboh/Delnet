

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getDateDistribution } from '../../../actions/dataset/get';
import BarChart from '../../graph/bar'

class DateDistributionGraph extends Component {
    constructor(props) {
        super(props)

        /* get user contributions data from server-backend */
        if (this.props.date_distribution == null)
            this.props.getDateDistribution(this.props.dataset_data.id)
    }

    render() {
        if (this.props.date_distribution == null)
            return ''
        let max_value = 0
        this.props.date_distribution.map((record) =>{
            if (record.items_quantity > max_value)
                max_value = record.items_quantity
        })

        return (
            <div className="section-in-main">
                <div className="header-section-v2">
                    <h1 className="dataset-header-title dataset-header-blue">
                        Date Distribution
                    </h1>
                </div>
                <h4 className="dataset-graph-intro">
                    the graph shows the activity across time <br/> 
                    that is, the amount of samples that has been uploaded to the dataset for any date <br/>
                </h4>
                <BarChart height="240px" data={ this.props.date_distribution } category="Date Acticity" display="date" value="items_quantity" />                
            </div>       
        );
    }
}
const mapStateToProps = state => {
    return {
        dataset_data: state.datasetsReducer.dataset_selected,
        date_distribution: state.datasetsReducer.date_distribution,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getDateDistribution: (dataset_id) => {
            dispatch(getDateDistribution(dataset_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateDistributionGraph);