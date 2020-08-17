import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTrainResult, getDevResult } from '../../../actions/project/model.js';
import BarChart from '../../graph/bar.js';
import MultiBarChart from '../../graph/multibar.js';
import LineChart from '../../graph/line.js';

class LossGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            run_id: props.selected_run.id,
        }
    }


    componentWillReceiveProps(nextProps) {
        /* get train results of selected run */
        if (this.state.run_id != nextProps.selected_run.id) {
            this.setState({
                ...this.state,
                run_id: nextProps.selected_run.id
            }, () => {
            this.props.getTrainResult(nextProps.selected_run.id)
            this.props.getDevResult(nextProps.selected_run.id);
            })
        }
    }

    render() {
        if (this.props.train == null || this.props.dev == null)
            return '';
        let maximum_value = 0
        this.props.train.map((record) => {
            if (record.loss > maximum_value)
                maximum_value = record.loss
        })  
        this.props.dev.map((record) => {
            if (record.loss > maximum_value)
                maximum_value = record.loss
        })  
        return (
            <div className="run-chart">
                <LineChart data={ [this.props.train, this.props.dev] } display="epoch" value="loss" min={0} max={maximum_value + 1}
                    categories= { ['Train Set', 'Dev Set'] } />
            </div>
        )
    }
}


const mapStateToProps = state => {
    console.log(state.modelReducer)
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
            console.log('map train')
            dispatch(getTrainResult(run_code))
        },
        getDevResult: (run_code) => {
            dispatch(getDevResult(run_code))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LossGraph);

