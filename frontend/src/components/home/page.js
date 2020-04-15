import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Sidebar from './sidebar.js';
import Upper from './upper/header.js';
import Menu from './menu.js'
import MainSection from './main-section.js';
import { homepage } from '../../appconf.js';

class HomePage extends Component {

    componentWillMount() {
        if (this.props.loggedIn === false || this.props.loggedIn === 'false')
            window.location = homepage + '/login'
    }

    render() {
        return (
            <div>
                {/* fixed-template in private pages */}
                <Menu active="home"/>                
                <Upper/>

                {/* Content */}
                <Sidebar />
                <MainSection />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user
    }
}

const mapDispatchToProps = disaptch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);