import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectRun, getProjectRuns, getTrainResult, getDevResult, clearRunSelection } from '../../../actions/project/model.js';
import Modal from './modal.js';

class RunOutcomes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            selected_run: null
        }
        /* bind inner methods */
        this.select_run = this.select_run.bind(this);
        this.display_run_data = this.display_run_data.bind(this);
        this.close_handler = this.close_handler.bind(this);

        /* receive set of all completed runs of project */
        this.props.getProjectRuns(this.props.selected_project.id)
    }

    close_handler() {
        this.setState({
            ...this.state,
            selected_run: null
        }, () => {
            this.props.clearRunSelection();
        })
    }

    componentWillReceiveProps(nextProps) {
        let runs = nextProps.runs
        runs.map((run) => {
            let dot_index = run.time.indexOf('.')
            run.time = run.time.substring(0, dot_index)
        })
        this.setState({
            runs: runs
        })
    }

    display_run_data() {
        if (this.state.selected_run != null)
            return (<Modal close_handler={this.close_handler}/>)
        return ''
    }   

    select_run(index, run_code) {
        if (this.state.selected_run != index) {
            this.setState({
                ...this.state,
                selected_run: index
            }, () => {
                this.props.selectRun(run_code, () => {
                    this.props.getTrainResult(run_code);
                    this.props.getDevResult(run_code);
                });
            })
        } else {
            this.setState({
                ...this.state,
                selected_run: null
            }, () => {
                this.props.clearRunSelection();
            })
        }
    }

    render() {
        if (this.props.runs == null)
            return (<h2>No Runs</h2>)
        let selected_run_data = this.display_run_data()
        return (
        <section className="section-in-main">
            <div className="header-section-v1 header-v1-purple">
                <h1 id="projects-title">
                    Run Outcomes
                </h1>
                <h2 id="projects-intro">
                    this section display your running features and results
                </h2>
            </div>
            { selected_run_data }
            <h6 id="outcomes-intro">
                This section display your running features and results <br/>
                The elements are sorted by the run date, from the last run to the oldest run.
                Whenever you clicked on praticular run, you can see its results in raw form and 
                grphically using common statics charts.
            </h6>
            <p/>
            <div class="container runs-set">
                    <div className="row">
                    {
                        this.props.runs.map((record, index) => 
                            <div class="col-md-4" onClick={ () => this.select_run(index, record.id) } >
                                <div class="run-item">
                                    <h6><a className="text-bold">{ this.props.runs_quantity - index } </a></h6>
                                    <h6><a className="regular-text">{ record.date + " " + record.time } </a></h6>
                                    <h6><a className="hover-text">Date: { record.date } </a></h6>
                                    <h6><a className="hover-text">Time: { record.time } </a></h6>
                                    <h6><a className="hover-text">Run by: { record.user.firstname + " " + record.user.lastname } </a></h6>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="text-message text-blue">
                    { (this.props.runs.length == 0)?'you or your team members had never trained your model yet ' :'' }
                </div>
            </div>
        </section>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        selected_project: state.projectReducer.project_selected,
        runs: state.modelReducer.project_runs,
        runs_quantity: state.modelReducer.runs_quantity
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProjectRuns: (project_id) => {
            dispatch(getProjectRuns(project_id))
        },
        getTrainResult: (run_code) => {
            dispatch(getTrainResult(run_code))
        },
        getDevResult: (run_code) => {
            dispatch(getDevResult(run_code))
        },
        selectRun: (run_code) => {
            dispatch(selectRun(run_code));
        },
        clearRunSelection: () => {
            dispatch(clearRunSelection())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunOutcomes);

