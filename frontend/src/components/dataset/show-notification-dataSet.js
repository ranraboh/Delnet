import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {getNotificationDataset} from '../../actions/dataset/get'
import showNotifiction from '../project/show-notifiction';



class ShowNotification extends Component {
    constructor(props) {
        super(props)
        this.props.getNotificationDataset(props.dataset)
        /* bind methods */
    }
    

 
   
    render() {
        console.log("nowshow")
        console.log(this.props.show_notification_datasets)
        if(this.props.show_notification_datasets==null)return ''
        return (
            <div className="section-in-main">
            <div  class="container">              
                {        
                    Object.values(this.props.show_notification_datasets).map(function (record) {
                        return (
                        <div className="row">
                            <div className="col-4">
                                <label id="gender-label" className=" col-form-label"><h4>User:{record.user}</h4></label> 
                                <div class="col-sm-6">
                                <label id="gender-label" className=" col-form-label"><h4>Image</h4></label> 
                                        <img src={ record.image } className="personal-image" />
                                </div>
                            </div>
                            <div className="col-8">
                            <label id="gender-label" className=" col-form-label"><h4>Topic:{record.topic}</h4></label> 
                                <div class="col-sm-6">
                                <label id="gender-label" className=" col-form-label"><h4>Content:{record.content}</h4></label> 
                                </div>
                                <div class="col-sm-6">
                                <label id="gender-label" className="col-form-label"><h4>Date:{record.date}</h4></label> 
                                </div>
                                <div class="col-sm-6">
                                <label id="gender-label" className=" col-form-label"><h4>Time:{record.time.substring(0,5)}</h4></label> 
                                </div>
                            </div>
                        </div>)
                    })
                } 
            
             </div>
                </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        show_notification_datasets: state.datasetsReducer.show_notification_datasets,
        dataset: state.datasetsReducer.dataset_selected.id,
        username: state.authentication.user
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getNotificationDataset: (dataset) => {
            disaptch(getNotificationDataset(dataset));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowNotification);