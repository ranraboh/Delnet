import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataSetInfo from './information.js';
import DatasetEdits from './edit.js';
import DatasetGraphs from './graphs.js';

class DataSetSidebar extends Component {
    render() {
        return (
            <div id="sidebar-section">
                {/* Active section */}
                <DataSetInfo />

                {/* Not Active section */}
                <DatasetEdits />

                {/* Not Active section */}
                <DatasetGraphs />
            </div>
        );
    }
}
export default DataSetSidebar;