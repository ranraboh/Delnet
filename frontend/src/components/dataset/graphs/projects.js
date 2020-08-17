

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getDatasetProjects } from '../../../actions/dataset/get';
import BarChart from '../../graph/bar';

class DatasetProjectsGraph extends Component {
    constructor(props) {
        super(props)

        /* get user contributions data from server-backend */
        if (this.props.projects == null)
            this.props.getDatasetProjects(this.props.dataset_data.id)
    }

    render() {
        if (this.props.projects == null)
            return ''
        if (this.props.projects.length == 0) {
            return <div className="section-in-main">
            <h1 className="dataset-header-title dataset-header-blue">
                Dataset Projects
            </h1>
            <p/>
            <h4 className="dataset-graph-intro">
                this section shows the projects that are using this dataset <br/> 
                and compares the projects success rate <br/> 
            </h4>
            <h4 className="dataset-graph-intro text-blue">
                there are no projects that are using this dataset yet. <br/>
            </h4>
        </div>
        }
        return (
            <div className="section-in-main">
                <div className="header-section-v2">
                    <h1 className="dataset-header-title dataset-header-blue">
                        Dataset Projects
                    </h1>
                </div>
                <h4 className="dataset-graph-intro">
                    the graph shows the projects that are using this dataset <br/> 
                    the graph compares the projects success rate <br/> 
                </h4>
                <BarChart height="240px" data={ this.props.projects } category="Projects Accuracy" display="name" value="result" />                 
            </div>       
        );
    }
}
const mapStateToProps = state => {
    return {
        dataset_data: state.datasetsReducer.dataset_selected,
        projects: state.datasetsReducer.dataset_projects,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getDatasetProjects: (dataset_id) => {
            dispatch(getDatasetProjects(dataset_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetProjectsGraph);