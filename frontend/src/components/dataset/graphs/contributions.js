

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getUserContributions } from '../../../actions/dataset/get';
import PieChart from '../../graph/pie';

class UserContribution extends Component {
    constructor(props) {
        super(props)

        /* get user contributions data from server-backend */
        if (this.props.user_contribution == null)
            this.props.getUserContributions(this.props.dataset_data.id)
    }

    render() {
        if (this.props.user_contribution == null)
            return ''
        if (this.props.user_contribution.length == 0) {
            return <div className="section-in-main">
            <h1 className="dataset-header-title dataset-header-blue">
                Collectors Contribution
            </h1>
            <p/>
            <h4 className="dataset-graph-intro">
                the graph shows team members activity or contribution <br/> 
                it shows how many items or samples each user have uploaded <br/> 
            </h4>
            <p/>
            <h4 className="dataset-graph-intro text-blue">
                dataset is empty and doesn't contains any samples. <br/>
                therefore the contribution of any member team is nil.
            </h4>
        </div>
        }
        return (
            <div className="section-in-main">
                <div className="header-section-v2">
                    <h1 className="dataset-header-title dataset-header-blue">
                        Collectors Contribution
                    </h1>
                </div>
                <h4 className="dataset-graph-intro">
                    the graph shows team members activity or contribution <br/> 
                    it shows how many items or samples each user have uploaded <br/> 
                </h4>
                <PieChart height="240px" data={ this.props.user_contribution } category="Contribution" display="user" value="items_quantity" />                
            </div>       
        );
    }
}
const mapStateToProps = state => {
    return {
        dataset_data: state.datasetsReducer.dataset_selected,
        user_contribution: state.datasetsReducer.user_contribution,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getUserContributions: (dataset_id) => {
            dispatch(getUserContributions(dataset_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContribution);