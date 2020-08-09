import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostHeader from './postheader';
import PostContent from './content';
import { readMoreHide } from '../../actions/posts/state'

class PostModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
        }

        /* bind inner methods */
        this.close_handler = this.close_handler.bind(this);
    }

    close_handler() {
        this.props.readMoreHide()
    }

    render() {
        if (!this.props.read_more)
            return ''
        return (
            <div id="selected_layer_modal" class="modal">
                <button id="btnclose" type="button" class="btn btn-outline-primary btn-close" onClick={ this.close_handler }>
                    <i className="fa fa-check"></i>
                </button>
                <PostHeader title={ this.props.post.title } description={ this.props.post.description } user={ this.props.post.user } />
                <PostContent content={ this.props.post.content } />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        read_more: state.postsReducer.read_more_state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        readMoreHide: () => {
            dispatch(readMoreHide())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);