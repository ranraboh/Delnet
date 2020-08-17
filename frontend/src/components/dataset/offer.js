import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getItemsOffers, getDatasetLabels, getNotificationDataset, getDataItems } from '../../actions/dataset/get'
import { addDataItem } from '../../actions/dataset/manipulation';
import { homepage } from '../../appconf';

class OfferSamples extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            selected: 0,
            colors: ['red', 'yellow', 'green', 'blue', 'purple', 'pink'],
            colors_amount: 6,
            item: {
                item: [],
                label: null,
                insert_by: this.props.username,
                dataset: this.props.dataset_data.id,
                username: this.props.username,
                tag: false,
                offer: true
            }
        }

        /* bind inner methods */
        this.next_handler = this.next_handler.bind(this);
        this.previous_handler = this.previous_handler.bind(this);
        this.label_selection_handler = this.label_selection_handler.bind(this);
        this.add_item = this.add_item.bind(this);
        this.select_image = this.select_image.bind(this);
        this.update_data = this.update_data.bind(this);

        /* get unlabled data from the server */
        this.props.getItemsOffers(this.props.dataset_data.id)
        this.props.getDatasetLabels(this.props.dataset_data.id)
    }

    update_data() {
        this.props.getNotificationDataset(this.props.dataset_data.id)
        this.props.getDataItems(1, this.props.dataset_data.id)
    }

    select_image(id) {
        this.setState({
            ...this.state,
            selected: id
        })
    }

    next_handler() {
        if ((this.state.page + 1) * 6 >= this.props.offers.length)
            return
        this.setState({
            ...this.state,
            page: this.state.page + 1
        })
    }

    add_item() {
        if (this.props.premissions < 3) {
            alert("you are not authorized to add new items")
            return;
        }
        let item = this.props.offers[this.state.selected].item
        if (item.startsWith('media'))
            item = homepage + '/' + item
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                item: item
            }
        }, () => {
            item = this.state.item
            item.username = this.props.username
            this.props.addDataItem(this.state.item, () => {
                this.update_data()
                alert('the item was added successfully')
            })
        })
    }

    previous_handler() {
        if (this.state.page <= 0)
            return
        this.setState({
            ...this.state,
            page: this.state.page - 1
        })
    }

    label_selection_handler(select_id) {
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                label: select_id
            }
        })
    }
	
    render() {
        if (this.props.offers == null  || this.props.dataset_data.labels == null) 
            return ''
        if (this.props.offers.length == 0) {
                return (<div className="section-in-main">
                <div className="header-section-v2">
                    <h1 className="dataset-header-title dataset-header-blue">
                        Offer Samples
                    </h1>
                </div>
                <h4 className="dataset-graph-intro">
                    A crucial part of deep learning projects is collecting the data to train the model on.
                    to help and ease you this process, the application offers you examples taken from other user-collected.
                </h4>
                <p/>
                <h4 className="dataset-graph-intro text-purple">
                    the system doesn't found any offers for samples to enrich your dataset.
                </h4>
                </div>)
            }
        return (
            <div className="section-in-main">
                <div className="header-section-v2">
                    <h1 className="dataset-header-title dataset-header-blue">
                        Offer Samples
                    </h1>
                </div>
                <h4 className="dataset-graph-intro">
                    A crucial part of deep learning projects is collecting the data to train the model on.
                    to help and ease you this process, the application offers you examples taken from other user-collected.
                </h4>
                <p/>
                <div className="container">
                    <div className="row">
                        <div className="col-1">
                            <img className="dataset-arrows-left" src="https://previews.123rf.com/images/get4net/get4net1709/get4net170901398/86308032-next-arrow.jpg" onClick={ this.previous_handler } />
                        </div>
                        <div className="col-8">
                            <div className="container">
                                <div className="row">
                            { 
                                this.props.offers.slice(this.state.page * 6, (this.state.page + 1) * 6).map((record, index) => 
                                    <div className="col-4">
                                        <img className="offer-image" src={ '../' + record.item } onClick={ () => this.select_image(this.state.page * 6 + index) } />          
                                    </div>                          
                                )
                            }
                                </div>
                            </div>
                        </div>
                        <div className="col-1">
                            <div className="col-1">
                                <img className="dataset-arrows-right" src="https://previews.123rf.com/images/get4net/get4net1709/get4net170901398/86308032-next-arrow.jpg" onClick={ this.next_handler } />
                            </div>
                        </div>
                    </div>
                    <div className="row"></div>
                    <div className="row">
                        <div className="col-6">
                            <img className="zoom-offer-image" src={ '../' + this.props.offers[this.state.selected].item }></img>
                        </div>
                        <div className="col-6">
                        <div class="value label-options">
                            <p className="radio-button-v1-label">Dataset: { this.props.offers[this.state.selected].dataset.name } - { this.props.offers[this.state.selected].dataset.description }</p>
                            <p className="radio-button-v1-label">The image is labeled: { this.props.offers[this.state.selected].label.name }</p>
                            <div class="col-sm-6">
                                {
                                    this.props.dataset_data.labels.map((label, index) =>
                                        <p>
                                           <input type="radio" name="labels-group" className={ "radio-button-v1 radio-button-v1-" + this.state.colors[index] }
                                                checked={ this.state.item.label === label.id } />
                                            <label className="radio-button-v1-label" for={ label.name } onClick={ () => this.label_selection_handler(label.id) }>{ label.name }</label>
                                        </p>
                                    )
                                }
                                <button class="btn purple-append-button" onClick={ this.add_item  }>Append</button>&nbsp;&nbsp;
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataset_data: state.datasetsReducer.dataset_selected,
        username: state.authentication.user,
        offers: state.datasetsReducer.dataset_selected.offers,
        premissions: state.datasetsReducer.dataset_selected.premissions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getItemsOffers: (dataset_id) => {
            dispatch(getItemsOffers(dataset_id))
        },
        getDatasetLabels: (dataset_id) => {
            dispatch(getDatasetLabels(dataset_id))
        },
        addDataItem: (item, callback) => {
            dispatch(addDataItem(item, callback));
        },
        getNotificationDataset: (dataset) => {
            dispatch(getNotificationDataset(dataset));
        },
        getDataItems: (page_id, dataset_id) => {
            dispatch(getDataItems(page_id, dataset_id));
        },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferSamples);
