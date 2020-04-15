import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Activeness from './activeness';
import Projects from './projects';
import PostBoard from './posts-board';
import Notifications from './notifications.js';

class MainSection extends Component {
    render() {
        return (
            <div className="main-section">
                {/* Activeness section */}
                <h5 class="category-title">Activeness</h5>
                <Activeness />

                {/* Notification section */}
                <h5 class="category-title">Notifications</h5>
                <Notifications />

                {/* Projects section */}
                <h5 class="category-title">Projects</h5>
                <Projects />

                {/* Posts section */}
                <h5 class="category-title">What's New</h5>
                <PostBoard />
            </div>
        );
    }
}
export default MainSection;