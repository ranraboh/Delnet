import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activatePersonalDetails, activateChangePassword, activateActivnessSection, activateChangeImage } from '../../actions/profile.js'

class NonActiveSection extends Component {
    constructor(props) {
        super(props)
        this.category = this.category.bind(this)
    }

    category(text, active_variable, handler) {
        if (!active_variable) {
            return <h6 className="active-link" onClick={ handler }>{ text }</h6>
        }
        return ''
    }

    render() {
        console.log("activness section")
        console.log(this.props.activeness_section_active)
        let activeness_section = this.category('Activeness Section', this.props.activeness_section_active, this.props.activateActivnessSection)  
        let personal_details = this.category('Personal Details', this.props.personal_details_active, this.props.activatePersonalDetails)  
        let change_password = this.category('Change Password', this.props.change_password_active, this.props.activateChangePassword)        
        let change_image = this.category('Change Image', this.props.change_image_active, this.props.activateChangeImage)        
        return (
            <div id="actives-section">
                { activeness_section }
                { personal_details }
                { change_password }
                { change_image }
                <h6 className="active-link">Security</h6>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        personal_details_active: state.profileReducer.personal_details_active,
        change_password_active: state.profileReducer.change_password_active,
        activeness_section_active: state.profileReducer.activeness_section_active,
        change_image_active: state.profileReducer.change_image_active
    }
}

const mapDispatchToProps = dispatch => {
    return {
        activatePersonalDetails: () => {
            dispatch(activatePersonalDetails());
        },
        activateChangePassword: () => {
            dispatch(activateChangePassword());
        },
        activateActivnessSection: () => {
            dispatch(activateActivnessSection());
        },
        activateChangeImage: () => {
            dispatch(activateChangeImage())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NonActiveSection);
