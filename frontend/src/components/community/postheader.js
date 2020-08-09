import React, { Component } from 'react';
import { connect } from 'react-redux';

 
class PostHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            selected_section: 0,
            sections: [ 'Accuracy', 'Loss', 'Recall', 'Precision', 'F1 Score', 'Confusion Matrix' ]
        }

        /* bind inner methods */
        this.on_change = this.on_change.bind(this);
        this.section = this.section.bind(this);
    }

    on_change(index) {
        this.setState({
            ...this.state,
            selected_section: index
        })
    }

    section(html_section, available) {
        if (available) {
            return (
                <div>
                    { html_section }
                </div>
            )
        }
        return ''
    }

    render() {
        return (
            <div id="post-header-modal" className="modal-section">
                <h1>{ this.props.title }</h1>
                <h3>{ this.props.description }</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostHeader);

