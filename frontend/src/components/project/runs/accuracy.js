import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTrainResult, getDevResult } from '../../../actions/project/model.js';
import BarChart from '../../graph/bar.js';
import MultiBarChart from '../../graph/multibar.js';
import LineChart from '../../graph/line.js';
  
class AccuracyGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            run_id: this.props.selected_run.id,
            option: 0,
            options: [ 'Continuous', 'Discrete' ]
        }
        this.continuous_selection = this.continuous_selection.bind(this);
        this.discrete_selection = this.discrete_selection.bind(this);
    }

    continuous_selection() {
        this.setState({
            ...this.state,
            option: 0,
        })
    }

    discrete_selection() {
        this.setState({
            ...this.state,
            option: 1,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.dev == null)
            this.props.getDevResult(nextProps.selected_run.id)
        if (this.props.train == null)
            this.props.getTrainResult(nextProps.selected_run.id);
    }
    
    render() {
        if (this.props.train === null || this.props.dev === null)
            return '';
        return (
            <div className="run-chart">
                    <div id="accuracy-graph">
                        {
                            (this.state.option == 0)?
                            <LineChart data={ [this.props.dev, this.props.train] } display="epoch" value="accuracy_percent" min={0} max={100}
                                categories= { ['Dev Set', 'Train Set'] } />:
                            <MultiBarChart data={ [this.props.train, this.props.dev] } display="epoch" value="accuracy_percent" min={0} max={100}
                                categories= { ['Train Set', 'Dev Set'] } />
                        }
                    </div>
                <div id="metric-representation-selection">
                        <span>
                            <input type="radio" name="change-options" className="radio-button-v1 radio-button-v1-blue"
                                checked={ this.state.option != 1 } />
                            <label className="radio-button-v1-label" for={ this.state.options[0] } onClick={ this.continuous_selection }>{ this.state.options[0] }</label>&nbsp;	&nbsp;	
                        </span>
                        <span>
                            <input type="radio" name="change-options" className="radio-button-v1 radio-button-v1-purple"
                                checked={ this.state.option == 1 } />
                            <label className="radio-button-v1-label" for={ this.state.options[1] } onClick={ this.discrete_selection }>{ this.state.options[1] }</label>
                        </span>
                    </div>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        selected_run: state.modelReducer.selected_run,
        train: state.modelReducer.selected_run.results.train,
        dev: state.modelReducer.selected_run.results.dev
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTrainResult: (run_code) => {
            dispatch(getTrainResult(run_code))
        },
        getDevResult: (run_code) => {
            dispatch(getDevResult(run_code))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccuracyGraph);

