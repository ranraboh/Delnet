import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
 
class TotalResults extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.run.id === null || this.props.run.id === undefined)
            return ''
        return (
            <div id="run-features">
                <h6 className="text-poppins">
                    Total results over test set. <br/>
                    The test made after the model was trained and evaluated. <br/>
                </h6>
                <div class="container runs-set">
                    <div className="row">
                <div class="col-md-4" >
                    <div class="metric-item">
                        <h6><a className="text-bold">Accuracy Metric </a></h6>
                        <h6><a className="regular-text">{ (this.props.run.accuracy * 100).toString().substring(0, 5) + "%" }</a></h6>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="metric-item">
                        <h6><a className="text-bold">Loss Metric </a></h6>
                        <h6><a className="regular-text">{ (this.props.run.loss_value).toString().substring(0, 5) }</a></h6>
                    </div>
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
        run: state.modelReducer.selected_run
    }
}

const mapDispatchToProps = disaptch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalResults);

