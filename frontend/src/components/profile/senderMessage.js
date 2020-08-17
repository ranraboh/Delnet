import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getSenderMessages } from '../../actions/users'

class senderMessage extends Component {
    constructor(props) {
        super(props)
        console.log(props.username)
        this.props.getSenderMessages(props.username)
    }
   
    render() {
       
        console.log(this.props.senderMessages);
        if(this.props.senderMessages==null)return '';
        return (
            <div id="personal-details">
            <table class="table">
                <thead>
                    <tr className="table-header-sea d-flex">
                        <th className="col-2">Sender</th>
                        <th className="col-2">Receiver</th>
                        <th className="col-4">Content</th>
                        <th className="col-2">Date</th>
                        <th className="col-2">Time</th>
                    </tr>
                </thead>
                <tbody>
                {        
                    Object.values(this.props.senderMessages).map(function (record) {
                        return (
                        <tr className="table-text table-hover d-flex">
                            <td className="main-field col-2">{ record.sender }</td>
                            <td className="col-2">{ record.receiver }</td>
                            <td className="col-4">{ record.content.substring(0,20)}</td>
                            <td className="col-2">{ record.date }</td>
                            <td className="col-2">{ record.time }</td>
                        </tr>)
                    })
                } 
                </tbody>
                </table>
                </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        senderMessages: state.userReducer.senderMessages,
        username: state.authentication.user,
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getSenderMessages: (sender) => {
            disaptch(getSenderMessages(sender));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(senderMessage);