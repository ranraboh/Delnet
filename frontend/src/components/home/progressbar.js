import React, { Component } from 'react'

class ProgressBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value,
            type: this.get_type(this.props.value)
        }
        console.log(this.state)
        this.get_type = this.get_type.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
            type: this.get_type(nextProps.value)
        })
    }

    get_type(value) {
        let type = '';
        if (value >= 75)
            type = 'bg-success';
        else if (value >= 50)
            type = 'bg-primary';
        else if (value >= 25)
            type = 'bg-warning';
        else 
            type = 'bg-danger';
        return type
    }
    
    render() {
        return (
            <div class="progress">
                <div class={"progress-text progress-bar-striped " + this.state.type } role="progressbar" 
                    aria-valuenow={ this.state.value } aria-valuemin="0" aria-valuemax="100"
                    style={{width: this.state.value + "%"}}>
                        { this.state.value + "%" }
                    </div>
            </div>
        )
    }

    componentDidMount() {
    }
}

export default ProgressBar;