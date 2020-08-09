import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { selectGroup } from '../../actions/posts/state'
import { connect } from 'react-redux';

class Groups extends Component {
    constructor(props) {
        super(props);
        this.select_group = this.select_group.bind(this);
    }

    select_group(group) {
        console.log('select group')
        this.props.selectGroup(group)
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