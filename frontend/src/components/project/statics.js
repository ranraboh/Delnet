import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectStatics } from '../../actions/projects';
import StaticsItem from './static-item';

class ProjectStatics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user
        }

        /* receive project statics details from server */
        this.props.getProjectStatics(this.props.project_data.id)
    }

    render() {
        if (this.props.statics == null)
            return ''
        return (
            <div id="project-statics" className="section-in-main">
                <div className="header-section-v1 header-v1-yellow">
                    <h1 id="projects-title">
                        Project Statics
                    </h1>
                    <h2 id="projects-intro">
                        this sections display project statics
                    </h2>
                </div>
                <div className="container">
                    <div id="files-statics">
                        <StaticsItem color="cyan" category="Number of uploaded files" value={ this.props.statics.files.files_quantity }  />
                        <StaticsItem color="cyan" category="Total size of uploaded files" value={ this.props.statics.files.total_size }  />
                        <StaticsItem color="cyan" category="Most File Upload Times" value={ '' }  />
                        <StaticsItem color="cyan" type="most-favorite" id="insert_by" category="Member" value={ this.props.statics.files.most_uploader }  />
                        <StaticsItem color="cyan" type="most-favorite" id="insertion_date" category="Date" value={ this.props.statics.files.most_file_uploads }  />
                    </div>
                    <p/>
                    <div id="model-statics">
                        <StaticsItem color="purple" category="Parameters quantity" value={ this.props.statics.model.parameters }  />
                        <StaticsItem color="purple" category="Layers quantity" value={ this.props.statics.model.layers }  />
                        <StaticsItem color="purple" category="Modules Usage" value={ '' }  />
                        <StaticsItem color="purple" category="Dropout" value={  this.props.statics.model.dropout + " modules" }  />
                        <StaticsItem color="purple" category="BatchNorm" value={  this.props.statics.model.batchnorm + " modules" }  />
                        <StaticsItem color="purple" category="Convolution" value={  this.props.statics.model.convolution + " modules" }  />
                        <StaticsItem color="purple" category="Activaions" value={  this.props.statics.model.activations.quantity + " modules" }  />
                        <StaticsItem color="purple" category="Max Used Activation" value={  this.props.statics.model.activations.max_used + " ( rate " + this.props.statics.model.activations.value + " ) " }  />

                    </div>
                    <p/>
                    <div id="team-statics">
                        <StaticsItem color="green" category="Team members quantity" value={ this.props.statics.team.team_size }  />
                        <StaticsItem color="green" category="Project managers quantity" value={ this.props.statics.team.managers }  />
                    </div>
                    <p/>
                    <div id="runs-statics">
                        <StaticsItem color="red" category="Total number of runs" value={ this.props.statics.runs.qunatity }  />
                        <StaticsItem color="red" category="Total number of epochs" value={ this.props.statics.runs.total_epoches }  />
                        <StaticsItem color="red" category="Runs in progress" value={ this.props.statics.runs.in_run }  />
                        <StaticsItem color="red" category="Average accuracy rate" value={ this.props.statics.runs.accuracy_average * 100 }  />
                        <StaticsItem color="red" category="Maximum accuracy rate" value={ this.props.statics.runs.accuracy_max * 100 }  />
                        <StaticsItem color="red" category="Minimum accuracy rate" value={ this.props.statics.runs.accuracy_min * 100 }  />
                        <StaticsItem color="red" category="Average loss value" value={ this.props.statics.runs.loss_average }  />
                        <StaticsItem color="red" category="Maximum loss value" value={ this.props.statics.runs.loss_max }  />
                        <StaticsItem color="red" category="Minimum loss value" value={ this.props.statics.runs.loss_min }  />
                        <StaticsItem color="red" category="Underfitting Runs" value={ this.props.statics.runs.underfitting.quantity }  />
                        <StaticsItem color="red" category="Underfitting Rate" value={ this.props.statics.runs.underfitting.rate }  />
                        <StaticsItem color="red" category="Overfitting Runs" value={ this.props.statics.runs.overfitting.quantity }  />
                        <StaticsItem color="red" category="Overfitting Rate" value={ this.props.statics.runs.overfitting.rate }  />
                        <StaticsItem color="red" category="Favorite Hyper Parameters" value={ '' }  />
                        <StaticsItem color="red" type="most-favorite" id="epochs" category="Epochs" value={ this.props.statics.runs.favorite_params.epochs }  />
                        <StaticsItem color="red" type="most-favorite" id="batch_size" category="Batch Size" value={ this.props.statics.runs.favorite_params.batch_size }  />
                        <StaticsItem color="red" type="most-favorite" id="learning_rate"  category="Learning Rate" value={ this.props.statics.runs.favorite_params.learning_rate }  />
                        <StaticsItem color="red" type="most-favorite" id="weight_decay" category="Weight Decay" value={ this.props.statics.runs.favorite_params.weight_decay }  />
                        <StaticsItem color="red" type="most-favorite" id="optimizer" category="Optimizer" value={ this.props.statics.runs.favorite_params.optimizer }  />
                        <StaticsItem color="red" type="most-favorite" id="loss_type" category="Loss Type" value={ this.props.statics.runs.favorite_params.loss }  />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        project_data: state.projectReducer.project_selected,
        statics: state.projectReducer.project_selected.statics
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProjectStatics: (project_id) => {
            dispatch(getProjectStatics(project_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectStatics);

