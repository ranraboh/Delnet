import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { getUserDetails, logoutAction } from '../../actions/users.js';
import { homepage } from '../../appconf.js'

class DataSetGraphs extends Component {
    constructor(props) {
        super(props);
        this.logout_handler = this.logout_handler.bind(this);
    }

    logout_handler() {
        this.props.logoutAction();
        window.location = homepage + "/login";
    }

    profile_details() {
        window.location = "../profile";
    }

    componentWillReceiveProps(nextProps) {
        var element = document.getElementById("profile-image");
        element.style.backgroundImage = 'url(' + nextProps.image + ")";
    }

    render() {
        return (
        <div id="dataset-information-section" className="section-in-main">
            <div id="statics-header">
                <p className="dataset-links-title">Statics</p>
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
                        <td className="dataset-links">Statics</td>
                    </tr>
                    <tr className="dataset-menu-row">
                        <td>
                            <button type="button" class="btn btn-outline-info button-dataset-menu">
                                <i className="fa fa-edit"></i>
                            </button>
                        </td>
                        <td className="dataset-links">Items Graph</td>
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
        user: state.authentication.user
    }
}


const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSetGraphs);