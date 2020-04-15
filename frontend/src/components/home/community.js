import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Community extends Component {
    render() {
        return (
            <div className="sidebar-category-section">
                <ul id="community-options-list">
                    <li className="group-item-1">Your Posts</li>
                    <li className="group-item-2">Your Questions</li>
                    <li className="group-item-3">Registered Posts</li>
                    <li className="group-item-4">Registered Videos</li>
                    <li className="group-item-5">Followed Questions</li>
                </ul>
            </div>
        );
    }
}
export default Community;