import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpecificRunResults from './s-result.js';
import SpecificRunCharts from './s-chart.js';
 
class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user
        }
    }

    render() {
        return (
            <div id="myModal" class="modal">
                <button id="btnclose" type="button" class="btn btn-outline-primary btn-close" onClick={ this.props.close_handler }>
                    <i className="fa fa-close"></i>
                </button>
                <SpecificRunResults />
                <SpecificRunCharts/>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user
    }
}

const mapDispatchToProps = disaptch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);