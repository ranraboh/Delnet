import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectAnalysis, getProjectRuns } from '../../../actions/project/model';
import { selectDataset } from '../../../actions/dataset/manipulation';
import DatasetAnalysis from '../../dataset/analysis'
import AnalysisButton from './button';
import ModelAnalysis from './model';
import RunsAnalysis from './runs';
import PrimaryAnalysis from './primary';
import ParametersAnalysis from './parameters';

class ProjectAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option: 'primary'
        }
        /* bind inner methods */
        this.display_selected_option = this.display_selected_option.bind(this)
        this.is_project_dataset = this.is_project_dataset.bind(this);

        /* compute project analysis */
        this.props.getProjectRuns(this.props.selected_project.id)
        if (!this.is_project_dataset()) {
            this.props.selectDataset(this.props.selected_project.dataset, () => {
                if (this.props.runs != null && this.props.runs.length > 0 && this.props.analysis == null) {
                    this.props.getProjectAnalysis(this.props.selected_project.id)
                }
            })
        }
    }

    is_project_dataset() {
        return this.props.selected_project.dataset == null ||  this.props.selected_project.dataset == 'null'
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.runs != null && !this.is_project_dataset() && nextProps.runs.length > 0 && nextProps.analysis == null) {
            this.props.getProjectAnalysis(this.props.selected_project.id)
        } 
    }

    select_option(option_selected) {
        this.setState({
            ...this.state,
            option: option_selected
        })
    }

    display_selected_option() {
        if (this.state.option == 'primary')
            return (<PrimaryAnalysis/>)
        else if (this.state.option == 'dataset') 
            return (<DatasetAnalysis />)
        else if (this.state.option == 'model')
            return (<ModelAnalysis/>)
        else if (this.state.option == 'runs')
            return (<RunsAnalysis/>)
        else if (this.state.option == 'parameters')
            return (<ParametersAnalysis/>)
        else
            return ''
    }

    render() {
        console.log("render analysis")
        console.log(this.props.runs)
        if (this.props.runs == null) 
            return ''
        else if (this.props.analysis == null && !this.is_project_dataset() &&  this.props.runs.length > 0) {
            this.props.getProjectAnalysis(this.props.selected_project.id)
            return ''
        }
        if (this.props.runs.length == 0) {
            return <div className="section-in-main">
            <div className="header-section-v1 header-v1-blue">
                <h1 id="projects-title">
                    Project Analysis
                </h1>
                <h2 id="projects-intro">
                    analyze your project and get tips to enhance your project performance
                </h2>
            </div>
            <div className="message-text text-aqua">
                you haven't train your neural network yet so your model performence is unknown and cannot be fully evaluated and analyzed
            </div>
        </div>
        }
        if (this.is_project_dataset()) {
            return <div className="section-in-main">
            <div className="header-section-v1 header-v1-blue">
                <h1 id="projects-title">
                    Project Analysis
                </h1>
                <h2 id="projects-intro">
                    analyze your project and get tips to enhance your project performance
                </h2>
            </div>
            <div className="message-text text-aqua">
                you haven't select a dataset yet so your model performence is unknown and cannot be fully evaluated and analyzed
            </div>
        </div>
        }
        return (
            <div id="project-analysis" className="section-in-main">
                <div className="header-section-v1 header-v1-pink">
                    <h1 id="projects-title">
                        Project Analysis
                    </h1>
                    <h2 id="projects-intro">
                        analyze your project and get tips to enhance your project performance
                    </h2>
                </div>
                <AnalysisButton text="Primary Analysis" onClick={ () => this.select_option('primary') } selected={ this.state.option == 'primary' } />
                <AnalysisButton text="Model Analysis" onClick={ () => this.select_option('model') } selected={ this.state.option == 'model' } />
                <AnalysisButton text="Dataset Analysis" onClick={ () => this.select_option('dataset') } selected={ this.state.option == 'dataset' } />
                <AnalysisButton text="Runs Analysis" onClick={ () => this.select_option('runs') } selected={ this.state.option == 'runs' } />
                <AnalysisButton text="Parameters Analysis" onClick={ () => this.select_option('parameters') } selected={ this.state.option == 'parameters' } />
                <p/>
                { this.display_selected_option() }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        selected_project: state.projectReducer.project_selected,
        analysis: state.projectReducer.project_selected.analysis,
        runs: state.modelReducer.project_runs,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProjectAnalysis: (project_id) => {
            dispatch(getProjectAnalysis(project_id))
        },
        getProjectRuns: (project_id) => {
            dispatch(getProjectRuns(project_id))
        },
        selectDataset: (dataset_id, callback) => {
            dispatch(selectDataset(dataset_id, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAnalysis);

