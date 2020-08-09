import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homepage } from '../../appconf.js';
import { selectFile, getFileContent, updateFileContent } from '../../actions/project/files.js'
 
class FileContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            file: props.file_selected,
            selected_option: props.selected_option
        }

        /* bind inner data */
        this.on_change = this.on_change.bind(this);
        this.model_files = this.model_files.bind(this);
        this.update_file_content = this.update_file_content.bind(this);

        /* send request for data from backend */
        this.props.getFileContent(this.state.file.id)
    }

    update_file_content() {
        console.log('updating...')
        this.props.updateFileContent(this.state.file, () => {
            alert('the file content update successfully')
        })
    }

    model_files() {
        console.log(this.state)
        let selected_option = this.state.selected_option
        selected_option.current = 0
        this.setState({
            ...this.state,
            selected_option: selected_option
        })
        console.log(selected_option)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            file: {
                ...this.state.file,
                content: nextProps.file_selected.content
            }
        })
    }

    on_change(field, value) {
        let file = this.state.file;
        file[field] = value;
        this.setState({
            ...this.state,
            file
        })
    }

    componentWillMount() {
        console.log(this.props.loggedIn)
        if (this.props.loggedIn === false || this.props.loggedIn === 'false')
            window.location = homepage + '/login'
    }

    render() {
        return (
            <div id="file-content container">
                <div className="row">
                    <div id="file-image" className="col-2">
                        
                    </div>
                    <div id="file-information" className="col-9 value">
                        <div>
                            Name: { this.state.file.name }
                        </div>
                        <div>
                            Size: { this.state.file.size }
                        </div>
                        <div>
                            Type: { this.state.file.type }
                        </div>
                        <div>
                            Insert by: { this.state.file.insert_by }
                        </div>
                        <div>
                            Insertion date: { this.state.file.insertion_date }
                        </div>
                        <p/>
                        <div>
                            Content:
                            <pre>
                            <textarea class="input-projects preformatted" rows="8" cols="70" name="dataset_description"
                                value={ this.state.file.content } onChange={ (e) => this.on_change('content', e.target.value) } />
                            </pre>
                        </div>
                        <button type="button" class="btn btn-primary" onClick={ this.update_file_content }>Update</button>&nbsp;	
                        <button type="button" class="btn btn-danger">Reset</button>

                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        file_selected: state.projectReducer.file_selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectFile: (file_id) => {
            dispatch(selectFile(file_id));
        },
        getFileContent: (file_id) => {
            dispatch(getFileContent(file_id));
        },
        updateFileContent: (file, callback) => {
            dispatch(updateFileContent(file, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileContent);