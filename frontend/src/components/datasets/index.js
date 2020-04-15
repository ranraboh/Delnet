import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import DataSetsPage from './page.js'

class DataSets extends Component {
    render() {
        return (
            <Provider store={store}>
                <DataSetsPage />
            </Provider>
        )
    }
}


ReactDOM.render(<DataSets />, document.getElementById('index'));