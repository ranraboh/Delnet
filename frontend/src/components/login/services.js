import React, { Component } from 'react';
import ServiceItem from './service-item.js';

class Services extends Component {
    render() {
        return (
            <div id="services">
                {/* services titles */}
                <h1 className="prefix-title">Servi</h1>
                <h1 className="postfix-title">ces</h1>
                <div id="services-title-seperator">
                    <hr className="seperator" />
                </div>
                <h5 id="services-subtitle">
                    delnet is web application design to aid any team
                    owns deep learning project in their task.
                    it provides multitude of services to faciltate 
                    the team job and to built an optimal neural network 
                    model for thier task.
                </h5>
                {/* services items */}
                <div className="container">
                    <div className="row">
                        <ServiceItem id="service-1" sign='X' title="Management Interface" color="green"
                            description="The application provides the delepoment team a friendly interface to manage the project effectively and neat" />
                        <ServiceItem id="service-2" sign='m' title="Useful machine learning tools" color="blue"
                            description="the application provides a plethora of tools that helps the development team to achieve their goals and build up an optimal model for their tasks
                            such as tune hyper-parameters to get the optimal model or give various recommendations to optimize the team's algorithm"/>
                        <ServiceItem id="service-3" sign='r' title="Community" color="purple"
                            description="Community-based software which encourages users to help each other to promote their projects
                            through building data sets in collaboration or consult about any encountered
                            issues during project planning and implementation"/>
                    </div>
                    <div className="row">
                        <ServiceItem id="service-4" sign='0' title="Data Set Management" color="pink"
                            description="A crucial part of deep learning projects is collecting the data to train the model on.
                            the applications provides a friendly and The application offers an extensive and friendly interface to collect and manage the data." />
                        <ServiceItem id="service-5" sign='u' title="Community-based collection" color="red"
                            description="the community gather and label data together,
                            enable the application to offer examples for adding to your project data set" />
                        <ServiceItem id="service-6" sign='m' title="Automated model build-up" color="yellow"
                            description="Provides a tool that making deep learning more accessible and enables users to train deep
                            learning models without requiring expertise in coding" />
                    </div>
                </div>
            </div>           
        )
    }
}

export default Services;