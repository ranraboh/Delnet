import React, { Component } from 'react'
import Slide from './slide';
import Navbar from './navbar.js';

class Upper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header_spread: true
        }
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentWillMount() { 
        $('.carousel').carousel({
            interval: false
        }); 
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        let scroll_position = window.scrollY
        if (scroll_position > 100 && this.state.header_spread == true) {
            this.setState({
                ...this.state,
                header_spread: false
            });
        }
        if (scroll_position < 100 && this.state.header_spread == false) {
            this.setState({
                ...this.state,
                header_spread: true
            });
        }
    }

    render() {
        return (   
        <div>
            <section id="mu-featured-slider" className= { (this.state.header_spread == true)? "slider-spread": "slider-contract" }>
                <div class="row">
                    <div class="col-md-12">
                        <div class="mu-featured-slide">
        
                            <div class="mu-featured-slider-single">
                                <img width="100%" height="600px"  src="http://localhost:8000/static/images/machine.jpg" />
                                                                {/* https://i.pinimg.com/originals/8a/84/f6/8a84f6081395d2337e77552ae2998041.jpg http://localhost:8000/static/images/machine.jpg */}

                                <div class="mu-featured-slider-content">
                                    <Navbar/>
                                    
                                    <h1 className="header-title">WELCOME TO DEVNET</h1>
                                    <p>web application to manage your deep learning projects and making the process more efficient and friendly</p>
                                    <a href="#" class="mu-primary-btn">CONTACT US</a>
                                </div>
                            </div>    
                        </div>
                    </div>			
                </div>
            </section>
        </div>
        )

    }
}

export default Upper;