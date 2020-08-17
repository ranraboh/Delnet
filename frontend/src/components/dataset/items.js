import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getDataItems, getDatasetLabels, getNotificationDataset } from '../../actions/dataset/get';
import { deleteDataItem } from '../../actions/dataset/manipulation';
import GetItem from './get_item';
import { getItemSectionActivate } from '../../actions/dataset/sections'

class ItemsSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataset: this.props.dataset_data,
            pages: this.props.pages,
            current_page: 1,
            items_per_page: 6,
            props_gained: false,
            labels_colors: {},
        }
        this.page_change_handler = this.page_change_handler.bind(this);
        this.next_link = this.next_link.bind(this);
        this.previous_link = this.previous_link.bind(this);
        this.delete_item = this.delete_item.bind(this);
        this.get_item_handler = this.get_item_handler.bind(this);
        if (this.state.dataset.items == null || this.state.dataset.items.length == 0) {
            this.props.getDatasetLabels(this.state.dataset.id, () => {
                this.props.getDataItems(this.state.current_page, this.state.dataset.id);
            })
        }
    }

    delete_item(dataitem_id) {
        this.props.deleteDataItem(dataitem_id, this.props.username ,() => {
            this.props.getDataItems(this.state.current_page, this.state.dataset.id);
            this.props.getNotificationDataset(this.state.dataset.id)
        })
    }

    get_item_handler(item) {
        console.log('activate...')
        console.log(item)
        this.props.getItemSectionActivate(item);
    }

    next_link() {
        if (this.state.current_page < this.state.pages) {
            this.state.current_page = this.state.current_page + 1;
            this.props.getDataItems(this.state.current_page, this.state.dataset.id);
        }
    }

    previous_link() {
        if (this.state.current_page > 1) {
            this.state.current_page = this.state.current_page - 1
            this.props.getDataItems(this.state.current_page, this.state.dataset.id)
        }
    }

    page_change_handler(page_number) {
        this.state.current_page = page_number;
        this.props.getDataItems(this.state.current_page, this.state.dataset.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataset_data.labels != null) {
            nextProps.dataset_data.labels.map((label) => {
                this.state.labels_colors[label.name] = label.color;
            })
        }
        let pages_amount = Math.ceil(nextProps.dataset_data.pages / this.state.items_per_page)
        this.setState({
            ...this.state,
            dataset: nextProps.dataset_data,
            pages: pages_amount,
            props_gained: true,
            range_pages: Array(pages_amount).fill(1).map((x, y) => x + y)
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    create_page_button(page_number) {
        if (this.state.current_page == page_number) {
            return (<li className="page-item">
                    <span class="page-link">
                        { this.state.current_page }
                    <span class="sr-only">(current)</span>
                </span>
            </li>)
        } else {
            return (<li class="page-item">
                <a class="page-link" onClick={ () => this.page_change_handler(page_number) }>
                    { page_number }
                </a>
            </li>)
        }
    }

    componentDidMount() {        
        if (!this.state.dataset || this.state.props_gained == false) 
            return;
        if (this.state.current_page == 1)
            document.getElementById('previous-link').className = 'page-link disabled';
        if (this.state.current_page == this.state.pages)
            document.getElementById('next-link').className = 'page-link disabled';
    }

    render() {
        if (!this.state.dataset || this.state.props_gained == false || this.state.pages < 1 || this.state.dataset.labels == null) {
            this.props.getDatasetLabels(this.state.dataset.id, () => {
                this.props.getDataItems(this.state.current_page, this.state.dataset.id);
            })
            return( 
            <div className="section-in-main">
                <h1 className="dataset-header-title dataset-header-blue">
                    Items Section
                </h1>
                <p/>
                <h4 className="dataset-graph-intro text-blue">
                    dataset is empty and doesn't contains any samples. <br/>
                    you can insert new items through add item tab
                </h4>
            </div>
            )
        }
        return (
            
            <section className="section-in-main">
                <div className="header-section-v2">
                    <h1 className="dataset-header-title dataset-header-blue">
                        Items Section
                    </h1>
                </div>
                <nav>
                    {
                        (this.props.get_item != null)?<GetItem item={ this.props.get_item.item } label={ this.props.get_item.label.name } />:''
                    }
                    <ul class="pagination">
                        <li class="page-item button-outline-danger">
                            <a id="previous-link" className="page-link" onClick={ this.previous_link }>Previous</a>
                        </li>
                            {        
                                    this.state.range_pages.slice(Math.max(0, this.state.current_page - 4), this.state.current_page + 4).map((page) => 
                                        this.create_page_button(page)
                                    )
                            }
                        <li class="page-item">
                            <a id="next-link button-outline-danger" className="page-link" onClick={ this.next_link }>Next</a>
                        </li>
                    </ul> 
                </nav>
                <div id="labels-colors">
                    <ul id="labels-colors-list">
                        {
                            this.state.dataset.labels.map((label) => 
                                <li className={"table-label table-label-" + label.color }>{ label.name }</li>
                            )
                        }
                    </ul>
                </div>
                <div class="container items-set">
                    <div className="row">
                    {
                        this.state.dataset.items[this.state.current_page].map((record, index) => 
                            <div class="col-md-4 col-xs-12">
                                <div class="single-item">
                                    <div className="photo-frame">
                                        <img class="item-photo" src={ '../' + record.item } href={ '../' + record.item } />
                                    </div>
                                    <h2 className={ "text text-" + this.state.labels_colors[record.label.name] }><a>Label: { record.label.name }</a></h2>
                                    <p/>
                                    <h6><a className="text">Insert by: { record.insert_by.username }</a></h6>
                                    <h6><a className="text">Date: { record.insert_date }</a></h6>
                                    <div id="items-buttons">
                                    <button type="button" class="btn btn-danger btn-sm" onClick={ () => this.delete_item(record.id) }><i class="fa fa-close"></i></button>&nbsp;	
                                    <button type="button" class="btn btn-primary btn-sm" onClick={ () => this.get_item_handler(record) }><i class="fa fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataset_data: state.datasetsReducer.dataset_selected,
        username: state.authentication.user,
        pages: state.datasetsReducer.dataset_selected.pages,
        get_item: state.datasetsToggleReducer.dataset_display.get_item
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getDataItems: (page_id, dataset_id) => {
            dispatch(getDataItems(page_id, dataset_id));
        },
        deleteDataItem: (detaitem_id, username, callback) => {
            dispatch(deleteDataItem(detaitem_id, username, callback));
        },
        getDatasetLabels: (dataset_id, callback) => {
            dispatch(getDatasetLabels(dataset_id, callback))
        },
        getNotificationDataset: (dataset) => {
            dispatch(getNotificationDataset(dataset));
        },
        getItemSectionActivate: (item) => {
            dispatch(getItemSectionActivate(item))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsSection);