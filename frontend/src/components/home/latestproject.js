import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProgressBar from './progressbar.js'

class LatestProject extends Component {
    render() {
        return (
            <div className="sidebar-category-section">
                <h5 className="latest-title">Animal Classification</h5>
                <h6 className="latest-field">description:</h6>
                <h6 className="latest-text">model which gains pictures of animals and classify which animal is in the picture.</h6>
                <br/>
                <h6 className="latest-field">labels:</h6>
                <h6 className="latest-text">lion, tiger, dog, cat, monkey</h6>
                <br/>
                <h6 className="latest-field">data set size:</h6>
                <h6 className="latest-text">1000 examples</h6>
                <br/>
                <h6 className="latest-field">team:</h6>
                <h6 className="latest-text">Bill Gates, Mark Zukeberg, Avi Nimni</h6>
                <p/>
                    <ProgressBar value="50" />
                <p/>
            </div>
        );
    }
}
export default LatestProject;