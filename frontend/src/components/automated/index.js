import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import AutomatedModelPage from './page.js'

class AutomatedIndex extends Component {
    render() {
        return (
            <Provider store={store}>
                <AutomatedModelPage />
            </Provider>
        )
    }
}


ReactDOM.render(<AutomatedIndex />, document.getElementById('index'));