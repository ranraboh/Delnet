import React, { Component } from 'react'
import NewPost from './newpost'

class UpperCommunity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            new_post: false
        }
        this.new_post_handler = this.new_post_handler.bind(this);
    }

    new_post_handler() {
        this.props.activate()
    }

    render() {
        let type = 'danger'
        if (this.props.status == 'GROUP')
            type = 'success'
        else if (this.props.status == 'HOME')
            type = 'primary'
        return (
            <div class={ "col-xl-12 col-md-8 mb-4"}>
                <div className={"card border-bottom-" + type + " shadow h-200 py-2"}>
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div className="community-upper-buttons">
                                    <button type="button" class="btn btn-dark btn-new-post" onClick={ this.props.home }>Home</button> &nbsp;&nbsp;&nbsp;
                                    <button type="button" class={"btn btn-" + type + " btn-new-post"} onClick={ this.new_post_handler }>New Post</button>
                                </div>
                                <div class={"text-xs font-weight-bold text-" + type + " text-uppercase mb-1"}> { this.props.title } </div>
                            </div>
                        </div>
                        <p/><p/><p/><p/>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpperCommunity;