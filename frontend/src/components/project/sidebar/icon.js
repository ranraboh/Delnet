import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

class ProjectIcon extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <span class="col-xl-2 col-md-2 mb-4">
                <div id="profile-icon-section" className="card shadow card-sea">
                    <div class="card-body">
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectIcon);