import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'
import { LikePost, UnlikePost, CommentPost, followPost, unfollowPost } from '../../actions/posts/manipulation'

class Video extends Component {
    constructor(props) {
        super(props)
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
            show_content: false,
            like_id: props.like_id,
            new_comment: '',
            comments_data: this.props.comments_data,
        }
        this.show_comments_handler = this.show_comments_handler.bind(this);
        this.like_handler = this.like_handler.bind(this);
        this.add_comment = this.add_comment.bind(this);
        this.comment_change = this.comment_change.bind(this);
        this.show_content_handler = this.show_content_handler.bind(this);
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

    show_comments_handler() {
        this.setState({
            ...this.state,
            show_comments:!this.state.show_comments
        })
    }

    show_content_handler() {
        this.setState({
            ...this.state,
            show_content: !this.state.show_content
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
            this.props.UnlikePost(this.state.like_id, () =>{
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
                <div className="row">
                    <div className="col-sm-">
                        <section className="post-hole">
                            <img src={ this.state.image } className="post-user-image"></img>
                        </section>
                    </div>
                    <div className="post-text col">
                        <h5>{ this.state.title }</h5>
                        <h6><i class="fa fa-edit" aria-hidden="true"></i>
                        &nbsp;&nbsp;by { this.props.user }</h6><br/>
                        <h6><i class="fa fa-clock-o" aria-hidden="true"></i>
                        &nbsp;&nbsp;{ this.props.date + " - " + this.props.time.substring(0, 8) }</h6>
                    </div>
                    <div className="question-buttons">
                        <button type="button" className="btn btn-outline-success video-view-button" onClick={ this.show_content_handler }>View</button>&nbsp;&nbsp;
                        <button type="button" className="btn btn-outline-warning video-save-button"
                            onClick={ () => this.follow_handler(this.state.post) }>{ (this.state.followed == -1)?'Save':'Unfollow' }</button>
                        <p/>
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
                {   
                    (this.state.show_content)?
                    <div className="row">
                        <pre className="post-content question-text">{ this.state.content }</pre>
                    </div>:''
                }  
                {   
                    (this.state.show_content)?
                    <div className="row">
                        <ReactPlayer className="post-content" url={ this.state.description }/>
                    </div>:''
                }
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
                                <div class="comment-box value">
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
        follow_record: state.postsReducer.follow_record
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Video);