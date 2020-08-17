import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homepage } from '../../appconf.js';
import DatasetTeamTable from './team-table';
import AddMember from './add-member'
 
class DatasetTeam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            create_toggle: false
        }
        this.create_toggle = this.create_toggle.bind(this);
    }

    create_toggle() {
        this.setState({
            create_toggle: !this.state.create_toggle
        })
    }

    render() {
        let toggle_section = <DatasetTeamTable />;
        let button_caption = 'Add New Member'
        if (this.state.create_toggle) {
            toggle_section = <AddMember />
            button_caption = 'Show Members'
        }
        return (
            <div id="project-team-section" className="section-in-main">
                <div className="header-section-v2">
                    <h1 className="dataset-header-title dataset-header-blue">
                        Dataset Collectors
                    </h1>
                </div>
                { toggle_section }
                {
                    (this.props.premissions < 4)?'':
                    <button type="button" class="btn btn-primary btn-new-project" onClick={ this.create_toggle }>{ button_caption }</button>
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        premissions: state.datasetsReducer.dataset_selected.premissions
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetTeam);