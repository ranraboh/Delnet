import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homepage } from '../../appconf.js';
import { uploadFiles } from '../../actions/project/files.js'
 
class UploadModelFiles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.username,
            files: []
        }

        /* bind methods */
        this.upload_files = this.upload_files.bind(this);
        this.select_files = this.select_files.bind(this);
    }

    upload_files = () => {
        if (this.state.files == null)
            return
        this.props.uploadFiles({
            files: this.state.files,
            user: this.state.username,
            project: this.props.project_data.id
        }, () => {
            alert('the files added successfully')
        })
    }

    select_files = (event) => {
        let files_list = []
        for (var i = 0; i < event.target.files.length; i++)
            files_list[i] = event.target.files[i]
        this.setState({
            ...this.state,
            files: files_list
        });
    }

    render() {
        return (
            <div id="upload-model-section" className="container">
                <div className="row">
                    <div className="col-4">
                        <h2 className="text">Files</h2>
                    </div>
                    <div className="col-4">
                        <input multiple id="input-model-files" type="file" onChange={ this.select_files } />
                    </div>
                </div>
                <button id="button-upload" type="button" class="btn btn-primary" onClick={ this.upload_files }>Send</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        project_data: state.projectReducer.project_selected,
        username: state.authentication.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        uploadFiles: (files_object, callback) => {
            dispatch(uploadFiles(files_object, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadModelFiles);