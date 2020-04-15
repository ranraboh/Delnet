import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import ProfilePage from './page.js'

class DetailedProfile extends Component {
    render() {
        return (
            <Provider store={store}>
                <ProfilePage />
            </Provider>
        )
    }
}


ReactDOM.render(<DetailedProfile/>, document.getElementById('detailed-profile'));