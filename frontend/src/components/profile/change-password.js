import React, { Component } from 'react'

class ChangePassword extends Component {
    render() {
        return (
            <div id="personal-details">
                <div id="inner-change-password">
                    <div className="col-sm intro-change-password"> 
                        <h6>In the section you can change your password</h6>
                        <h6>You require to re-enter your old one</h6>
                        <h6>We strongly suggest to put in a strong password for security purpose</h6>
                    </div>
                    <div className="col-sm">
                        <input type="password" className="textbox-v1" ></input>
                        <label className="label-v1">Old Password</label>
                    </div>
                    <div className="col-sm">
                        <input type="password" className="textbox-v1" ></input>
                        <label className="label-v1">New Password</label>
                    </div>
                    <div className="col-sm">
                        <input type="password" className="textbox-v1" ></input>
                        <label className="label-v1">Password Authentication</label>
                    </div>
                    {/* possible profile operations */}
                    <div id="profile-operations">
                        <button type="button" className="button-v1 button-v1-blue button-v1-small"
                            onClick={ this.update_profile }>Update</button>
                        <button type="button" className="button-v1 button-v1-purple button-v1-small">Reset</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePassword;