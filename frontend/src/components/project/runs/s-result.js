import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrainTable from './train-table.js';
import DevResults from './dev-table.js';
import RunFeatures from './featues.js';
import SpecificRunCharts from './s-chart.js'; 
import TotalResults from './total.js';

class SpecificRunResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            selected_section: 0,
            sections: [ 'Features', 'Train Set', 'Dev Set', 'Total Results' ],
            full_sections: [ 'Features', 'Train Set Results', 'Validation Set Results', 'Total Results' ]

        }

        /* bind inner methods */
        this.on_change = this.on_change.bind(this);
        this.section = this.section.bind(this);
    }

    on_change(index) {
        this.setState({
            ...this.state,
            selected_section: index
        })
    }

    section(html_section, available) {
        if (available) {
            return (
                <div>
                    { html_section }
                </div>
            )
        }
        return ''
    }

    render() {
        let run_features = this.section(<RunFeatures/>, this.state.selected_section == 0 )
        let train_results = this.section(<TrainTable/>, this.state.selected_section == 1 )
        let dev_results = this.section(<DevResults/>, this.state.selected_section == 2 )
        let total_results = this.section(<TotalResults/>, this.state.selected_section == 3)
        if (this.props.run.id === null || this.props.run.id === undefined)
            return '';
        console.log('s-result')
        console.log(this.props.run.id)
        return (
            <div id="runs-results" className="modal-section">
                <nav>
                    {
                        this.state.sections.map((name, index) =>
                            <button type="button" onClick={ () => this.on_change(index) }
                                className={(this.state.selected_section == index)?"btn btn-info nav-buttons":"btn btn-danger nav-buttons"}>{ name }</button>
                        )
                    }
                </nav>

                <div className="run-chart" >
                    { run_features }
                    { train_results }
                    { dev_results }
                    { total_results }
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        run: state.modelReducer.selected_run
    }
}

const mapDispatchToProps = disaptch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecificRunResults);

