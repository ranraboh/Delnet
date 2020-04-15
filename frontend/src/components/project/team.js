import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homepage } from '../../appconf.js';
import TeamTable from './team-table.js';
import AddMember from './add-member.js'
 
class ProjectTeam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            create_toggle: false
        }
        this.create_toggle = this.create_toggle.bind(this);
    }

    componentWillMount() {
        console.log(this.props.loggedIn)
        if (this.props.loggedIn === false || this.props.loggedIn === 'false')
            window.location = homepage + '/login'
    }


    create_toggle() {
        this.setState({
            create_toggle: !this.state.create_toggle
        })
    }

    render() {
        let toggle_section = <TeamTable />;
        let button_caption = 'Add New Member'
        if (this.state.create_toggle) {
            toggle_section = <AddMember />
            button_caption = 'Show Members'
        }
        return (
            <div id="project-team-section" className="section-in-main">
                <div id="project-team-header">
                    <h1 id="projects-title">
                        Project Team
                    </h1>
                    <h2 id="projects-intro">
                        This section contains list of users that take part in the project.
                    </h2>
                </div>
                { toggle_section }
                <button type="button" class="btn btn-primary btn-new-project" onClick={ this.create_toggle }>{ button_caption }</button>
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

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTeam);