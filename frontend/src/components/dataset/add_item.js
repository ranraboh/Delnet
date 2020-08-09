import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addDataItem, uploadItems } from '../../actions/dataset/manipulation';
import { getDatasetLabels } from '../../actions/dataset/get';
import { ValidateEmail, allLetter, typeOfNaN, lengthOfString,check_itsnot_empty,is_url,imageExists } from "../../actions/validation";


class AddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataset: this.props.dataset_data,
            errors: {
                item: ''                
            },
            item: {
                item: [],
                label: null,
                insert_by: this.props.username,
                dataset: this.props.dataset_data.id
            },
            colors: ['red', 'yellow', 'green', 'blue', 'purple', 'pink'],
            colors_amount: 6,
            option: 0,
            options: [ 'Upload from computer', 'Image url' ]
        }

        /* bind internal methods */
        this.on_change = this.on_change.bind(this);
        this.reset_handler = this.reset_handler.bind(this);
        this.add_item_handler = this.add_item_handler.bind(this);
        this.label_selection_handler = this.label_selection_handler.bind(this);
        this.select_upload = this.select_upload.bind(this);
        this.select_url = this.select_url.bind(this);

        /* get dataset labels */
        this.props.getDatasetLabels(this.state.item.dataset)
        this.restartErrors=this.restartErrors.bind(this);

    }
    restartErrors(errors){
        errors['item'] =''
    }

    update_image_list = (event) => {
        let files_list = []
        for (var i = 0; i < event.target.files.length; i++)
            files_list[i] = event.target.files[i]
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                item: files_list
            } 
        });
    }

    select_url() {
        this.setState({
            ...this.state,
            option: 1,
            item: {
                ...this.state.item,
                item: ''
            }
        })
    }

    select_upload() {
        this.setState({
            ...this.state,
            option: 0,
            item: {
                ...this.state.item,
                item: []
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataset_data.labels_quantity == 0 ||
            nextProps.dataset_data.labels_quantity == null)
            return

        console.log(nextProps.dataset_data.labels[0].id)
        this.setState({
            ...this.state,
            dataset: nextProps.dataset_data,
            item: {
                ...this.state.item,
                label: nextProps.dataset_data.labels[0].id
            }
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

    add_item_handler(e) {
        console.log("shiran00")
        e.preventDefault();
        let errors = this.state.errors
        
        let stateItem = this.state.item;
        this.restartErrors(errors);
        if(!imageExists(stateItem['item'])){
            console.log("shiran00")
            errors['item'] ="The URL is invalid"
            console.log(errors['item'])
        }
        if(!check_itsnot_empty(stateItem['item'])){
            console.log("shiran00")
            errors['item'] ="the Image url is empty"
            console.log(errors['item'])
        }
        this.setState({
            ...this.state,
            errors
        })

        if (this.state.option == 0) {
            console.log(this.state.item)
            this.props.uploadItems(this.state.item, () => {
                alert('the items were added successfully')
                this.reset_handler()
            })
        } else {
            this.props.addDataItem(this.state.item, () => {
                alert('the item was added successfully')
                this.reset_handler()
            })
        }
    }

    reset_handler() {
        this.setState({
            ...this.state,
            item: {
                item: '',
                label: this.props.dataset_data.labels[0].id,
                insert_by: this.props.username,
                dataset: this.props.dataset_data.id
            }
        })
    }

    on_change(field, value) {
        let item = this.state.item;
        item[field] = value;
        this.setState({
            ...this.state,
            item
        })
    }

    render() {
        console.log(this.state.option)
        if (this.state.item == null || this.state.item.label == null)
            return (<h2>Fail</h2>)
        return (
        <div className="section-in-main">
            <div className="header-section-v2">
            <h1 className="dataset-header-title dataset-header-blue">
                Add Item
            </h1>
        </div>
        {/* Options: upload or url */}
        <div id="add-item-options">
            <div className="row">
                <div className="col-4">
                    <input type="radio" name="options-group" className="radio-button-v1 radio-button-v1-blue add-item-options"
                        checked={ this.state.option == 0 } />
                    <label className="radio-button-v1-label" for="upload" onClick={ this.select_upload }>{ this.state.options[0] }</label>
                </div>
                <div className="col-4">
                    <input type="radio" name="options-group" className="radio-button-v1 radio-button-v1-purple"
                        checked={ this.state.option == 1 } />
                    <label className="radio-button-v1-label" for="url" onClick={ this.select_url }>{ this.state.options[1] }</label>
                </div>
            </div> 
        </div>
        <p/>
            <div id="dataset-form-internal">
                <div className="row row-form">
                    <div className="col-2">
                        <p className="project-form-field">Item</p>
                    </div>
                    <div className="col-6">
                        <div class="value">
                            {
                            (this.state.option == 0)? (
                                <input multiple type="file" id="img" name="img" accept="image/*"  
                                onChange= { this.update_image_list } />
                            ) : (
                                <div>
                            <input class={(this.state.errors.item == '')? 'input-projects' : 'input-projects form-control is-invalid'} 
                            type="text" name="dataset_item" value={ this.state.item.item } placeholder="Enter image url"
                                onChange={ (e) => this.on_change('item', e.target.value) } />
                                <div class="invalid-feedback">
                                    { this.state.errors.item }
                                </div>
                                </div> )
                            }
                            </div>
                    </div>
                </div>
                <div className="row row-form label-selection-area">
                    <div className="col-2">
                        <p className="project-form-field">Label</p>
                    </div>
                    <div className="col-6">
                        <div class="value">
                            <div class="col-sm-6">
                                {
                                    this.state.dataset.labels.map((label, index) =>
                                        <p>
                                           <input type="radio" name="labels-group" className={ "radio-button-v1 radio-button-v1-" + this.state.colors[index] }
                                                checked={ this.state.item.label === label.id } />
                                            <label className="radio-button-v1-label" for={ label.name } onClick={ () => this.label_selection_handler(label.id) }>{ label.name }</label>
                                        </p>
                                    )
                                }
                                <p>
                                    <input type="radio" name="labels-group" className={ "radio-button-v1 radio-button-v1-" + this.state.colors[this.state.dataset.labels.length] }
                                        checked={ this.state.item.label === -1 } />
                                    <label className="radio-button-v1-label" for={ 'unlabeled' } onClick={ () => this.label_selection_handler(-1) }>unlabeled</label>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="dataset-details-operations">
                <button type="button" className="button-v1 button-v1-blue button-v1-small"
                    onClick={ this.add_item_handler }>Add Item</button>
                <button type="button" className="button-v1 button-v1-purple button-v1-small"
                    onClick={ this.reset_handler }>Reset</button>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        dataset_data: state.datasetsReducer.dataset_selected,
        labels_quantity: state.datasetsReducer.dataset_selected.labels_quantity
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDataItem: (item, callback) => {
            dispatch(addDataItem(item, callback));
        },
        uploadItems: (items_list, callback) => {
            dispatch(uploadItems(items_list, callback))
        },
        getDatasetLabels: (dataset_id) => {
            dispatch(getDatasetLabels(dataset_id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
