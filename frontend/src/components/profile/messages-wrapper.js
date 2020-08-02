import React, { Component } from 'react'
import SenderMessage from './SenderMessage.js';
import RecieverMessage from './RecieverMessage.js';
import ContentMessage from './Write-message.js'


class MessagesWrapper extends Component {
    render() {
        return (
            <div id="personal-details">
               
                    <SenderMessage/>
                    <RecieverMessage/>
                    <ContentMessage/>
                
            </div>
        )
    }
}

export default MessagesWrapper;