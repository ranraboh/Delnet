import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Activeness from '../home/activeness.js';
import PersonalDetails from './personal';
import ChangePassword from './change-password.js';
import ChangeImage from './change-image.js';



class MainProfileContent extends Component {
    constructor(props) {
        super(props)
        this.section = this.section.bind(this)
    }

    section(html_section, title , available) {
        if (available) {
            return (
                <div>
                    <h5 class="category-title">{ title }</h5>
                    { html_section }
                </div>
            )
        }
        return ''
    } 

    render() {
        let activeness_section = this.section(<Activeness/>, 'Activeness', this.props.activeness_section_active)
        let personal_details_section = this.section(<PersonalDetails/>, 'Personal Details', this.props.personal_details_active)
        let change_password_section = this.section(<ChangePassword/>, 'Change Password', this.props.change_password_active)
        let change_image_section = this.section(<ChangeImage/>, 'Change Image', this.props.change_image_active)
        return (
            <div className="main-section">
                { activeness_section }
                { personal_details_section }
                { change_password_section }
                { change_image_section }
            </div>
        );
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainProfileContent);
