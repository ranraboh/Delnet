import React, { Component } from 'react';
import { connect } from 'react-redux'

import { addNotificationDataset } from '../../actions/dataset/manipulation'
import { datasetPage } from '../../appconf.js';


class AddNotification extends Component {
    constructor(props) {
        super(props);
        
        /* initialize user details */
        this.state = {
            dataset: {
                topic: '',
				user: this.props.username,
                dataset: this.props.dataset_data.id,
                content: ''
            }
        }
        this.send_action = this.send_action.bind(this);
        this.on_change = this.on_change.bind(this);
    }
  




    on_change(field, value) {
        let dataset = this.state.dataset;
        dataset[field] = value;

        this.setState({
            ...this.state,
            dataset
        })
	
    }


    send_action(e) {
        e.preventDefault();
        let dataset = this.state.dataset;
    
      
      
        this.props.addNotificationDataset(this.state.dataset, () => {
            console.log("whyyyyyyyyyyyyy")
            alert(' the user send notifcation successfully');
            window.location = datasetPage;
               
        })
         
        
    }

    render() {
        return (
            <div className="section-in-main">
            <div class="card-body">
                <h1 className="register-title">Add Dataset</h1>
                <form method="POST">
                    <div class="form-row m-b-55">
                    <div className="name">Topic:</div>
                        <div class="value">
                             <div class="col-sm">
                            <input value={ this.state.dataset.topic } className="textbox-v1" onChange={ (e)=> this.on_change('topic', e.target.value)} ></input>
                        </div>
                        </div>
                    </div>
                    <div class="form-row m-b-55">
                    <div className="name">content:</div>
                        <div class="value">
                             <div class="col-sm">
                            <textarea  rows="10" cols="20" value={ this.state.dataset.content } className="textbox-v1" onChange={ (e)=> this.on_change('content', e.target.value) }></textarea>
                        </div>
                        </div>
                    </div>
                    
                    <div>
                        <button class="btn register-button" onClick={ this.send_action }>Send</button>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        dataset_data: state.datasetsReducer.dataset_selected
        
    }
}

const mapDispatchToProps = disaptch => {
    return {
        addNotificationDataset: (dataset, callback) => {
            console.log(dataset)
            console.log(callback)
            disaptch(addNotificationDataset(dataset, callback));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNotification);
