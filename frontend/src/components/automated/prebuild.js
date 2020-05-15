import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { stageAdvance } from '../../actions/amb/state.js'
import ModelItem from './model-item.js';

class Prebuild extends Component {
    constructor(props) {
        super(props)
        this.select_item = this.select_item.bind(this);
    }

    select_item() {
        this.props.stageAdvance(4)
    }

    render() {
        return (
            <section id="prebuild-section" class="section-in-main">
                <div className="container">
                    <div className="row">
                            <div className="row">
                                <ModelItem name="Alex Net" color="blue" image="/static/images/alexnet.jpg" on_select={ this.select_item }
                                    description="AlexNet is an incredibly powerful model capable of achieving high accuracies on very challenging datasets." />
                                <ModelItem name="Res Net" color="blue" image="/static/images/resnet.jpg"
                                    description="Resnet is an incredibly powerful model capable of achieving high accuracies on very challenging datasets." />
                            </div>
                            <div class="col-md-12">
                                <p className="button-v3"><a class="button" onClick={ this.start_action }>Select</a></p>
                            </div>
                        </div>
                    </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        stageAdvance: (stage) => {
            dispatch(stageAdvance(stage))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Prebuild);
