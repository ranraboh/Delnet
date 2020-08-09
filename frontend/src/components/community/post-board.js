import React, { Component } from 'react'
import { connect } from 'react-redux';
import Post from './post'
import { getPosts, getFollowedPosts, getPostsGroup, getUserPosts } from '../../actions/posts/get'

class PostBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
        }
        this.more_handler = this.more_handler.bind(this);
        this.get_posts = this.get_posts.bind(this);
    }

    get_posts() {
        if (this.props.status == 'HOME') 
            this.props.getPosts(this.props.username ,this.state.page)
        else if (this.props.status == 'GROUP')
            this.props.getPostsGroup(this.props.group.id, this.props.username, this.state.page)
        else if (this.props.status == 'MY_POSTS')
            this.props.getUserPosts(this.props.username, this.state.page)
        else if (this.props.status == 'FOLLOWED_POSTS')
            this.props.getFollowedPosts(this.props.username, this.state.page)        
    }

    more_handler() {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.get_posts()
        })
    }

    render() {
        if (this.props.status in [ 'MY_QUESTIONS', 'FOLLOWED_QUESTIONS', 'FOLLOWED_VIDEOS' ])
            return ''
        if (this.props.posts.length == 0 && this.props.empty == false) {
            if (this.state.page == 1)
                this.get_posts()
            else {
                this.setState({
                    ...this.state,
                    page: 1,
                }, () => {
                    this.get_posts()
                    return ''
                })
            }
        }
        if (this.props.posts.length == 0)
            return ''
        return (
            <div id="posts-section">
                <h5 class="category-title">What's New</h5>
                {
                    this.props.posts.map((record) => 
                        <Post id={ record.id } title={ record.title } description={ record.description } time={ record.time } date={ record.date } user={ record.user } image={ record.image } content={ record.content }
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
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        posts: state.postsReducer.posts,
        status: state.postsReducer.status,
        group: state.postsReducer.group_selected,
        empty: state.postsReducer.empty.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPosts: (user, page) => {
            dispatch(getPosts(user, page))
        },
        getPostsGroup: (group, user, page) => {
            dispatch(getPostsGroup(group, user, page))
        },
        getUserPosts: (user, page) => {
            dispatch(getUserPosts(user, page))
        },
        getFollowedPosts: (user, page) => {
            dispatch(getFollowedPosts(user, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostBoard);