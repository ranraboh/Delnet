import React, { Component } from 'react';
import { connect } from 'react-redux';

 
class PostContent extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        console.log(this.props.content)
        return (
            <div id="post-content-modal" className="modal-section">
                <pre>{ this.props.content }</pre>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user
    }
}

const mapDispatchToProps = disaptch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContent);

