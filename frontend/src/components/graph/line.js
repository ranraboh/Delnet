import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Bar, Line } from 'react-chartjs-2';

class LineChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chart_data: {
                labels: [],
                datasets: []
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            min: props.min,
                            max: props.max
                        }
                    }]
                }
            },
            category_display: props.display,
            value: props.value,
            categories: props.categories
        }
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
      }

    componentWillMount() {
        let colors = [ 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)' ]
        colors = this.shuffle(colors)
        this.props.data.map((data, i) => {
            let chart_data = this.state.chart_data;
            chart_data.datasets[i] = {
                label: this.state.categories[i],
                data: [],
                backgroundColor: null
            }
            data.map((record, j) => { 
                if (j == data.length - 1)
                    return;
                if (i == 0)
                    chart_data.labels = [ ...chart_data.labels, record[this.state.category_display] ];
                chart_data.datasets[i].data.push(record[this.state.value]);
                chart_data.datasets[i].backgroundColor = colors[i];
                this.setState({
                    chart_data: chart_data,
                    data_ready: true
                }) 
            })
        })
    }

    componentDidMount() {
        let element = document.getElementById('multi-bar');
        if (element != null)
            element.style.height = '250px';
    }

    render() {
        let chart = (<Line id="multi-bar" data={ this.state.chart_data } options={ this.state.options } />)
        return (
            <div>
                { chart }
            </div>
        )
    }
}
export default LineChart;