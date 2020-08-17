
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { stageAdvance } from '../../actions/amb/state'
import { getKnownModels, createAutomatedModel } from '../../actions/amb/general'
import ModelItem from './model-item.js';
import { homepage } from '../../appconf'

class Prebuild extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: -1
        }

        /* bind inner methods */
        this.select_item = this.select_item.bind(this);
        this.save_handler = this.save_handler.bind(this);
        this.props.getKnownModels()
    }

    save_handler() {
        this.props.createAutomatedModel({
            details: this.props.details,
            known_model: this.state.selected,
            user: this.props.username,
            type: 'Known-Model'
        }, () => {
            alert('the model created successfully')
            window.location = homepage + 'projects'
        })
    }

    select_item(id) {
        this.setState({
            selected: id
        })
    }

    render() {
        if (this.props.known_models == null)
            return ''
        return (
            <section id="prebuild-section" class="section-in-main">
                <div className="container">
                    <div className="row">
                            <div className="row">
                                {
                                    this.props.known_models.map((record) =>                                 
                                        <ModelItem name={ record.name } color="blue" image={ homepage + record.image} on_select={ () => this.select_item(record.id) }
                                            description={ record.description } is_selected={ this.state.selected == record.id } />
                                    )
                                }
                            </div>
                            <div class="col-md-12">
                                <p className="button-v3"><a class="button" onClick={ this.save_handler }>Select</a></p>
                            </div>
                        </div>
                    </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        known_models: state.ambReducer.known_models,
        details: state.ambReducer.details
    }
}

const mapDispatchToProps = dispatch => {
    return {
        stageAdvance: (stage) => {
            dispatch(stageAdvance(stage))
        },
        getKnownModels: () => {
            dispatch(getKnownModels())
        },
        createAutomatedModel: (request, callback) => {
            dispatch(createAutomatedModel(request, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Prebuild);
