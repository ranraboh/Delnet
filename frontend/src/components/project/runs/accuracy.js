import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTrainResult, getDevResult } from '../../../actions/project/model.js';
import BarChart from '../../graph/bar.js';
import MultiBarChart from '../../graph/multibar.js';
  
class AccuracyGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            run_id: this.props.selected_run.id,
        }
        console.log('accuracy constructor')
        console.log(props)
        console.log(this.state)

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.dev == null)
            this.props.getDevResult(nextProps.selected_run.id)
        if (this.props.train == null)
            this.props.getTrainResult(nextProps.selected_run.id);
    }
    

    render() {
        console.log('render')
        console.log(this.props)
        if (this.props.train === null || this.props.dev === null)
            return '';
        return (
            <div className="run-chart">
                <MultiBarChart data={ [this.props.train, this.props.dev] } display="epoch" value="accuracy_percent" min={0} max={100}
                    categories= { ['Train Set', 'Dev Set'] } />
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

