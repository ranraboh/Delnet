import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccuracyGraph from './accuracy.js';
import LossGraph from './loss.js';
import RecallGraph from './recall.js';
import PrecisionGraph from './precision.js';
import ConfusionMatrix from './c-matrix.js';
import F1Scores from './f-one.js';

 
class SpecificRunCharts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            selected_section: 0,
            sections: [ 'Accuracy', 'Loss', 'Recall', 'Precision', 'F1 Score', 'Confusion Matrix' ]
        }

        /* bind inner methods */
        this.on_change = this.on_change.bind(this);
        this.section = this.section.bind(this);
    }

    on_change(index) {
        this.setState({
            ...this.state,
            selected_section: index
        })
    }

    section(html_section, available) {
        if (available) {
            return (
                <div>
                    { html_section }
                </div>
            )
        }
        return ''
    }

    render() {
        let accuracy_graph = this.section(<AccuracyGraph/>, this.state.selected_section == 0 )
        let loss_graph = this.section(<LossGraph/>, this.state.selected_section == 1 )
        let recall_graph = this.section(<RecallGraph/>, this.state.selected_section == 2)
        let precision_graph = this.section(<PrecisionGraph/>, this.state.selected_section == 3)
        let f_one = this.section(<F1Scores/>, this.state.selected_section == 4)
        let c_matrix = this.section(<ConfusionMatrix/>, this.state.selected_section == 5)
        return (
            <div id="runs-charts" className="modal-section">
                <nav>
                    {
                        this.state.sections.map((name, index) =>
                            <button type="button" onClick={ () => this.on_change(index) }
                                className={(this.state.selected_section == index)?"btn btn-info nav-buttons":"btn btn-danger nav-buttons"}>{ name }</button>
                        )
                    }
                </nav>
                { accuracy_graph }
                { loss_graph }
                { recall_graph }
                { precision_graph }
                { f_one }
                { c_matrix }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user
    }
}

const mapDispatchToProps = disaptch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecificRunCharts);

