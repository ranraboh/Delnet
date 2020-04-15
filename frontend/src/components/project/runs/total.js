import React, { Component } from 'react';
import { connect } from 'react-redux';
 
class TotalResults extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.run.id === null || this.props.run.id === undefined)
            return ''
        return (
            <div id="run-features">
                <h6 className="text-poppins">
                    Total results over test set. <br/>
                    The test made after the model was trained and evaluated. <br/>
                </h6>
                <h6 className="text-poppins">
                    <span className="underline">Accuracy:</span> { this.props.run.accuracy } <br/>
                    <span className="underline">Loss:</span> { this.props.run.loss_value }<br/>
                </h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(TotalResults);

