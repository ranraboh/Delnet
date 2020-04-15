import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import ProjectsPage from './page.js'

class ProjectsSection extends Component {
    render() {
        return (
            <Provider store={store}>
                <ProjectsPage />
            </Provider>
        )
    }
}


ReactDOM.render(<ProjectsSection />, document.getElementById('index'));