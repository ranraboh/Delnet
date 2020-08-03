import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectAnalysis, getAccuracyRange } from '../../../actions/project/model';
import { float_precision, color_by_result } from '../../general/methods';
import BarChart from '../../graph/bar'

class PrimaryAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            best_runs: [ '1st', '2nd', '3rd' ]
        }

        /* compute project analysis */
        this.props.getProjectAnalysis(this.props.selected_project.id)
        this.props.getAccuracyRange(this.props.selected_project.id)
        this.display_imperfections_list = this.display_imperfections_list.bind(this);
    }

    display_imperfections_list(title, collection) {
        if (collection.length == 0)
            return ''
        return(<div className="collection-imperfections"> 
            <span className="underline">{ title } </span><br/>
            <ol>
                {
                    collection.map((result) =>
                        <li> { result }</li>
                    )
                }
            </ol>
        </div>)
    }

    render() {
        if (this.props.analysis == null || this.props.accuracy_range == null) 
            return ''
        return (
            <div id="runs-analysis">
                <h4 className="project-analysis-text">
                    <span className="text-bold">Your project status: { this.props.analysis.status.status }  </span><br/>
                    <span>{ this.props.analysis.status.text } <br/></span>
                </h4>
                <p/>
                <h4 className="project-analysis-text">
                    the following chart shows the distirubution of the run accuracy rate over the ranges classes:
                    it gives you a visual conception or summary about your model accuracy in different runs
                    <BarChart height="240px" data={ this.props.accuracy_range } category="Frequency" display="range" value="frequency" />
                </h4>
                <p/>
                <h4 className="project-analysis-text">
                    <span className="text-bold">Critical points: </span><br/>
                    considering your project status,
                    the system has analyzed several faults or critical points in your project designing which may led to insufficient results.
                    the likely design defectives arranged in list of points along with valuable advices and explanation.
                    it is highly recommended to pay attention, examine and look into them.
                    holding on the analysis conclusions and recommendations may lead to increase in your model performance
                    and a properly designed model that fits well with your classification problem.
                    <p/>
                    { this.display_imperfections_list('In model structure', this.props.analysis.status.imperfections.critical.model) }
                    { this.display_imperfections_list('In dataset collection', this.props.analysis.status.imperfections.critical.dataset) }
                    { this.display_imperfections_list('In hyper-parameters selection', this.props.analysis.status.imperfections.critical.parameters) }
                </h4>
                <h4 className="project-analysis-text">
                    <span className="text-bold">Additional Warnings: </span><br/>
                    the analysis process detected additional warnings which raised a red flag,
                    perhapes modifying or correcting this warnings leads to an improvement of your model performance
                    hence, it is worth to look into them and take them into account when you weigh up your options to maxmize your model performance and accuracy
                    <p/>
                    { this.display_imperfections_list('In model structure', this.props.analysis.status.imperfections.warnings.model) }
                    { this.display_imperfections_list('In dataset collection', this.props.analysis.status.imperfections.warnings.dataset) }
                    { this.display_imperfections_list('In hyper-parameters selection', this.props.analysis.status.imperfections.warnings.parameters) }
                </h4>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        selected_project: state.projectReducer.project_selected,
        accuracy_range: state.projectReducer.project_selected.accuracy_range,
        analysis: state.projectReducer.project_selected.analysis
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProjectAnalysis: (project_id) => {
            dispatch(getProjectAnalysis(project_id))
        },
        getAccuracyRange : (project_id) => {
            dispatch(getAccuracyRange(project_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryAnalysis);

