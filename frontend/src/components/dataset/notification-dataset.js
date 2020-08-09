import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addNotificationDataset } from '../../actions/dataset/manipulation'
import { datasetPage } from '../../appconf.js';
import { getUserDetails } from '../../actions/users.js'


class AddNotification extends Component {
    constructor(props) {
        super(props);
        
        /* initialize user details */
        this.state = {
            dataset: {
                topic: '',
				user: this.props.username,
                dataset: this.props.dataset_data.id,
                content: '',
                image: this.props.image
            }
        }
        this.send_action = this.send_action.bind(this);
        this.on_change = this.on_change.bind(this);
        if (this.state.dataset.image == undefined)
            this.props.getUserDetails(this.props.username)
    }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        let dataset = this.state.dataset;
        dataset['image'] = nextProps.image
        this.setState({
            ...this.state,
            dataset
        })
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
        this.props.addNotificationDataset(this.state.dataset, () => {
            this.setState({
                ...this.state,
                dataset: {
                    topic: '',
                    user: this.props.username,
                    dataset: this.props.dataset_data.id,
                    content: ''
                }
            }, () => {
                alert('the notification has been sent');
            })
        })
    }

    render() {
        return (
            <div className="section-in-main">
                <div className="header-section-v2">
                    <h1 className="dataset-header-title dataset-header-blue">
                        Add Notification
                    </h1>
                </div>
            <div class="card-body">
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
                    <div className="name">Content:</div>
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
        dataset_data: state.datasetsReducer.dataset_selected,
        image: state.userReducer.image,
    }
}

const mapDispatchToProps = disaptch => {
    return {
        addNotificationDataset: (dataset, callback) => {
            disaptch(addNotificationDataset(dataset, callback));
        },
                getUserDetails: (username) => {
            disaptch(getUserDetails(username))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNotification);
