import React, { Component } from 'react'
import NavBar from './navbar'

class Slide extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            imageUrl: "../static/images/" + this.props.image,
            active: (this.props.active)? true: false
        }
    }

    render() {
        return (
            <div id={ this.state.name } className="carousel-item">
                {/* application title */}
                <h1 id="site-name-prefix">del</h1>
                <h1 id="site-name-postfix">net</h1>
                
                {/* Navbar */}
                <NavBar />

                {/* application logo */}
                <img src={ this.state.imageUrl } width="1100" height="200" />
            </div>
        )
    }

    componentDidMount() {
        if (this.state.active === true) {
            var element = document.getElementById(this.state.name);
            element.classList.add("active");
        }
    }
}

export default Slide;