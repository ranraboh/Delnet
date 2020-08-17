import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItemSectionHide } from '../../actions/dataset/sections'
import { homepage } from '../../appconf.js';
import { getSelectedLabels, getUserDatasets } from '../../actions/dataset/get'
import { addDataItem } from '../../actions/dataset/manipulation'

class GetItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {
                item: props.item,
                dataset: 0,
                username: props.username,
                insert_by: props.username,
                label: null,
                tag: false,
                offer: false,
            },
            dataset: null,
            colors: ['red', 'yellow', 'green', 'blue', 'purple', 'pink'],
            colors_amount: 6,
        }

        /* load data */
        this.props.getUserDatasets(this.props.username)

        /* bind inner methods */
        this.on_dataset_select = this.on_dataset_select.bind(this);
        this.label_selection_handler = this.label_selection_handler.bind(this);
        this.add_item = this.add_item.bind(this);
        this.get_selected_labels = this.get_selected_labels.bind(this);
        this.close_handler = this.close_handler.bind(this);
    }

    UNSAFE_componentWillMount() {
        if (this.props.user_datasets != null && this.props.user_datasets.length > 0) {
            this.setState({
                item: {
                    item: this.props.item,
                    dataset: this.props.user_datasets[0].id,
                    username: this.props.username,
                    insert_by: this.props.username,
                    label: null,
                    tag: false,
                    offer: false,
                },
                dataset: this.props.user_datasets[0],
                colors: ['red', 'yellow', 'green', 'blue', 'purple', 'pink'],
                colors_amount: 6,
            })        
            /* load data */
            this.props.getUserDatasets(this.props.username)
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user_datasets == null || nextProps.user_datasets.length == 0 || 
            (this.props.user_datasets != null && this.props.user_datasets.length > 0)) {
            return;
        }
        this.setState({
            ...this.state,
            dataset: nextProps.user_datasets[0],
            item: {
                ...this.state.item,
                dataset: nextProps.user_datasets[0].id
            }
        }, () => {
            this.get_selected_labels()
        })

    }

    label_selection_handler(id) {
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                label: id
            }
        })
    }

    get_selected_labels() {
        this.props.getSelectedLabels(this.state.item.dataset, () => {
                if (this.props.labels.length > 0)
                    this.setState({
                        ...this.state,
                        item: {
                            ...this.state.item,
                            label: this.props.labels[0].id
                        }
                    })
            })
    }

    on_dataset_select(e) {
        let value = e.target.value
        this.setState({
            ...this.state,
            dataset: this.props.user_datasets[value],
            item: {
                ...this.state.item,
                dataset: this.props.user_datasets[value].id
            }
        }, () => {
            this.get_selected_labels()
        })
    }

    close_handler() {
        this.props.getItemSectionHide()
    }

    add_item() {
        this.props.addDataItem(this.state.item, () => {
            this.props.getItemSectionHide()
            alert('the item was added successfully')
        })
    }

    render() {
        console.log("try to render")
        console.log(this.state.dataset)
        console.log(this.props.labels)
        if (this.state.dataset == null || this.props.labels == null)
            return ''
        let dataset_options = ''
        if (this.props.user_datasets != null)
            dataset_options = (
                this.props.user_datasets.map((dataset, index) =>
                    <option value={ index } selected={ this.state.item.dataset == dataset.id } >{ dataset.name }</option>
                )
            )
        return (
            <div id="selected_layer_modal" class="modal">
                <button id="btnclose" type="button" class="btn btn-outline-primary btn-close" onClick={ this.close_handler }>
                    <i className="fa fa-check"></i>
                </button>
                <div id="image-get-item" className="modal-section">
                    <img className="image-get-item" src={ '../' + this.props.item }></img>
                </div>
                <div id="form-get-item" className="modal-section">
                <div class="value label-options inner-form-get-item">
                    <div class="value">
                        <select name="project_dataset" className="textbox-v1" onChange={ this.on_dataset_select } >
                            { dataset_options }
                        </select>
                    </div>
                    <p/><p/>
                    <p className="radio-button-v1-label">From dataset: { this.state.dataset.name } - { this.state.dataset.description }</p>
                    <p className="radio-button-v1-label">The image is labeled: { this.props.label } </p>
                        <div class="col-sm-6">
                            {
                                this.props.labels.map((label, index) =>
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
        )
    }
}


const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        user_datasets: state.datasetsReducer.user_datasets,
        dataset_data: state.datasetsReducer.dataset_selected,
        labels: state.datasetsReducer.selected_labels,
        get_item: state.datasetsToggleReducer.dataset_display.get_item
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getItemSectionHide: () => {
            dispatch(getItemSectionHide())
        },
        getSelectedLabels: (dataset_id, callback) => {
            dispatch(getSelectedLabels(dataset_id, callback))
        },
        getUserDatasets: (username) => {
            dispatch(getUserDatasets(username));
        },
        getDataItems: (page_id, dataset_id) => {
            dispatch(getDataItems(page_id, dataset_id));
        },
        addDataItem: (item, callback) => {
            dispatch(addDataItem(item, callback));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetItem);