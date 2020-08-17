import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getGroups } from '../../actions/posts/get'
import Profile from './profile.js'
import LatestProject from './latestproject.js';
import Community from './community.js';
import Groups from './groups.js'
import RunningSection from './running'

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.props.getGroups()
    }

    render() {
        return (
            <div id="sidebar-section">
                {/* Profile */}
                <h5 class="category-title">Profile</h5>
                <Profile />

                {/* Community */}
                <h5 class="category-title">Community</h5>
                <Community />

                {/* Groups */}
                <h5 className="category-title">Groups</h5>
                <Groups groups={ this.props.groups } />

                {/* Running */}
                <h5 className="category-title">Running</h5>
                <RunningSection/>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        groups: state.postsReducer.groups,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGroups: () => {
            dispatch(getGroups())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
