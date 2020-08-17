import { PROJECT_DETAILS_STAGE } from './actions/enums.js'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { stageAdvance } from '../../actions/amb/state.js'

class IntroModelBuilder extends Component {
    constructor(props) {
        super(props)
        this.start_action = this.start_action.bind(this);
    }

    start_action() {
        console.log(PROJECT_DETAILS_STAGE)
        this.props.stageAdvance(PROJECT_DETAILS_STAGE);
    }

    render() {
        return (
                <section class="amb-services section-in-main">
                <div class="text">
                    <h2>Automated model build-up</h2>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 service_icon">
                            <div class="single_service">
                                <h5>M</h5>
                                <h3><a href="#">Easy To Use</a></h3>
                                <p>Provides a tool that making deep learning more accessible and enables users to train deep
                                learning models without requiring expertise in coding.</p>                        </div>
                        </div>
                        <div class="col-md-4 service_icon">
                            <div class="single_service">
                                <h5>x</h5>
                                <h3><a href="#">Friendly Interface</a></h3>
                                <p>Declare what the structure of your model should 
                                be like without dwelling on the implementations.</p>
                            </div>
                        </div>
                        <div class="col-md-4 service_icon">
                            <div class="single_service">
                                <h5>t</h5>
                                <h3><a href="#">Automated Tool</a></h3>
                                <p>define the architecture of the neural network and the application automatically generate the code for you.</p>
                            </div>
                        </div>
                <section class="amb-information">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-lg-6 home-about-left no-padding">
							<img class="mx-auto d-block img-fluid" src="/static/images/amb.png" alt="" />
                        </div>
                        <div class="col-lg-6 home-about-right no-padding">
                            <h2>Build a neural network in three simple steps</h2>
                            <h5>
                                through a friendly and advanced interface.
                            </h5>
                            <p>
                                Step 1: General details about the project <br/>
                                Step 2: Model Settings <br/>
                                Step 3: Define the model architecture\layers <br/> 
                            </p>
                            </div>
                        </div>
                    </div>	
                </section>
                    </div>
                </div>
                <div class="col-md-12">
                    <p className="button-v3"><a class="button" onClick={ this.start_action }>Get started</a></p>
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
            console.log(stage)
            dispatch(stageAdvance(stage))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroModelBuilder);
