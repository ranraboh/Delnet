import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDevResult } from '../../../actions/project/model.js';
  
class DevResults extends Component {
    constructor(props) {
        super(props)
        let pages_quantity = 0;
        if (props.dev != null) {
            pages_quantity = parseInt(Math.ceil(props.dev.length + 1 / 3)) - 1
        } else {
            this.props.getDevResult(props.selected_run.id)
        }
        this.state = {
            username: this.props.user,
            run_id: props.selected_run.id,
            colors: [ 'blue', 'red', 'green', 'aqua', 'pink', 'yellow', 'orange', 'purple' ],
            page: 0,
            pages_quantity: pages_quantity,
            records_in_page: 3
        }

        /* bind inner methods */
        this.previous_link = this.previous_link.bind(this);
        this.next_link = this.next_link.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            pages_quantity: parseInt(nextProps.dev.length / 3) - 1
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
        else if (result > 35)
            return 'yellow';
        else if (result > 25)
            return 'pink';
        else 
            return 'red';
    }

    render() {
        console.log(this.props.dev)
        if (this.props.dev == null)
            return '';
        let start = this.state.page * this.state.records_in_page;
        let end = start + 3;
        return (
            <table id="dev-table" className="table">
                <thead>
                    <tr className="table-v1-th">
                        <th scope="col">Epoch</th>
                        <th scope="col">Accuracy</th>
                        <th scope="col">Loss</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.dev.slice(start, end).map((result) => 
                            <tr className="table-v1-row">
                                <div className={ "icon-container icon-container-" + this.getColorByAccuracy(result.accuracy_rate) }> 
                                    <p>{result.epoch }</p>
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
        dev: state.modelReducer.selected_run.results.dev
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDevResult: (run_code) => {
            console.log('map train')
            dispatch(getDevResult(run_code))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DevResults);

