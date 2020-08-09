import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Profile from '../home/profile'
import PersonalArea from './personal';
import { getGroups } from '../../actions/posts/get'
import Groups from './groups'

class CommunitySidebar extends Component {
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
                <h5 class="category-title">Personal Area</h5>
                <PersonalArea />

                {/* Groups */}
                <h5 className="category-title">Groups</h5>
                <Groups groups={ this.props.groups } />
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
export default connect(mapStateToProps, mapDispatchToProps)(CommunitySidebar);