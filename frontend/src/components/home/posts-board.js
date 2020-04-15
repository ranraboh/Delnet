import React, { Component } from 'react'
import Post from './post'

class PostBoard extends Component {
    render() {
        return (
            <div id="posts-section">
                <Post title="Pytorch tutorial" likes="5" comments="20"
                    description="Learn PyTorch from the very basics to advanced models like Generative Adverserial Networks and Image Captioning" />
                <Post title="Numpy module" likes="3" comments="1"
                    description="Numerical python or simply NumPy is one of the best modules to perform scientific computing in python. It is extensively used for data science as well" />
                <Post title="Perceptron algorithm" likes="13" comments="2"
                    description="Perceptron is a fundamental unit of the neural network which takes weighted inputs, process it and capable of performing binary classifications" />
            </div>
        )
    }
}

export default PostBoard;