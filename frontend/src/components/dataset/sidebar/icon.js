import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

class DatasetIcon extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <span class="col-xl-2 col-md-2 mb-4">
                <div id="dataset-icon-section" className="shadow card-big-data">
                </div>
            </span>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        user: state.authentication.user,
    }
}


const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetIcon);