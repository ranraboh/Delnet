import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { homepage } from '../../appconf.js';
import UploadModelFiles from './upload.js';
import ProjectsFilesTable from './files-table.js';
import FileContent from './file-content.js';

class ModelFiles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            selected_option: 0,
            options: [ 'Model Files', 'Add New File' ]
        }

        /* bind inner methods */
        this.upload_selection = this.upload_selection.bind(this)
        this.files_selection = this.files_selection.bind(this)
        this.section = this.section.bind(this)
    }

    upload_selection() {
        this.setState({
            ...this.state,
            selected_option: 1
        })
    }

    
    files_selection() {
        this.setState({
            ...this.state,
            selected_option: 0
        })
    }

    section(html_section, condition) {
        if (condition) {
            return (
                <div>
                    { html_section }
                </div>
            )
        }
        return ''
    } 

    componentWillMount() {
        console.log(this.props.loggedIn)
        if (this.props.loggedIn === false || this.props.loggedIn === 'false')
            window.location = homepage + '/login'
    }

    componentWillReceiveProps() {
        this.setState({
            ...this.state,
            selected_option: 2
        })
    }

    render() {
        let file_content = this.section(<FileContent />, this.state.selected_option === 2)
        let upload_section = this.section(<UploadModelFiles/>, this.state.selected_option === 1)
        let files_list = this.section(<ProjectsFilesTable/>, this.state.selected_option === 0)
        return (
            <div id="files-section" className="section-in-main">
                <div className="header-section-v1 header-v1-cyan">
                    <h1 id="projects-title">
                        Model Files
                    </h1>
                    <h2 id="projects-intro">
                       In this section you can access and manage your model files.
                       You are able to insert new files, update your files and so on.
                    </h2>
                </div>
                {
                    (this.props.premissions < 3)?'':
                    <div id="change-image-type-selection">
                        <span>
                            <input type="radio" name="change-options" className="radio-button-v1 radio-button-v1-blue"
                                checked={ this.state.selected_option != 1 } />
                            <label className="radio-button-v1-label" for={ this.state.options[0] } onClick={ this.files_selection }>{ this.state.options[0] }</label>&nbsp;	&nbsp;	
                        </span>
                        <span>
                            <input type="radio" name="change-options" className="radio-button-v1 radio-button-v1-purple"
                                checked={ this.state.selected_option == 1 } />
                            <label className="radio-button-v1-label" for={ this.state.options[1] } onClick={ this.upload_selection }>{ this.state.options[1] }</label>
                        </span>
                    </div>
                }
                <h4 className="files-instructions">Instructions for uploading model files:</h4>
                <ul className="files-instructions">
                    <li>the main code file of your model implementation should be called model.py</li>
                    <li>your model class should be named as class Model</li>
                </ul>
                { upload_section }
                { files_list }
                { file_content }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        selected_file: state.projectReducer.file_selected,
        premissions: state.projectReducer.project_selected.premissions
    }
}

const mapDispatchToProps = disaptch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelFiles);