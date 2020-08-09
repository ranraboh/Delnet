import React, { Component } from 'react'
import { connect } from 'react-redux';
import { LikePost, UnlikePost, CommentPost, followPost, unfollowPost } from '../../actions/posts/manipulation'
import { readMoreActivate, readMoreHide } from '../../actions/posts/state'
import PostContent from './modal'

class Post extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            post: props.id,
            title: props.title,
            description: props.description,
            likes: props.likes,
            comments: props.comments,
            content: props.content,
            image: props.image,
            groups: props.groups,
            followed: props.followed,
            show_comments: false,
            like_id: props.like_id,
            new_comment: '',
            comments_data: this.props.comments_data,
        }
        this.show_comments_handler = this.show_comments_handler.bind(this);
        this.like_handler = this.like_handler.bind(this);
        this.add_comment = this.add_comment.bind(this);
        this.comment_change = this.comment_change.bind(this);
        this.read_more = this.read_more.bind(this);
        this.follow_handler = this.follow_handler.bind(this);
    }

    follow_handler(post_id) {
        if (this.state.followed > 0) {
            this.props.unfollowPost(this.state.followed, () => {
                this.setState({
                    ...this.state,
                    followed: -1
                })
            })
        } else {
            this.props.followPost({
                post: post_id,
                user: this.props.username
            }, () => {
                this.setState({
                    ...this.state,
                    followed: this.props.follow_record.id
                })
            })
        }
    }

    read_more() {
        this.props.readMoreActivate(this.state.post)
    }

    show_comments_handler() {
        this.setState({
            ...this.state,
            show_comments: !this.state.show_comments
        })
    }

    comment_change(content) {
        this.setState({
            ...this.state,
            new_comment: content
        })
    }

    add_comment() {
        this.props.CommentPost({
            content: this.state.new_comment,
            user: this.props.username,
            post: this.state.post,
            image: this.props.user_image
        }, () => {
            let comments_data = this.state.comments_data
            comments_data.push(this.props.new_comment)
            this.setState({
                ...this.state,
                comments_data: comments_data,
                new_comment: '',
                comments: this.state.comments + 1
            })
        })
    }

    like_handler() {
        if (this.state.like_id < 0) {
            this.props.LikePost({
                post: this.state.post,
                user: this.props.username
            }, () => {
                this.setState({
                    ...this.state,
                    like_id: this.props.updated.id,
                    likes: this.state.likes + 1
                })
            })
        } else {
            this.props.UnlikePost(this.state.like_id, () => {
                this.setState({
                    ...this.state,
                    like_id: -1,
                    likes: this.state.likes - 1
                })
            })
        }
    }

    render() {
        return (
            <div className="post-section">
                {
                    (this.props.read_more == this.state.post)?(<PostContent post={ this.state } />):''
                }
                <div className="row">
                    <div className="col-sm-">
                        <section className="post-hole">
                            <img src={ this.state.image } className="post-user-image"></img>
                        </section>
                    </div>
                    <div className="post-text col">
                        <h3>{ this.state.title }</h3>
                        <h6><i class="fa fa-edit" aria-hidden="true"></i>
                        &nbsp;&nbsp;by { this.props.user }</h6><br/>
                        <h6><i class="fa fa-clock-o" aria-hidden="true"></i>
                        &nbsp;&nbsp;{ this.props.date + " - " + this.props.time.substring(0, 8) }</h6>
                    </div>
                </div>
                <div className="row">
                    <h5 className="post-content">{ this.state.description }</h5>
                </div>
                {
                    (this.props.groups.length <= 0)? '':
                    <div className="row">
                                <span className="groups-post-underline">Groups:</span>
                                {
                                    this.props.groups.map((record) => 
                                        <span className="groups-post">
                                            { record.name }
                                        </span>
                                    )
                                }
                        </div>
                    }
                    <div className="row">
                    <div className="post-bottom">
                        <button type="button" className="btn btn-outline-danger readmore-button" onClick={ this.read_more }>Read More</button>&nbsp;&nbsp;
                        <button type="button" className="btn btn-outline-primary readlater-button"
                            onClick={ () => this.follow_handler(this.state.post) }>{ (this.state.followed == -1)?'Read Later':'Unfollow' }</button>
                        <p/>
                        <img src="../static/images/likes.png" width="35px" height="25px"></img>
                        &nbsp; 
                        <span onClick={ this.like_handler } className={ (this.state.like_id > 0)?"comments-link-active":"comments-link-inactive" }>
                           { this.state.likes } likes 
                        </span>&nbsp;&nbsp;&nbsp;
                        <img src="../static/images/comments.png" width="42px" height="25px"></img>
                        &nbsp; 
                        <span onClick={ this.show_comments_handler } className={ (this.state.show_comments)?"comments-link-active":"comments-link-inactive" }>
                           { this.state.comments } comments 
                        </span>

                    </div>
                </div>
                <div className={(this.state.show_comments)?"post-comments":"comments-hide"}>
                       {
                            this.state.comments_data.map((record) => 
                                <div className="">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-">
                                                <section className="comment-hole">
                                                    <img src={ record.image } className="comment-user-image"></img>
                                                </section> 
                                            </div>
                                            <div className="col-8 comment">
                                                <h4>{ record.user }</h4>
                                                <h5>{ record.content }</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           )
                }
                    <div className="container">
                        <div className="row">
                            <div className="col-8">
                                <div className="comment-box value">
                                    <input type="text" name="comment" className="textbox-v1" value={this.state.new_comment}
                                    onChange={ (e) => this.comment_change(e.target.value) } />
                                    <label className="label-v1">Comment</label>
                                </div> 
                            </div>
                            <div className="col-2">
                                <button type="button" class="btn btn-primary comment-send-button" onClick={ this.add_comment }>Send</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )}
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        updated: state.postsReducer.updated_post,
        new_comment: state.postsReducer.new_comment,
        user_image: state.userReducer.image,
        follow_record: state.postsReducer.follow_record,
        read_more: state.postsReducer.read_more_state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        LikePost: (record, callback) => {
            dispatch(LikePost(record, callback))
        },
        UnlikePost: (like_id, callback) => {
            dispatch(UnlikePost(like_id, callback))
        },
        CommentPost: (comment_record, callback) => {
            dispatch(CommentPost(comment_record, callback))
        },
        followPost: (follow_record, callback) => {
            dispatch(followPost(follow_record, callback))
        },
        unfollowPost: (follow_id, callback) => {
            dispatch(unfollowPost(follow_id, callback))
        },
        readMoreActivate: (post) => {
            dispatch(readMoreActivate(post))
        },
        readMoreHide: () => {
            dispatch(readMoreHide())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Post);