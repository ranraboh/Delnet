import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecall } from '../../../actions/project/model.js';
import BarChart from '../../graph/bar.js';
  
class RecallGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            run_id: this.props.selected_run.id,
        }

        if (this.props.recall == null)
            this.props.getRecall(props.selected_run.id)
    }

    componentWillReceiveProps(nextProps) {
        console.log('recall receive props ')
        console.log(nextProps)
        if (this.props.recall == null)
            this.props.getRecall(nextProps.selected_run.id)
    }
    
    render() {
        console.log('rende recall')
        console.log(this.props.recall)
        if (this.props.recall == null)
            return '';
        return (
            <div className="run-chart">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="text-poppins">
                                <br/>
                                Recall is common metric to evaluate your model. <br/>
                                Recall refers for each label and answars the following question: <br/>
                                what is the percentage of samples of label X which correctly classified by the algorithm. 
                                that is, of all the examples of label X, what proportion was correctly identified by the model. <br/>
                                recall metric computed over the test set after the model has been trained and evaluated. 
                                low results over specific label means the model struggle to identify its samples. <br/>
                            </div>
                        </div>
                        <div className="col-6">
                            <BarChart height="240px" data={ this.props.recall } category="Recall" display="name" value="recall" min={0} max={100} />
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
        recall: state.modelReducer.selected_run.results.recall,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRecall: (run_code) => {
            console.log('map recall')
            dispatch(getRecall(run_code))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecallGraph);

