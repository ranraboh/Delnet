import React, { Component } from 'react'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            description: props.description,
            likes: props.likes,
            comments: props.comments
        }
    }

    render() {
        return (
            <div className="post-section">
                <div className="row">
                    <div className="col-sm-">
                        <section className="post-hole">
                            <div className="post-user-image"></div>
                        </section>
                    </div>
                    <div className="post-text col">
                        <h3>{ this.state.title }</h3>
                        <h5>{ this.state.description }</h5>
                        <button type="button" className="btn btn-outline-danger readmore-button">Read More</button>
                    </div>
                    <div className="post-bottom">
                        <img src="../static/images/likes.png" width="25px" height="20px"></img>
                        { this.state.likes } likes
                        <img src="../static/images/comments.png" width="35px" height="20px"></img>
                        { this.state.comments } comments
                    </div>
                </div>
            </div>
        )
    }
}

export default Post;