import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getVideos, getFollowedVideos, getVideosGroup } from '../../actions/posts/get'
import { dataAcheived } from '../../actions/posts/state'
import Video from './video'

class VideoBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
        }
        this.more_handler = this.more_handler.bind(this);
        this.get_videos = this.get_videos.bind(this);
    }

    get_videos() {
        if (this.props.status == 'HOME') 
            this.props.getVideos(this.props.username ,this.state.page)
        else if (this.props.status == 'GROUP')
            this.props.getVideosGroup(this.props.group.id, this.props.username, this.state.page)
        else if (this.props.status == 'FOLLOWED_VIDEOS')
            this.props.getFollowedVideos(this.props.username, this.state.page)        
    }

    more_handler() {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.get_videos()
        })
    }

    render() {
        if (this.props.status == 'MY_POSTS' || this.props.status == 'FOLLOWED_POSTS' || 
            this.props.status == 'FOLLOWED_QUESTIONS' || this.props.status == 'MY_QUESTIONS') {
            return ''
        }
        if (this.props.videos.length == 0 && this.props.empty == false) {
            if (this.state.page == 1)
                this.get_videos()
            else {
                this.setState({
                    ...this.state,
                    page: 1,
                }, () => {
                    this.get_videos()
                    return ''
                })
            }
        }
        if (this.props.videos.length == 0)
            return ''
        return (
            <div id="posts-section">
                <h5 class="category-title">Videos</h5>
                {
                    this.props.videos.map((record) => 
                        <Video id={ record.id } title={ record.title } description={ record.description } time={ record.time } date={ record.date } user={ record.user } image={ record.image } content={ record.content }
                            likes={ record.quantity.likes } comments={ record.quantity.comments } comments_data={ record.comments } like_id={ record.like_id } groups={ record.groups } followed={ record.followed } />
                    )
                }
                 <a id="projects_button" className="button-v2" onClick={ this.more_handler }>
                        <svg class="icon-arrow before">
                            <use href="#arrow"></use>
                        </svg>
                        <span class="label">More</span>
                        <svg class="icon-arrow after">
                            <use href="#arrow"></use>
                        </svg>
                    </a>
                    <svg>
                    <defs>
                        <symbol id="arrow" viewBox="0 0 35 15">
                        <title>Arrow</title>
                        <path d="M27.172 5L25 2.828 27.828 0 34.9 7.071l-7.07 7.071L25 11.314 27.314 9H0V5h27.172z "/>
                        </symbol>
                    </defs>
                    </svg>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        videos: state.postsReducer.videos,
        status: state.postsReducer.status,
        group: state.postsReducer.group_selected,
        empty: state.postsReducer.empty.videos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getVideos: (user, page,  callback) => {
            dispatch(getVideos(user, page, callback))
        },
        getVideosGroup: (group, user, page, callback) => {
            dispatch(getVideosGroup(group, user, page, callback))
        },
        getFollowedVideos: (user, page, callback) => {
            dispatch(getFollowedVideos(user, page, callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoBoard);