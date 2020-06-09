import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getItemsOffers, getDatasetLabels } from '../../actions/dataset/get'
import { addDataItem } from '../../actions/dataset/manipulation';
import { homepage } from '../../appconf';

class OfferSamples extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 0,
            colors: ['red', 'yellow', 'green', 'blue', 'purple', 'pink'],
            colors_amount: 6,
            item: {
                item: [],
                label: null,
                insert_by: this.props.username,
                dataset: this.props.dataset_data.id
            }
        }

        /* bind inner methods */
        this.next_handler = this.next_handler.bind(this);
        this.previous_handler = this.previous_handler.bind(this);
        this.label_selection_handler = this.label_selection_handler.bind(this);
        this.add_item = this.add_item.bind(this);

        /* get unlabled data from the server */
        this.props.getItemsOffers(this.props.dataset_data.id)
        this.props.getDatasetLabels(this.props.dataset_data.id)
    }

    next_handler() {
        let sample = this.state.status + 1
        if (sample >= this.props.offers.length)
            sample = this.state.status
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                item: this.props.offers[sample].item
            },
            status: sample
        })
    }

    add_item() {
        console.log(this.state.item)
        let item = this.props.offers[this.state.status].item
        if (item.startsWith('media'))
            item = homepage + '/' + item
        console.log(item) 
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                item: item
            }
        }, () =>
            this.props.addDataItem(this.state.item, () => {
                alert('the item was added successfully')
                this.next_handler()
            })
        )
    }

    previous_handler() {
        let sample  = this.state.status - 1
        if (sample < 0)
            sample = 0 
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                item: this.props.offers[sample].item
            },
            status: sample
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
                            <img className="unlabeled-image" src={ '../' + this.props.offers[this.state.status].item } />
                            <div class="value label-options">
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
                        <div className="col-1">
                            <div className="col-1">
                                <img className="dataset-arrows-right" src="https://previews.123rf.com/images/get4net/get4net1709/get4net170901398/86308032-next-arrow.jpg" onClick={ this.next_handler } />
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
        offers: state.datasetsReducer.dataset_selected.offers
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferSamples);
