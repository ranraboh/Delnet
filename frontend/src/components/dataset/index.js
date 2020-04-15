import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import DataSetPage from './page.js'

class DataSetIndex extends Component {
    render() {
        return (
            <Provider store={store}>
                <DataSetPage />
            </Provider>
        )
    }
}


ReactDOM.render(<DataSetIndex />, document.getElementById('index'));