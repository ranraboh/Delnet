import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hidePersonalDetails, hideChangePassword, hideActivnessSection, hideChangeImage ,hideRecieveMessage, hideContentMessage,hideSenderMessage} from '../../actions/profile.js'


class ActiveSection extends Component {
    constructor(props) {
        super(props);
        this.category = this.category.bind(this);
    }

    category(text, active_variable, handler) {
        if (active_variable) {
            return <h6 className="active-link" onClick={ handler }>{ text }</h6>
        }
        return '';
    }

    render() {
        let activeness_section = this.category('Activeness Section', this.props.activeness_section_active, this.props.hideActivnessSection)  
        let personal_details = this.category('Personal Details', this.props.personal_details_active, this.props.hidePersonalDetails)  
        let change_password = this.category('Change Password', this.props.change_password_active, this.props.hideChangePassword)        
        let change_image = this.category('Change Image', this.props.change_image_active, this.props.hideChangeImage)
        let change_sender = this.category('Received Messages ', this.props.active_sender_message, this.props.hideSenderMessage)
        let change_reciever = this.category('Messages Sent', this.props.active_reciever_message, this.props.hideRecieveMessage)
        let change_content = this.category('Write Messages ', this.props.active_content_message, this.props.hideContentMessage) 
        return (
            <div id="actives-section">
                { activeness_section }
                { personal_details }
                { change_password }
                { change_image }
                { change_sender }
                { change_reciever }
                { change_content}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        personal_details_active: state.profileReducer.personal_details_active,
        activeness_section_active: state.profileReducer.activeness_section_active,
        change_password_active: state.profileReducer.change_password_active,
        change_image_active: state.profileReducer.change_image_active,
        active_reciever_message: state.profileReducer.active_reciever_message,
        active_content_message: state.profileReducer.active_content_message,
        active_sender_message: state.profileReducer.active_sender_message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hidePersonalDetails: () => {
            dispatch(hidePersonalDetails());
        },
        hideChangePassword: () => {
            dispatch(hideChangePassword());
        },
        hideActivnessSection: () => {
            dispatch(hideActivnessSection());
        },
        hideContentMessage: () => {
            dispatch(hideContentMessage());
        },
        hideRecieveMessage: () => {
            dispatch(hideRecieveMessage());
        },
        hideSenderMessage: () => {
            dispatch(hideSenderMessage());
        },
        hideChangeImage: () => {
            dispatch(hideChangeImage());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveSection);
