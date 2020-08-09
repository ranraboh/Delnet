import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../home/menu';
import Upper from '../home/upper/header';
import { homepage } from '../../appconf.js';
import CommunityMain from './main'
import CommunitySidebar from './sidebar'

class CommunityPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user
        }
    }

    componentWillMount() {
        if (this.props.loggedIn === false || this.props.loggedIn === 'false')
            window.location = homepage + '/login';
    }

    render() {
        return (
            <div>
                <Menu active="community" />
                <Upper />   
                <CommunitySidebar/>
                <CommunityMain/> 
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
    }
}

const mapDispatchToProps = disaptch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityPage);