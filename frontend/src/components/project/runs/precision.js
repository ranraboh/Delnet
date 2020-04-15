import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPrecision } from '../../../actions/project/model.js';
import BarChart from '../../graph/bar.js';
import MultiBarChart from '../../graph/multibar.js';
  
class PrecisionGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            run_id: this.props.selected_run.id,
        }

        if (this.props.precision == null)
            this.props.getPrecision(props.selected_run.id)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.precision == null)
            this.props.getPrecision(nextProps.selected_run.id)
    }
    
    render() {
        if (this.props.precision == null)
            return '';
        return (
            <div className="run-chart">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="text-poppins">
                                <br/>
                                Precision is common metric to evaluate your model. <br/>
                                Precision refers for each label and answars the following question: <br/>
                                of all the examples tagged as label X, what proportion is truly of label X. <br/>
                                precision metric computed over the test set after the model has been trained and evaluated. 
                                low results over specific label usually means the model mistakingly tend to predict this label. <br/>
                            </div>
                        </div>
                        <div className="col-6">
                            <BarChart height="240px" data={ this.props.precision } category="Precision" display="name" value="precision" min={0} max={100} />
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
        precision: state.modelReducer.selected_run.results.precision,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPrecision: (run_code) => {
            dispatch(getPrecision(run_code))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrecisionGraph);

