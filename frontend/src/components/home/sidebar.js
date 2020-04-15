import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Profile from './profile.js'
import LatestProject from './latestproject.js';
import Community from './community.js';
import Groups from './groups.js'

class Sidebar extends Component {
    render() {
        return (
            <div id="sidebar-section">
                {/* Profile */}
                <h5 class="category-title">Profile</h5>
                <Profile />

                {/* Latest Project */}
                <h5 class="category-title">Latest Project</h5>
                <LatestProject />

                {/* Community */}
                <h5 class="category-title">Community</h5>
                <Community />

                {/* Groups */}
                <h5 className="category-title">Groups</h5>
                <Groups />
            </div>
        );
    }
}
export default Sidebar;