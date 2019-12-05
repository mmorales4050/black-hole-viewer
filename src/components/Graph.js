import React, { Component } from 'react'
import Chart from "chart.js";


export default class Graph extends Component {
    chartRef = React.createRef();

    componentDidMount() {
      let graph = this.props.graph
      graph = graph.split(/(\s+)/).filter((value) => {
        return value.includes("e") && value.length > 6
      })
      graph.shift()
      console.log(graph)
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                datasets: [
                    {
                      fill: false,
                        label: "NU",
                        data: [],
                    },
                    {
                      fill: false,
                      label: "REFLC",
                      data: [],
                    }
                ]
            },
            options: {
                scales: {
                  xAxes: [{
                    display: true,
                    type: 'logarithmic'
                  }],
                  yAxes: [{
                    display: true,
                    type: 'logarithmic'
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
