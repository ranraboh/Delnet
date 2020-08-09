import React, { Component, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getProjectFiles, selectFile, deleteFile } from '../../actions/project/files.js';

class ProjectsFilesTable extends Component {
    constructor(props) {
        super(props)
        this.props.getProjectFiles(this.props.project_data.id)
        this.state = {
            colors: [ 'blue', 'red', 'pink', 'green', 'aqua' ]
        }

        /* bind inner methods */
        this.select_file = this.select_file.bind(this);
    }

    delete_file(file_id) {
        this.props.deleteFile(file_id, this.props.username ,() =>{
            this.props.getProjectFiles(this.props.project_data.id)
        })
    }

    select_file(file_id) {
        this.props.selectFile(file_id)
    }

    render() {
        if (!this.props.project_data.files) {
            return <h2>No Files</h2>
        }
        return (
            <div id="files-table">
                <table className="table">
                    <thead>
                        <tr className="table-text table-header-sea-fixed">
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Size</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.project_data.files.map((file, index) => 
                                <tr className="table-text files-table-row">
                                    <td>
                                        <div className={ "icon-container icon-container-" + this.state.colors[index] }>
                                            <p>{ file.name[0].toUpperCase() }</p>
                                        </div>
                                        </td>
                                        <td className="files-table-column">{ file.name }</td>
                                        <td className="files-table-column">{ file.type }</td>
                                        <td className="files-table-column">{ file.size }</td>
                                        <td className="files-table-column">
                                        <button className="btn btn-primary" onClick={ () => this.select_file(file.id) }>
                                            edit
                                        </button> 
                                        &nbsp;
                                        <button className="btn btn-danger" onClick={ () => this.delete_file(file.id) }>
                                            delete
                                        </button>
                                    </td>
                                </tr>)
                        } 
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        project_data: state.projectReducer.project_selected,
        username: state.authentication.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProjectFiles: (project_id) => {
            dispatch(getProjectFiles(project_id));
        },
        selectFile: (file_id) => {
            dispatch(selectFile(file_id))
        },
        deleteFile: (file_id, username, callback) => {
            dispatch(deleteFile(file_id, username, callback))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsFilesTable);
