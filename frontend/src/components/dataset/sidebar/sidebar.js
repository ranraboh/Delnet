import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataSetInfo from './information';
import DatasetEdits from './edit';
import DatasetGraphs from './graphs';

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