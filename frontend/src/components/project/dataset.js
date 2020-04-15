import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homepage } from '../../appconf.js';
import { selectDataset, getItemsCount, getLabelsCount } from '../../actions/datasets.js'
 
class DataSetProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            labels_quantity: 0,
            items_quantity: 0
        }
        if (props.project.dataset != null) {
            let dataset = props.project.dataset
            this.props.getDatasetInfo(dataset)
            this.props.getLabelsCount(dataset)
            this.props.getItemsCount(dataset)
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            ...this.state,
            labels_quantity: nextProps.dataset.labels_quantity,
            items_quantity: nextProps.dataset.items_quantity
        })
    }

    componentWillMount() {
        if (this.props.loggedIn === false || this.props.loggedIn === 'false')
            window.location = homepage + '/login'
    }

    render() {
        console.log(this.state)
        return (
            <div className="section-in-main">
                <div className="header-section-v1 header-v1-green">
                    <h1 id="projects-title">
                        Dataset
                    </h1>
                    <h2 id="projects-intro">
                       This section contains concise and general information about the project dataset,
                       you are able to access and manage the project dataset by click in the link below.
                    </h2>
                </div>
                <div className="container">
                    {/* Dataset Name */}
                    <div className="row">
                        <div className="col-2">
                            <h6 className="text">Dataset Name:</h6>
                        </div>
                        <div className="col-6">
                            <h6 className="text">{ this.props.dataset.name }</h6>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="row">
                        <div className="col-2">
                            <h6 className="text">Description:</h6>
                        </div>
                        <div className="col-6">
                            <h6 className="text">{ this.props.dataset.description }</h6>
                        </div>
                    </div>

                    {/* Number of Labels */}
                    <div className="row">
                        <div className="col-2">
                            <h6 className="text">Number of labels:</h6>
                        </div>
                        <div className="col-6">
                            <h6 className="text">{ this.state.labels_quantity }</h6>
                        </div>
                    </div>

                    {/* Number of items */}
                    <div className="row">
                        <div className="col-2">
                            <h6 className="text">Number of Items:</h6>
                        </div>
                        <div className="col-6">
                            <h6 className="text">{ this.state.items_quantity }</h6>
                        </div>
                    </div>

                    <h6 className="link">Navigate into dataset section</h6>

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        project: state.projectReducer.project_selected,
        dataset: state.datasetsReducer.dataset_selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDatasetInfo: (dataset_id, callback) => {
            dispatch(selectDataset(dataset_id, callback))
        },
        getItemsCount: (dataset_id) => {
            dispatch(getItemsCount(dataset_id))
        },
        getLabelsCount: (dataset_id) => {
            dispatch(getLabelsCount(dataset_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSetProject);