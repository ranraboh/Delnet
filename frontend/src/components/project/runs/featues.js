import React, { Component } from 'react';
import { connect } from 'react-redux';
 
class RunFeatures extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.run.id === null || this.props.run.id === undefined)
            return ''
        return (
            <div id="run-features">
                <div className="row">
                    <div className="col-4">
                        <h6 className="text-aqua text-small text-bold">Details</h6>
                        <h6>
                            Run Code: { this.props.run.id } <br/>
                            Run By: { this.props.run.user.firstname + " " + this.props.run.user.lastname } <br/>
                            Date: { this.props.run.date }<br/>
                            Time: { this.props.run.time }<br/>
                        </h6>
                    </div>
                    <div className="col-4">
                        <h6 className="text-aqua text-small text-bold">Hyper Parameters</h6>
                        <h6>
                            Batch Size: { this.props.run.batch_size } <br/>
                            Epochs: { this.props.run.epochs } <br/>
                            Loss Type: { this.props.run.loss.loss_type } <br/>
                            Optimizer: { this.props.run.optimizer.optimizer } <br/>
                            Learning Rate: { this.props.run.learning_rate } <br/>
                            Weight Decay: { this.props.run.weight_decay } <br/>
                        </h6>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        run: state.modelReducer.selected_run
    }
}

const mapDispatchToProps = disaptch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunFeatures);

