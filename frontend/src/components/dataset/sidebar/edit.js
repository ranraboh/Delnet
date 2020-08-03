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
                    <DatasetMenuItem name="Add Label" description="insert a new label to your dataset" state={ this.props.dataset_display.add_label } 
                        button_type="primary" icon="fa-tag" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                    <DatasetMenuItem name="Add Item" description="append a new item to your dataset" state={ this.props.dataset_display.add_item } 
                        button_type="info" icon="fa-plus" activate={ this.props.activateSection } hide={ this.props.hideSection } />    
                    <DatasetMenuItem name="Tag Samples" description="tag your unlabeled samples" state={ this.props.dataset_display.tag_samples } 
                        button_type="dark" icon="fa-plus" activate={ this.props.activateSection } hide={ this.props.hideSection } /> 
                    <DatasetMenuItem name="Offer Items" description="offer additional samples to enrich datasets" state={ this.props.dataset_display.offer_items } 
                        button_type="danger" icon="fa-plus" activate={ this.props.activateSection } hide={ this.props.hideSection } /> 
                    <tr className="dataset-menu-row">
                        <td>
                            <button type="button" class="btn btn-outline-successs button-dataset-menu">
                                <i className="fa fa-edit"></i>
                            </button>
                        </td>
                        <td className="dataset-links">Add Notification</td>
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