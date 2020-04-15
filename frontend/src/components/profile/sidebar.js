import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ActiveSection from './active.js';
import NonActiveSection from './nonactive.js';

class ProfileSidebar extends Component {
    render() {
        return (
            <div id="sidebar-section">
                {/* Active section */}
                <h5 class="category-title">Active</h5>
                <ActiveSection />

                {/* Not Active section */}
                <h5 class="category-title">Not Active</h5>
                <NonActiveSection />
            </div>
        );
    }
}
export default ProfileSidebar;