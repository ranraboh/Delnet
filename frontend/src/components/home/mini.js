import React, { Component } from 'react'

class MiniSection extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class={ "col-xl-" + this.props.size + " col-md-6 mb-4"}>
                <div className={"card border-left-" + this.props.style + " shadow h-100 py-2"}>
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class={"text-xs font-weight-bold text-" + this.props.style + " text-uppercase mb-1"}>{ this.props.category }</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">{ this.props.value }</div>
                            </div>
                            <div class="col-auto">
                                <i class={"fa " + this.props.icon + " fa-2x text-gray-300"}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MiniSection;