import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import HomePage from './page.js'

class Application extends Component {
    render() {
        return (
            <Provider store={store}>
                <HomePage/>
            </Provider>
        );
    }
}
ReactDOM.render(<Application/>, document.getElementById('app'));