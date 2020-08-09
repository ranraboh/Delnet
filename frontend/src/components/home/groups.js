import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { selectGroup } from '../../actions/posts/state'
import { connect } from 'react-redux';
import { homepage } from '../../appconf';

class Groups extends Component {
    constructor(props) {
        super(props);
        this.select_group = this.select_group.bind(this);
    }

    select_group(group) {
        window.localStorage.setItem('community-status', 'GROUP')
        window.localStorage.setItem('community-group-id', group.id)
        window.localStorage.setItem('community-group-name', group.name)
        window.location = homepage + '/community'
    }

    render() {
        if (this.props.groups == null)
            return ''
        return (
        <div className="sidebar-category-section">
            <ul id="groups-list">
                {
                    this.props.groups.map((record, index) => 
                        <li class={ "group-item-" + ((index + 1) % 7) } onClick={ () => this.select_group(record) } >{ record.name }</li>
                    )
                }
            </ul>
        </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        groups: state.postsReducer.groups
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectGroup: (group) => {
            dispatch(selectGroup(group))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);