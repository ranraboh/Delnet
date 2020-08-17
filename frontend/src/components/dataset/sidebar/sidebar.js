import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataSetInfo from './information';
import DatasetEdits from './edit';
import DatasetGraphs from './graphs';
import VisiterMenu from './visiter';
import DatasetIcon from './icon'
class DataSetSidebar extends Component {
    render() {
        console.log("side bar")
        console.log(this.props.premissions)
        return (
            <div id="sidebar-section">
                {
                    (this.props.premissions == 0)?
                        <span>
                            <DatasetIcon />
                            <VisiterMenu/>
                        </span>:
                    <div id="members-sidebar" >
                        {/* Active section */}
                        <DataSetInfo />

                        {/* Not Active section */}
                        <DatasetEdits />

                        {/* Not Active section */}
                        <DatasetGraphs />
                    </div>
                }
            </div>
        );
    }
}
export default DataSetSidebar;