import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PostBoard from './post-board'
import QuestionBoard from './questions-board'
import VideoBoard from './video-board'
import NewPost from './newpost'
import { connect } from 'react-redux';
import UpperCommunity from './upper'
import { homeState } from '../../actions/posts/state'
import { newPostActivate,selectGroup  } from '../../actions/posts/state'
import { myPostsState, myQuestionsState, followedPostsState, followedQuestionsState, followedVideosState } from '../../actions/posts/state'

class CommunityMain extends Component {
    constructor(props) {
        super(props)
        let status = window.localStorage.getItem('community-status')
        if (status == 'GROUP')
            this.props.selectGroup({
                id: window.localStorage.getItem('community-group-id'),
                name: window.localStorage.getItem('community-group-name')
            })
        else if (status == 'MY_POSTS')
            this.props.myPostsState()
        else if (status == 'MY_QUESTIONS')
            this.props.myQuestionsState()
        else if (status == 'FOLLOWED_POSTS')
            this.props.followedPostsState()
        else if (status == 'FOLLOWED_QUESTIONS')
            this.props.followedQuestionsState()
        else if (status == 'FOLLOWED_VIDEOS')
            this.props.followedVideosState()
        window.localStorage.setItem('community-status', '-')
        window.localStorage.setItem('community-group', '-')
    }
    render() {
        let title = ''
        if (this.props.status == 'HOME')
            title = 'Community'
        else if (this.props.status == 'GROUP')
            title = this.props.group_selected.name
        else 
            title = this.props.status
        return (
            <div className="main-section">
                {/* New Post */}
                {
                    (this.props.show_new_post)?<NewPost/>:''
                }

                {/* Upper */}
                <UpperCommunity status={ this.props.status } title={ title } home={ this.props.homeState } activate={ this.props.newPostActivate } />

                {/* Posts section */}
                <PostBoard />
                <QuestionBoard/>
                <VideoBoard/>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        status: state.postsReducer.status,
        group_selected: state.postsReducer.group_selected,
        show_new_post: state.postsReducer.new_post_state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        homeState: () => {
            dispatch(homeState())
        },
        newPostActivate: () => {
            dispatch(newPostActivate())
        },
        selectGroup: (group) => {
            dispatch(selectGroup(group))
        },
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

export default connect(mapStateToProps, mapDispatchToProps)(CommunityMain);
