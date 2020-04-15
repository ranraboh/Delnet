import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Bar } from 'react-chartjs-2';

class BarChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chart_data: {
                labels: [],
                datasets: [{
                    label: this.props.category,
                    data: [],
                    backgroundColor: []
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            min: 0,
                            max: 100    
                        }
                    }]
                }
            },
            category_display: props.display,
            value: props.value,
            data_ready: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.data_ready === true)
            return
        let colors = [ 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 99, 132, 0.6)' ]
        nextProps.data.map((project, index) => {
            let chart_data = this.state.chart_data;
            chart_data.labels = [ ...chart_data.labels, project[this.state.category_display] ];
            chart_data.datasets[0].data = [ ...chart_data.datasets[0].data, project[this.state.value] ];
            chart_data.datasets[0].backgroundColor = [ ...chart_data.datasets[0].backgroundColor, colors[index] ];
            this.setState({
                chart_data: chart_data,
                data_ready: true
            }) 
        })
        console.log(this.state)
    }

    componentDidMount() {
        let element = document.getElementById("graph");
        console.log('bar change height')
        if (element != null && this.props.height != null)
            element.style.height = this.props.height;
    }


    render() {
        let chart = (<Bar id="graph" data={ this.state.chart_data } options={ this.state.options } />)
        return (
            <div>
                { chart }
            </div>
        )
    }
}


export default BarChart;