import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hidePersonalDetails, hideChangePassword, hideActivnessSection, hideChangeImage } from '../../actions/profile.js'

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
        return (
            <div id="actives-section">
                { activeness_section }
                { personal_details }
                { change_password }
                { change_image }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        personal_details_active: state.profileReducer.personal_details_active,
        activeness_section_active: state.profileReducer.activeness_section_active,
        change_password_active: state.profileReducer.change_password_active,
        change_image_active: state.profileReducer.change_image_active
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
        hideChangeImage: () => {
            dispatch(hideChangeImage());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveSection);
