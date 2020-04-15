import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUserImage, uploadImage } from '../../actions/users.js'

class ChangeImage extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            user: {
                username: props.username,
                image: props.image
            },
            types: ['upload from computer', 'provide url' ],
            selected_type: 0
        }

        /* bind methods */
        this.upload_selection = this.upload_selection.bind(this)
        this.url_selection = this.url_selection.bind(this)
        this.upload_image = this.upload_image.bind(this)
        this.update_image = this.update_image.bind(this)
    }

    /* upload the selected image into server */
    upload_image(e) {
        let file = e.target.files[0]
        this.props.uploadImage({ 
            'name': file.name,
            'image': file,
            'user': this.state.user.username
        })
    }

    /* update state whenever data has been modified in the form */
    on_change(field, value) {
        let user = this.state.user;
        user[field] = value;

        this.setState({
            ...this.state,
            user
        })
    }

    update_image() {
        this.props.updateUserImage({ image: this.state.user.image, username: this.state.user.username}, () =>{
            alert('image successfully updated')
        })
    }

    url_section(condition) {
        if (condition) {
            return (
                <div id="url-section col-sm" >
                    <textarea cols="50" rows="4"  type="text" name="image" value={ this.state.user.image } className="textbox-v1" 
                        onChange={ (e) => this.on_change('image', e.target.value) } />
                    <label className="label-v1">Image Url</label>
                </div>
            )
        }
        return ''
    } 

    upload_section(condition) {
        if (condition) {
            return (
                <div id="upload-section">
                    <input type="file" id="img" name="img" accept="image/*"  
                        onChange= { this.upload_image } />
                </div>
            )
        }
        return ''
    } 

    upload_selection() {
        this.setState({
            ...this.state,
            selected_type: 0
        })
    }

    url_selection() {
        this.setState({
            ...this.state,
            selected_type: 1
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                image: nextProps.image
            }
        })
    }

    render() {
        let upload_section = this.upload_section(this.state.selected_type === 0)
        let url_section = this.url_section(this.state.selected_type === 1)
        return (
            <div id="change-image" className="section-in-main">
                <div id="inner-change-password">
                    {/* introduction */}
                    <div className="col-sm intro-change-password"> 
                        <h6>In the section you can change your image</h6>
                        <h6>You can upload an image from your computer or enter url of your photo</h6>
                    </div>

                    {/* radio buttons select wether to upload an image from computer or provide url */}
                    <div id="change-image-type-selection">
                        <p>
                            <input type="radio" name="change-image-type" className="radio-button-v1 radio-button-v1-red"
                                checked={ this.state.selected_type === 0 } />
                            <label className="radio-button-v1-label" for={ this.state.types[0] } onClick={ this.upload_selection }>{ this.state.types[0] }</label>
                        </p>
                        <p>
                            <input type="radio" name="change-image-type" className="radio-button-v1 radio-button-v1-blue"
                                checked={ this.state.selected_type === 1 } />
                            <label className="radio-button-v1-label" for={ this.state.types[1] } onClick={ this.url_selection }>{ this.state.types[1] }</label>
                        </p>
                    </div>

                    { upload_section }
                    { url_section }
                    <img src={ this.state.user.image } className="personal-image" />

                    {/* possible operations */}
                    <div id="profile-operations">
                        <button type="button" className="button-v1 button-v1-blue button-v1-small"
                            onClick={ this.update_image }>Update</button>
                        <button type="button" className="button-v1 button-v1-purple button-v1-small">Reset</button>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        firstname: state.userReducer.firstname,
        lastname: state.userReducer.lastname,
        gender: state.userReducer.gender,
        occupation: state.userReducer.occupation,
        email: state.userReducer.email,
        join_date: state.userReducer.join_date,
        image: state.userReducer.image,
        upload_image: state.userReducer.upload_image
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getUserDetails: (username) => {
            disaptch(getUserDetails(username));
        },
        updateUserImage: (user, callback) => {
            disaptch(updateUserImage(user, callback))
        },
        uploadImage: (image) => {
            disaptch(uploadImage(image))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeImage);