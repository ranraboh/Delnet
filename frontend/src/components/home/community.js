import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { myPostsState, myQuestionsState, followedPostsState, followedQuestionsState, followedVideosState } from '../../actions/posts/state'
import { connect } from 'react-redux';
import { homepage } from '../../appconf';

class Community extends Component {
    constructor(props) {
        super(props)
        this.my_posts_handler = this.my_posts_handler.bind(this);
        this.my_questions_handler = this.my_questions_handler.bind(this);
        this.followed_posts_handler = this.followed_posts_handler.bind(this);
        this.followed_questions_handler = this.followed_questions_handler.bind(this);
        this.followed_videos_handler = this.followed_videos_handler.bind(this);
    }

    my_posts_handler() {
        window.localStorage.setItem('community-status', 'MY_POSTS')
        window.location = homepage + '/community'
    }

    my_questions_handler() {
        window.localStorage.setItem('community-status', 'MY_QUESTIONS')
        window.location = homepage + '/community'
    }

    followed_posts_handler() {
        window.localStorage.setItem('community-status', 'FOLLOWED_POSTS')
        window.location = homepage + '/community'
    }

    followed_questions_handler() {
        window.localStorage.setItem('community-status', 'FOLLOWED_QUESIONS')
        window.location = homepage + '/community'
    }

    followed_videos_handler() {
        window.localStorage.setItem('community-status', 'FOLLOWED VIDEOS')
        window.location = homepage + '/community'
    }

    render() {
        return (
            <div className="sidebar-category-section">
                <ul id="community-options-list">
                    <li className="group-item-1" onClick={ this.my_posts_handler } >My Posts</li>
                    <li className="group-item-2" onClick={ this.my_questions_handler }>My Questions</li>
                    <li className="group-item-3" onClick={ this.followed_posts_handler }>Followed Posts</li>
                    <li className="group-item-4" onClick={ this.followed_questions_handler }>Followed Questions</li>
                    <li className="group-item-5" onClick={ this.followed_videos_handler }>Followed Videos</li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        myPostsState: () => {
            dispatch(myPostsState())
        },
        myQuestionsState: () => {
            dispatch(myQuestionsState())
        },
        followedPostsState: () => {
            dispatch(followedPostsState())
        },
        followedQuestionsState: () => {
            dispatch(followedQuestionsState())
        },
        followedVideosState: () => {
            dispatch(followedVideosState())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Community);
