import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getDatasetLabels, getLabelsCount } from '../../actions/dataset/get';

class LabelsSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataset: {
                user: props.username,
                id: props.dataset_data.id,
                name: props.dataset_data.name,
                description: props.dataset_data.description,
                user: props.dataset_data.user,
                team: props.dataset_data.team,
                labels: props.dataset_data.labels,
                labels_quantity: props.dataset_data.labels_quantity
            }
        }
        if (!this.state.dataset.labels) {
            this.props.getDatasetLabels(this.state.dataset.id);
            this.props.getLabelsCount(this.state.dataset.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataset: nextProps.dataset_data
        })
    }

    render() {
        console.log('render')
        console.log(this.state)
        if (!this.state.dataset || !this.state.dataset.labels) {
            return <h2>No labels</h2>
        }
        return (
            <div className="section-in-main">
                <div className="header-section-v2">
                    <h1 className="dataset-header-title dataset-header-blue">
                        Labels section
                    </h1>
                </div>
                <div>
                    <p id="labels-quantity-text">{'Data set contains ' +  this.state.dataset.labels_quantity  + ' labels' } </p>
                </div>
                <table class="table">
                    <thead>
                        <tr className="table-header-sea">
                            <th scope="col">Label</th>
                            <th scope="col">Description</th>
                            <th scope="col">Insert By</th>
                            <th scope="col">Insertion Date</th>
                            <th scope="col">#Items</th>
                        </tr>
                    </thead>
                    <tbody>
                    {        
                        this.state.dataset.labels.map((record) => 
                            <tr className="table-text table-hover">
                                <td className="main-field">{ record.name }</td>
                                <td>{ record.description }</td>
                                <td>{ record.insert_by }</td>
                                <td>{ record.insertion_date }</td>
                                <td>{ record.count }</td>
                            </tr>
                        )
                    } 
                    </tbody>
                    </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataset_data: state.datasetsReducer.dataset_selected,
        username: state.authentication.user,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getDatasetLabels: (dataset_id) => {
            dispatch(getDatasetLabels(dataset_id))
        },
        getLabelsCount: (dataset_id) => {
            dispatch(getLabelsCount(dataset_id))
        }        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelsSection);

