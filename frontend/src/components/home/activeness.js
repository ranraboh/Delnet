import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import MiniSection from './mini';
import { getUserActiveness } from '../../actions/users'

class Activeness extends Component {
    render() {
        if (this.props.activeness == null) {
            this.props.getUserActiveness(this.props.username)
            return ''
        }
        return (
        <div id="activeness-section" className="row">
            <MiniSection size="3" style="primary" category="Projects" value={ this.props.activeness.projects } icon="fa-book" />
            <MiniSection size="3" style="info" category="Posts" value={ this.props.activeness.posts } icon="fa-comments" />
            <MiniSection size="3" style="success" category="Data Sets" value={ this.props.activeness.datasets } icon="fa-database" />
            <MiniSection size="3" style="danger" category="Messages" value={ this.props.activeness.messages } icon="" />
        </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        activeness: state.userReducer.activeness
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getUserActiveness: (username) => {
            dispatch(getUserActiveness(username))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activeness);
