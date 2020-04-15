import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../home/menu.js';
import Upper from '../home/upper/header.js';
import MainProject from './main-content.js';
import ProjectSideBar from './sidebar.js';
import { homepage } from '../../appconf.js';
 
class ProjectPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user
        }
    }

    componentWillMount() {
        console.log(this.props.loggedIn)
        if (this.props.loggedIn === false || this.props.loggedIn === 'false')
            window.location = homepage + '/login'
    }

    render() {
        return (
            <div>
                <Menu active="projects" />
                <Upper />    
                <ProjectSideBar/>
                <MainProject />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user
    }
}

const mapDispatchToProps = disaptch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);