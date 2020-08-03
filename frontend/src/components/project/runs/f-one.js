import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getF1Scores } from '../../../actions/project/model';
import BarChart from '../../graph/bar.js';
import MultiBarChart from '../../graph/multibar.js';
  
class F1Scores extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            run_id: this.props.selected_run.id,
        }

        if (this.props.f1 == null)
            this.props.getF1Scores(props.selected_run.id)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.f1 == null)
            this.props.getF1Scores(nextProps.selected_run.id)
    }
    
    render() {
        if (this.props.f1 == null)
            return '';
        return (
            <div className="run-chart">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="text-poppins">
                                <br/>
                                F1 is common metric to evaluate your model. <br/>
                                F1 Score is the weighted average of Precision and Recall. Therefore, this score takes both false positives and false negatives into account. 
                                F1 is useful metric especially if you have an uneven class distribution. <br/>
                                F1 metric computed over the test set after the model has been trained and evaluated. 
                            </div>
                        </div>
                        <div className="col-6">
                            <BarChart height="240px" data={ this.props.f1 } category="F1 Score" display="name" value="score" min={0} max={100} />
                        </div>
                    </div>
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
        f1: state.modelReducer.selected_run.results.f1,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getF1Scores: (run_code) => {
            dispatch(getF1Scores(run_code))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(F1Scores);

