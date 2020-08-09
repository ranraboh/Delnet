import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroups } from '../../actions/posts/get'
import { addPost, assignedGroups } from '../../actions/posts/manipulation'
import { newPostHide } from '../../actions/posts/state'
import { homepage } from '../../appconf.js';

class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Title',
            description: 'Description',
            content: 'Content',
            post: {
                id: -1,
                content: '',
                title: '',
                description: '',
                type: 'a',
                groups: {},
                user: this.props.username,
            }
        }

        /* load data */
        this.props.getGroups()

        /* bind inner methods */
        this.close_handler = this.close_handler.bind(this);
        this.video_handler = this.video_handler.bind(this);
        this.post_handler = this.post_handler.bind(this);
        this.question_handler = this.question_handler.bind(this);
        this.select_group = this.select_group.bind(this);
        this.add_post_handler = this.add_post_handler.bind(this);
    }

    add_post_handler() {
        this.props.addPost(this.state.post, () => {
            let post = this.state.post
            console.log(this.props.added_post)
            post.id = this.props.added_post.id
            this.setState({
                ...this.state,
                post
            }, () => {
                this.props.assignedGroups(this.state.post, () => {
                    alert('the post has been added successfully')
                    window.location = homepage + '/community'
                })
            })
        })
    }

    UNSAFE_componentWillReceiveProps() {
        this.setState({
            ...this.state,
            show: true
        })
    }

    post_handler() {
        let post = this.state.post;
        post.type = 'a'
        this.setState({
            ...this.state,
            title: 'Title',
            description: 'Description',
            content: 'Content',
            post: post 
        })
    }

    question_handler() {
        let post = this.state.post;
        post.type = 'q'
        post.description = '-'
        this.setState({
            ...this.state,
            title: 'Title',
            description: '',
            content: 'Question',
            post: post 
        })
    }

    video_handler() {
        let post = this.state.post;
        post.type = 'v'
        this.setState({
            ...this.state,
            title: 'Title',
            description: 'Video',
            content: 'Content',
            post: post 
        })
    }

    close_handler() {
        this.props.newPostHide()
    }

    on_change(field, value) {
        let post = this.state.post;
        post[field] = value;
        this.setState({
            ...this.state,
            post
        })
    }

    select_group(id) {
        let groups = this.state.post.groups
        if (id in groups && groups[id] == true)
            groups[id] = false
        else 
            groups[id] = true
        this.setState({
            ...this.state,
            groups
        })
    }

    render() {
        console.log("show log")
        console.log(this.props.show)
        if (!this.props.show || this.props.groups == null)
            return ''
        return (
            <div id="selected_layer_modal" class="modal">
                <button id="btnclose" type="button" class="btn btn-outline-primary btn-close" onClick={ this.close_handler }>
                    <i className="fa fa-check"></i>
                </button>
                <div id="new-post-groups" className="modal-section">
                    {
                        this.props.groups.map((record)=> 
                            <div>
                                <input type="checkbox" name="group" className="radio-button-v1 radio-button-v1-purple" checked={ record.id in this.state.post.groups && this.state.post.groups[record.id] == true } />
                                <label className="radio-button-v1-label" onClick={ () => this.select_group(record.id) }>{ record.name }</label>
                            </div>
                        )
                    }
                </div>
                <div id="new-post-header" className="modal-section">
                    <div className="newpost-type">
                        <input type="radio" id="button_female" name="gender-group" className="radio-button-v1 radio-button-v1-green" checked= { this.state.post.type === 'a' } />
                        <label className="radio-button-v1-label" for="female" onClick={ this.post_handler }>Post</label>&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="button_female" name="gender-group" className="radio-button-v1 radio-button-v1-yellow" checked= { this.state.post.type === 'q' } />
                        <label className="radio-button-v1-label" for="female" onClick={ this.question_handler }>Question</label>&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="button_female" name="gender-group" className="radio-button-v1 radio-button-v1-red" checked= { this.state.post.type === 'v' } />
                        <label className="radio-button-v1-label" for="female" onClick={ this.video_handler }>Video</label>                
                    </div>
                    <h4>New Post</h4>
                </div>
                <div id="new-post-form"  className="modal-section">
                    <div id="container">
                    <div className="row">
                            <div className="col-2">
                                <p className="project-form-field">{ this.state.title }</p>
                            </div>
                            <div className="col-8">
                                <div class="value">
                                    <input class="input-posts" name="project_description" value={ this.state.post.title }
                                        onChange={ (e) => this.on_change('title', e.target.value) }/>
                                </div>
                            </div>
                        </div>
                        <p/>
                        {
                        (this.state.post.type == 'q')?'':
                        <div className="row">
                            <div className="col-2">
                                <p className="project-form-field">{ this.state.description }</p>
                            </div>
                            <div className="col-8">
                                <div class="value">
                                    <textarea className="input-posts" rows="2" cols="100" name="post_description" value={ this.state.post.description }
                                    onChange={ (e) => this.on_change('description', e.target.value) }/>
                                </div>
                            </div>
                        </div>
                        }
                        <p/>
                        <div className="row">
                            <div className="col-2">
                                <p className="project-form-field">{ this.state.content }</p>
                            </div>
                            <div className="col-8">
                                <div class="value">
                                    <textarea class="input-posts" rows="7" cols="100" name="project_description" value={ this.state.post.content }
                                    onChange={ (e) => this.on_change('content', e.target.value) }/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p/>
                    <button type="button" className="btn btn-outline-primary readlater-button" onClick={ this.add_post_handler }>Send</button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        groups: state.postsReducer.groups,
        added_post: state.postsReducer.post_added,
        show: state.postsReducer.new_post_state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGroups: () => {
            dispatch(getGroups())
        },
        addPost: (post, callback) => {
            dispatch(addPost(post, callback))
        },
        assignedGroups: (post, callback) => {
            dispatch(assignedGroups(post, callback))
        },
        newPostActivate: () => {
            dispatch(newPostActivate())
        },
        newPostHide: () => {
            dispatch(newPostHide())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);