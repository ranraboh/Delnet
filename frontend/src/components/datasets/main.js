import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import DataSetsUser from './usersets.js';
import BuildDataset from './create.js';
import DatasetsItemsGraph from './items-graph.js';

class DataSetsMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show_toggle: 'Your Datasets',
            description: 'this section contains a list of your data-sets. you are able to get into preticular datasets and make changes'
        }
        this.get_section_toggle = this.get_section_toggle.bind(this);
        this.toggle_table = this.toggle_table.bind(this);
        this.toggle_create = this.toggle_create.bind(this);
    }

    get_section_toggle() {
        console.log('toggle method')
        console.log(this.state)
        if (this.state.show_toggle == 'Your Datasets')
            return (<DataSetsUser />);
        else if (this.state.show_toggle == 'Build Dataset')
            return (<BuildDataset />)
        else
            return '';
    }

    toggle_table() {
        this.setState({
            ...this.state,
            show_toggle: 'Your Datasets',
            description: 'this section contains a list of your data-sets. you are able to get into preticular datasets and make changes'
        })
    }
    
    toggle_create() {
        this.setState({
            ...this.state,
            show_toggle: 'Build Dataset',
            description: 'you can build a new dataset, fill in the premilinary information about your new dataset'
        })
    }

    render() {
        let toggle_element = this.get_section_toggle();
        return (
            <div className="main-datasets">
                <div id="dataset-users" className="section-in-main">
                    <div className="header-section-v1 header-v1-purple">
                        <h1 id="projects-title">
                            { this.state.show_toggle }
                        </h1>
                        <h2 id="projects-intro">
                            { this.state.description }
                        </h2>
                    </div>
                    { toggle_element }
                    <button className="btn btn-outline-info btn-datasets" onClick={ this.toggle_table } >
                        <i className="fa fa-table"></i> Your Datasets
                    </button>
                    <button className="btn btn-outline-success btn-datasets" onClick={ this.toggle_create } >
                        <i className="fa fa-plus"></i> Build Dataset
                    </button>
                    <button className="btn btn-outline-dark btn-datasets" >
                        <i className="fa fa-search"></i> Search Datasets
                    </button>
                </div>
                <DatasetsItemsGraph/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSetsMain);
