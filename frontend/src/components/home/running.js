import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import ProgressBar from '../home/progressbar';
import { getUnfinishedUserRuns } from '../../actions/project/model'

class RunningSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runs: this.props.runs
        }
        /* receive data from backend */
        this.props.getUnfinishedUserRuns(this.props.username)
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
            this.props.getUnfinishedUserRuns(this.props.username)
            }, 50000);
        } catch(e) {
          console.log(e);
        } 
    }

    render() {
        if (this.props.runs == null || this.props.runs == undefined)
            return ""
        return (
        <div className="sidebar-category-section">
            <div id="running-internal">
                <p/>
                {
                    this.state.runs.map((recored) =>
                        <div>
                            <h6 className="latest-text text-bold">Run Code: { recored.id }</h6><br/>
                            <h6 className="latest-text"><span className="underline">Project:</span> { recored.project.project_name  }</h6><br/>
                            <h6 className="latest-text"><span className="underline">In Epoch:</span> { parseInt((recored.progress / (100 / recored.epochs)) + 1) + '/' + recored.epochs }</h6><br/>
                            <h6 className="latest-text"><span className="underline">Ran By:</span> { recored.user.firstname + ' ' + recored.user.lastname }</h6><br/>
                            <h6 className="latest-text"><span className="underline">Date:</span> { recored.date + " - " + recored.time.substring(0, 5) }</h6><br/>
                            <ProgressBar value={ recored.progress } />
                            <hr/>
                        </div>
                    )
                }
            </div>
            {
                (this.props.runs.length == 0)?
                <div className="message-text text-aqua">
                    There are no models in training process
                </div>:''
            }
            <p/>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.authentication.user,
        runs: state.modelReducer.unfinished_runs,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getUnfinishedUserRuns: (username) => {
            dispatch(getUnfinishedUserRuns(username))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningSection);