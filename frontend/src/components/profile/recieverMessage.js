import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {getReceiverMessages} from '../../actions/users'

class recieverMessage extends Component {
    constructor(props) {
        super(props)
        this.props.getReceiverMessages(props.username)
    }
   


    render() {
        if(this.props.receiverMessages==null)return '';
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
                    Object.values(this.props.receiverMessages).map(function (record) {
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
        receiverMessages: state.userReducer.receiverMessages,
        username: state.authentication.user,
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getReceiverMessages: (receiver) => {
            disaptch(getReceiverMessages(receiver));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(recieverMessage);