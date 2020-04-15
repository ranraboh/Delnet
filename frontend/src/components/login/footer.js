import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
        <footer id="footer">
            <div id="social-network">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <h6 className="mb-0">Get connected with us on social networks</h6>
                        </div>
                        <div className="col-4">
                            col
                        </div>
                    </div>
                </div>
                <div id="footer-details">
                    <div className="row">
                        <div className="col-4">
                            <h4 className="footer-titles">delnet</h4>
                            <h6>
                                bla bla bla
                                bla bla bla
                                bla bla bla
                                bla bla bla
                            </h6>
                        </div>
                        <div className="col-4">
                            <h4 className="footer-titles">contact us</h4>
                            <h6>
                                bla bla bla
                                bla bla bla
                                bla bla bla
                                bla bla bla
                            </h6>
                        </div>
                        <div className="col-4">
                            <h4 className="footer-titles">Links</h4>
                            <h6>
                                bla bla bla
                                bla bla bla
                                bla bla bla
                                bla bla bla
                            </h6>
                        </div>
                    </div>
                </div>
                <div id="copyright">
                    @copyright to bar ilan university
                </div>
            </div>
        </footer>
        );
    }
}

export default Footer;