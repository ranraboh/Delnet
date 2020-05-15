import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { hideSection, activateSection } from '../../../actions/dataset/sections';
import DatasetMenuItem from '../menu-item';

class DataSetEdits extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('render edit')
        console.log(this.props.dataset_display)
        return (
        <div id="dataset-information-section" className="section-in-main">
            <div id="edit-header">
                <p className="dataset-links-title">Edit</p>
            </div>
            
            <div id="profile">
            <table class="table">
                <tbody>
                    <tr className="dataset-menu-row">
                        <td>
                            <button type="button" class="btn btn-outline-primary button-dataset-menu">
                                <i className="fa fa-edit"></i>
                            </button>
                        </td>
                        <td className="dataset-links">Add Notification</td>
                    </tr>
                    <DatasetMenuItem name="Add Label" description="insert a new label to your dataset" state={ this.props.dataset_display.add_label } 
                        button_type="info" icon="fa-tag" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                    <DatasetMenuItem name="Add Item" description="append a new item to your dataset" state={ this.props.dataset_display.add_item } 
                        button_type="success" icon="fa-plus" activate={ this.props.activateSection } hide={ this.props.hideSection } />    
                    <tr className="dataset-menu-row">
                        <td>
                            <button type="button" class="btn btn-outline-danger button-dataset-menu">
                                <i className="fa fa-edit"></i>
                            </button>
                        </td>
                        <td className="dataset-links">Itemdata Lookup</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        user: state.authentication.user,
        dataset_display: state.datasetsToggleReducer.dataset_display
    }
}


const mapDispatchToProps = dispatch => {
    return {
        activateSection: (section) => {
            dispatch(activateSection(section));
        },
        hideSection: (section) => {
            dispatch(hideSection(section));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DataSetEdits);