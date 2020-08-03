import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import CommunityPage from './page.js'

class CommunityIndex extends Component {
    render() {
        return (
            <Provider store={store}>
                <CommunityPage />
            </Provider>
        )
    }
}


ReactDOM.render(<CommunityIndex />, document.getElementById('index'));