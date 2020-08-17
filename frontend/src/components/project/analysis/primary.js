import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectAnalysis, getAccuracyRange } from '../../../actions/project/model';
import { float_precision, color_by_result } from '../../general/methods';
import BarChart from '../../graph/bar'
import ProgressBar from '../../home/progressbar';

class PrimaryAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            best_runs: [ '1st', '2nd', '3rd' ],
            sections: {
                project_status: true,
                critical_points: false,
                additional_warnings: false
            }
        }

        /* compute project analysis */
        this.props.getProjectAnalysis(this.props.selected_project.id)
        this.props.getAccuracyRange(this.props.selected_project.id)
        this.display_imperfections_list = this.display_imperfections_list.bind(this);
        this.expand_section = this.expand_section.bind(this);
    }

    expand_section(section_name) {
        let sections = this.state.sections
        sections[section_name] = !sections[section_name]
        this.setState({
            ...this.state,
            sections
        })
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

    capitalize = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
    }

    render() {
        if (this.props.analysis == null || this.props.accuracy_range == null) 
            return ''
        return (
            <div id="runs-analysis">
            <div class="container runs-set">
                <div className="container">
                <div className="row">
                    <div class="col-lg-4 mb-4">
                        <div class="card bg-primary text-white shadow">
                            <div class="card-body">
                            Project Analysis
                            <div class="text-white-50 small">primary</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-1 mb-4"></div>
                    <div className="col-lg-4 mb-4">
                        <p/>
                        <span className={ (this.state.sections.project_status)?"link-analysis-activate text-primary": "link-analysis-unactivate text-primary" } onClick={ () => this.expand_section('project_status') }>
                            Project Status                 
                        </span><br/>
                        <span className={ (this.state.sections.critical_points)?"link-analysis-activate text-primary": "link-analysis-unactivate text-primary" } onClick={ () => this.expand_section('critical_points') }>
                            Critical Points                            
                        </span><br/>
                        <span className={ (this.state.sections.additional_warnings)?"link-analysis-activate text-primary": "link-analysis-unactivate text-primary" } onClick={ () => this.expand_section('additional_warnings') }>
                            Additional Warnings                   
                        </span>
                    </div>
                </div>
            </div>
            {
                (this.state.sections.project_status)?
                <h4 className="project-analysis-text">
                    <span className="text-bold">Project Status: { this.capitalize(this.props.analysis.status.status.replace('_', ' ')) }</span> <br/>
                    { this.props.analysis.status.text }
                <p/>
                <span className="underline">Best accuracy rate over: </span><br/>
                    <div className="row">
                            <div className="col-4">
                                <h4 className="project-analysis-text">
                                    Train Set:  <br/>
                                    Validation Set:  <br/>
                                    Test Set: <br/>
                                </h4>
                            </div>
                            <div className="col-2">
                                <h4 className="project-analysis-text">
                                    { float_precision(this.props.analysis.runs.best_result.train.result * 100, 5) + "%" } <br/>
                                    { float_precision(this.props.analysis.runs.best_result.dev.result * 100, 5) + "%" } <br/>
                                    { float_precision(this.props.analysis.runs.best_result.test.result * 100, 5) + "%" } <br/>
                                </h4>
                            </div>
                            <div className="col-6">
                                <h4 className="project-analysis-text">
                                    <ProgressBar show={ false } value={ this.props.analysis.runs.best_result.train.result * 100 } /> 
                                    <ProgressBar show={ false } value={ this.props.analysis.runs.best_result.dev.result * 100 } /> 
                                    <ProgressBar show={ false } value={ this.props.analysis.runs.best_result.test.result * 100 } /> 
                                </h4>
                            </div>
                        </div>
                </h4>:''
            }
            {
                (this.state.sections.critical_points)?
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
                </h4>:''
            }
            {
                (this.state.sections.additional_warnings)?
                <h4 className="project-analysis-text">
                    <span className="text-bold">Additional Warnings: </span><br/>
                    the analysis process detected additional warnings which raised a red flag,
                    perhapes modifying or correcting this warnings leads to an improvement of your model performance
                    hence, it is worth to look into them and take them into account when you weigh up your options to maxmize your model performance and accuracy
                    <p/>
                    { this.display_imperfections_list('In model structure', this.props.analysis.status.imperfections.warnings.model) }
                    { this.display_imperfections_list('In dataset collection', this.props.analysis.status.imperfections.warnings.dataset) }
                    { this.display_imperfections_list('In hyper-parameters selection', this.props.analysis.status.imperfections.warnings.parameters) }
                </h4>:''
            }
            </div>
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

