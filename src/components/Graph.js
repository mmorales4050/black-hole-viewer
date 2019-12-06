import React, { Component } from 'react'
import Chart from "chart.js";


export default class Graph extends Component {
    chartRef = React.createRef();

    componentDidMount() {
      // filter out data that will not be graphed
      let graph = this.props.graph
      graph = graph.split(/(\s+)/).filter((value) => {
        return value.includes("e") && value.length > 6
      })
      graph.shift()
      // extract data that will be graphed
      let data_set = []
      let data_point = {}
      let counter = 0
      let nu_counter = 0
      let total_counter = 6
      graph.forEach((value) => {
        if(counter - nu_counter === 0) {
          nu_counter += 9
          data_point.x = Number(value)
        }
        if(counter - total_counter === 0) {
          total_counter += 9
          data_point.y = Number(value)
          data_set.push(data_point)
        }
        counter ++
      })
      console.log(data_set)
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
            data: [...data_set, {
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }]
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'logarithmic',
                position: 'bottom'
            }]
        }
    }
      });
    }
    render() {
        return (
            <div >
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}


	// var color = Chart.helpers.color;
	// var scatterChartData = {
	// 	datasets: [{
	// 		borderColor: window.chartColors.red,
	// 		backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
	// 		label: 'V(node2)',
	// 		data: []
	// 	}]
	// };
  //
	// window.onload = function() {
	// 	var ctx = document.getElementById('canvas').getContext('2d');
	// 	window.myScatter = Chart.Scatter(ctx, {
	// 		data: scatterChartData,
	// 		options: {
	// 			title: {
	// 				display: true,
	// 				text: 'Chart.js Scatter Chart - Logarithmic X-Axis'
	// 			},
	// 			scales: {
	// 				xAxes: [{
	// 					type: 'logarithmic',
	// 					position: 'bottom',
	// 					ticks: {
	// 						userCallback: function(tick) {
	// 							var remain = tick / (Math.pow(10, Math.floor(Chart.helpers.log10(tick))));
	// 							if (remain === 1 || remain === 2 || remain === 5) {
	// 								return tick.toString() + 'Hz';
	// 							}
	// 							return '';
	// 						},
	// 					},
	// 					scaleLabel: {
	// 						labelString: 'Frequency',
	// 						display: true,
	// 					}
	// 				}],
	// 				yAxes: [{
	// 					type: 'linear',
	// 					ticks: {
	// 						userCallback: function(tick) {
	// 							return tick.toString() + 'dB';
	// 						}
	// 					},
	// 					scaleLabel: {
	// 						labelString: 'Voltage',
	// 						display: true
	// 					}
	// 				}]
	// 			}
	// 		}
	// 	});
	// };
