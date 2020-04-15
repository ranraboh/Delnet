import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import ProgressBar from '../home/progressbar.js';
import { getUnfinishedRuns } from '../../actions/project/model.js'

class RunningSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runs: this.props.runs
        }
        /* receive data from backend */
        this.props.getUnfinishedRuns(this.props.selected_project.id)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            runs: nextProps.runs
        })
    }

    async componentDidMount() {
        try {
          setInterval(async () => {
            this.props.getUnfinishedRuns(this.props.selected_project.id)
            }, 20000);
        } catch(e) {
          console.log(e);
        } 
    }

    render() {
        if (this.props.runs == null || this.props.runs == undefined)
            return ""
        return (
        <div id="running-section">
            <div id="information-header">
                <p className="dataset-links-title"></p>
            </div>
            <div id="running-internal">
                <p/>
                {
                    this.state.runs.map((recored) =>
                        <div>
                            <h2 className="text-agency text-small text-bold">Run Code: { recored.id }</h2>
                            <h2 className="text-agency text-small"><span className="underline">Date:</span> { recored.date + " " + recored.time }</h2>
                            <h2 className="text-agency text-small"><span className="underline">In Epoch:</span> { parseInt((recored.progress / (100 / recored.epochs)) + 1) + '/' + recored.epochs }</h2>
                            <h2 className="text-agency text-small"><span className="underline">Ran By:</span> { recored.user.firstname + ' ' + recored.user.lastname }</h2>
                            <h2 className="text-agency text-small"><span className="underline">Hyper Parameters:</span> watch</h2>
                            <ProgressBar value={ recored.progress } />
                            <hr/>
                        </div>
                    )
                }
            </div>
            <p/>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        user: state.authentication.user,
        runs: state.modelReducer.unfinished_runs,
        selected_project: state.projectReducer.project_selected
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getUnfinishedRuns: (project_id) => {
            dispatch(getUnfinishedRuns(project_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningSection);