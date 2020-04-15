import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import ProjectPage from './page.js'

class CurrentProject extends Component {
    render() {
        return (
            <Provider store={store}>
                <ProjectPage />
            </Provider>
        )
    }
}


ReactDOM.render(<CurrentProject />, document.getElementById('index'));