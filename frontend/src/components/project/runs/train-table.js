import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTrainResult } from '../../../actions/project/model.js';
import { string } from 'prop-types';
  
class TrainTable extends Component {
    constructor(props) {
        super(props);
        let pages_quantity = 0;
        if (props.train != null) {
            pages_quantity = parseInt(props.train.length / 3) - 1
        } else {
            this.props.getTrainResult(this.state.run_id)
        }
        this.state = {
            username: this.props.user,
            run_id: props.selected_run.id,
            records_in_page: 3,
            pages_quantity: pages_quantity,
            colors: [ 'blue', 'red', 'green', 'aqua', 'pink', 'yellow', 'orange', 'purple' ],
            page: 0
        }
        
        /* bind inner methods */
        this.previous_link = this.previous_link.bind(this);
        this.next_link = this.next_link.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            pages_quantity: parseInt(nextProps.train.length / 3) - 1
        })
    }

    previous_link() {
        this.setState({
            ...this.state,
            page: Math.max(0, this.state.page - 1)
        })
    }

    next_link() {
        this.setState({
            ...this.state,
            page: Math.min(this.state.pages_quantity, this.state.page + 1)
        })
    }

    getColorByAccuracy(accuracy) {
        let result = accuracy * 100
        if (result > 85)
            return 'green';
        else if (result > 70)
            return 'blue';
        else if (result > 60)
            return 'aqua';
        else if (result > 50)
            return 'orange';
        else if (result > 25)
            return 'pink';
        else 
            return 'red';
    }

    render() {
        if (this.props.train == null)
            return '';
        let start = this.state.page * this.state.records_in_page;
        let end = start + 3;
        console.log(this.state.pages_quantity)
        console.log(end)
        console.log(this.props.train)
        return (
            <table id="train-table" className="table">
                <thead>
                    <tr className="table-v1-th">
                        <th scope="col">Epoch</th>
                        <th scope="col">Accuracy</th>
                        <th scope="col">Loss</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.train.slice(start, end).map((result) => 
                            <tr className="table-v1-row">
                                <div className={ "icon-container icon-container-" + this.getColorByAccuracy(result.accuracy_rate) }> 
                                    <p>{ result.epoch + 1 }</p>
                                </div>
                                <td className={"text-" + this.getColorByAccuracy(result.accuracy_rate) }>{ 
                                    (Math.round(result.accuracy_rate * 10000) / 100) + "%" 
                                }</td>
                                <td>{ (Math.round(result.loss * 100) / 100) }</td>
                            </tr>
                    )}
                </tbody>
                <tfoot>
                    <ul class="pagination">
                        <li class="page-item button-outline-danger">
                            <a id="previous-link" className="btn btn-primary page-link" onClick={ this.previous_link }>Previous</a>
                        </li>
                        <li class="page-item">
                            <a id="next-link button-outline-danger" className="page-link" onClick={ this.next_link }>Next</a>
                        </li>
                    </ul> 
                </tfoot>
            </table>
        )
    }
}


const mapStateToProps = state => {
    console.log(state.modelReducer)
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        selected_run: state.modelReducer.selected_run,
        train: state.modelReducer.selected_run.results.train
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTrainResult: (run_code) => {
            console.log('map train')
            dispatch(getTrainResult(run_code))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainTable);

