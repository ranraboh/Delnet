import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getConfusionMatrix } from '../../../actions/project/model.js';
import { getDatasetLabels } from '../../../actions/dataset/get'
import { selectDataset } from '../../../actions/dataset/manipulation'
import BarChart from '../../graph/bar.js';
import MultiBarChart from '../../graph/multibar.js';
  
class ConfusionMatrix extends Component {
    constructor(props) {
        super(props)
        this.state = {
            explanation: ''
        }

        /* receive data from backend */
        let dataset_id = this.props.project.dataset;
        if (this.props.confusion_matrix == null)
            this.props.getConfusionMatrix(props.selected_run.id)
        if (this.props.dataset == null || this.props.dataset.id != dataset_id)
            this.props.selectDataset(dataset_id)
        if (this.props.labels == null)
            this.props.getDatasetLabels(dataset_id)

        /* bind inner methods */
        this.hover_handler = this.hover_handler.bind(this);
        this.mouse_leave_handler = this.mouse_leave_handler(this);
    }

    hover_handler(label, prediction, value) {
        if (label.id == prediction.id) {
            this.setState({
                explanation:`${value} is the number of samples where the model correctly predicted ${label.name} labels`
            })
        } else {
            this.setState({
                explanation: `${value} is the number of samples where the model predicted ${prediction.name} ,however the label was actually ${label.name}`
            })
        }

    }

    mouse_leave_handler() {
        this.setState({
            explanation: ''
        })
    }

    render() {
        if (this.props.confusion_matrix == null || this.props.labels == null)
            return '';
        console.log(this.props.confusion_matrix)
        return (
            <div className="run-chart">
                <p/>
                <p/>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            confusion matrix is a table that is often used to describe the performance of a classifier.
                            The table gives us a broad overview of the test results and allows us the identify the confusion between the classes. <br/>
                            for instance, the classes that is commonly mislabeled as the other.
                            the confusion matrix computed on test set after the model was trained and evaluated.
                        </div>
                        <div className="col-8">
                            <table className="table">
                                <thead>
                                    <tr className="table-v1-th">
                                        <th scope="col"></th>
                                        {
                                            this.props.labels.map((record) =>
                                                    <th scope="col">{ record.name }</th>
                                                )
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.labels.map((label) => 
                                        <tr className="table-v1-row-nonhover">
                                            <td>
                                                { label.name }
                                            </td>
                                            {
                                                this.props.labels.map((prediction) => {
                                                    const value = this.props.confusion_matrix[ [ label.id, prediction.id ].join('#') ]
                                                    return (
                                                        <td className="table-v1-col-hover" onMouseEnter= { () => this.hover_handler(label, prediction, value) } onMouseLeave={ this.mouse_leave_handler }> 
                                                            { value }
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                            <div className="cell-explanation text-poppins">
                                {
                                    (this.state.explanation == '')? '' : (
                                    <span className="underline">cell explained:</span>)
                                }
                                { this.state.explanation } 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        selected_run: state.modelReducer.selected_run,
        project: state.projectReducer.project_selected,
        labels: state.datasetsReducer.dataset_selected.labels,
        confusion_matrix: state.modelReducer.selected_run.results.confusion_matrix,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getConfusionMatrix: (run_code) => {
            dispatch(getConfusionMatrix(run_code))
        },
        getDatasetLabels: (dataset_id) => {
            dispatch(getDatasetLabels(dataset_id))
        },
        selectDataset: (dataset_id) => {
            dispatch(selectDataset(dataset_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfusionMatrix);

