import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getUnlabeledSamples, getDatasetLabels } from '../../actions/dataset/get'
import { addDataItem, deleteUnlabeled } from '../../actions/dataset/manipulation';
import { homepage } from '../../appconf';


class TagSamples extends Component {
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
        this.image_url = this.image_url.bind(this);

        /* get unlabled data from the server */
        this.props.getUnlabeledSamples(this.props.dataset_data.id)
        this.props.getDatasetLabels(this.props.dataset_data.id)
    }

    next_handler() {
        let sample = this.state.status + 1
        if (sample >= this.props.unlabeled.length)
            sample = this.state.status
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                item: this.props.unlabeled[sample].item
            },
            status: sample
        })
    }

    add_item() {
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                item: this.image_url()
            }
        }, () =>
            this.props.addDataItem(this.state.item, () => {
                this.props.deleteUnlabeled(this.props.unlabeled[this.state.status].id, () => {
                    this.props.getUnlabeledSamples(this.props.dataset_data.id)
                    alert('the item was added successfully')
                })
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
                item: this.props.unlabeled[sample].item
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

    image_url() {
        let item = this.props.unlabeled[this.state.status].item
        if (item.startsWith('media'))
            item = homepage + '/' + item
        return item
    }
	
    render() {
        console.log(this.props.unlabeled)
        if (this.props.unlabeled == null  || this.props.dataset_data.labels == null) 
            return ''
        if (this.state.status >= this.props.unlabeled.length) {
            this.setState({
                ...this.state,
                status: this.props.unlabeled.length - 1
            })
            return ''
        }
        if (this.props.unlabeled.length == 0) {
            return (<div className="section-in-main">
            <div className="header-section-v2">
                <h1 className="dataset-header-title dataset-header-blue">
                    Tag Unlabled Samples
                </h1>
            </div>
            <h4 className="dataset-graph-intro">
                you can tag the unlabeled samples you have uploaded into this dataset in
                interactive and friendly interface.  
            </h4>
            <p/>
            <h4 className="dataset-graph-intro text-purple">
                your dataset has no unlabeled samples to tag   
            </h4>
            </div>)
        }
        return (
            <div className="section-in-main">
                <div className="header-section-v2">
                    <h1 className="dataset-header-title dataset-header-blue">
                        Tag Unlabled Samples
                    </h1>
                </div>
                <h4 className="dataset-graph-intro">
                    you can tag the unlabeled samples you have uploaded into this dataset in
                    interactive and friendly interface.  
                </h4>
                <p/>
                <div className="container">
                    <div className="row">
                        <div className="col-1">
                            <img className="dataset-arrows-left" src="https://cdn4.iconfinder.com/data/icons/flat-black/512/next.png" onClick={ this.previous_handler } />
                        </div>
                        <div className="col-8">
                            <img className="unlabeled-image" src={ this.image_url() } />
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
                                <button class="btn append-button" onClick={ this.add_item  }>Append</button>&nbsp;&nbsp;
                            </div>
                        </div>
                        </div>
                        <div className="col-1">
                            <div className="col-1">
                                <img className="dataset-arrows-right" src="https://cdn4.iconfinder.com/data/icons/flat-black/512/next.png" onClick={ this.next_handler } />
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
        unlabeled: state.datasetsReducer.dataset_selected.unlabeled
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUnlabeledSamples: (dataset_id) => {
            dispatch(getUnlabeledSamples(dataset_id))
        },
        getDatasetLabels: (dataset_id) => {
            dispatch(getDatasetLabels(dataset_id))
        },
        addDataItem: (item, callback) => {
            dispatch(addDataItem(item, callback));
        },
        deleteUnlabeled: (item, callback) => {
            dispatch(deleteUnlabeled(item, callback))
        }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TagSamples);
