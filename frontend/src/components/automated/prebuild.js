
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { stageAdvance } from '../../actions/amb/state'
import { getKnownModels, createAutomatedModel, selectKnownModels } from '../../actions/amb/general'
import ModelItem from './model-item.js';
import { homepage } from '../../appconf'

class Prebuild extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: (props.update == true && props.project.known_model != null && props.project.known_model.exist)? props.project.known_model.known_model_id: -1
        }

        /* bind inner methods */
        this.select_item = this.select_item.bind(this);
        this.save_handler = this.save_handler.bind(this);
        this.props.getKnownModels()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.update == true && nextProps.project.known_model != null) {
            this.setState({
                ...this.state,
                selected: (nextProps.project.known_model.exist)? nextProps.project.known_model.known_model_id: this.state.selected
            })
        }
    }

    save_handler() {
        if (this.props.update == true) {
            this.props.selectKnownModels({
                project: parseInt(this.props.project.id),
                known_model: this.state.selected
            }, ()=> {
                this.props.loadLayers(this.props.project.id)
                this.props.getPopularModel(this.props.project.id)
                alert('the project has been mapped with your selected popular model')
            })
        } else {
            this.props.createAutomatedModel({
                details: this.props.details,
                known_model: this.state.selected,
                user: this.props.username,
                type: 'Known-Model'
            }, () => {
                alert('the model created successfully')
                window.location = homepage + '/projects'
            })
        }
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
                {
                    (this.props.update)?
                    <div className="header-section-v1 header-v1-pink">
                        <h1 id="projects-title">
                            Popular Models
                        </h1>
                        <h2 id="projects-intro">
                            you can select any popular model you would like
                        </h2>
                    </div>:''
                }
                <div className="container">
                    <div className="row">
                            <div className="row">
                                {
                                    this.props.known_models.map((record) =>                                 
                                        <ModelItem update={ this.props.update } name={ record.name } color="blue" image={ homepage + record.image} on_select={ () => this.select_item(record.id) }
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
        selectKnownModels: (record, callback) => {
            dispatch(selectKnownModels(record, callback))
        },
        createAutomatedModel: (request, callback) => {
            dispatch(createAutomatedModel(request, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Prebuild);
