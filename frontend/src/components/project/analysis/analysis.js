import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectAnalysis } from '../../../actions/project/model';
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

        /* compute project analysis */
        this.props.getProjectAnalysis(this.props.selected_project.id)
    
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
        if (this.props.analysis == null) 
            return ''
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
        analysis: state.projectReducer.project_selected.analysis
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProjectAnalysis: (project_id) => {
            dispatch(getProjectAnalysis(project_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAnalysis);

