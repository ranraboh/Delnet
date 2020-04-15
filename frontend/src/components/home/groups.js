import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Groups extends Component {
    render() {
        return (
        <div className="sidebar-category-section">
            <ul id="groups-list">
                <li class="group-item-1">Memcached</li>
                <li class="group-item-2">MongoDB</li>
                <li class="group-item-3">C++</li>
                <li class="group-item-4">Python</li>
                <li class="group-item-5">Java</li>
            </ul>
        </div>
        );
    }
}
export default Groups;