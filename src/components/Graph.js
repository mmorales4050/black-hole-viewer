import React, { Component } from 'react'
import CanvasJSReact from './canvasjs.react'
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Graph extends Component {
    state = {
      data: [],
      x_max: null,
      y_max: null
    }

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
      let max_x = 0
      let max_y = 0
      graph.forEach((value) => {
        if(counter - nu_counter === 0) {
          nu_counter += 9
          data_point.x = Number(value)
          if(Number(value) > max_x) {
            max_x = Number(value)
          }
        }
        if(counter - total_counter === 0) {
          total_counter += 9
          data_point.y = Number(value)
          data_set.push(data_point)
          if(Number(value) > max_y) {
            max_y = Number(value)
          }
        }
        counter ++
      })
      this.setState({...this.state, data: data_set, max_x: max_x, max_y: max_y})
    }

    render() {
      const options = {
          theme: "dark2",
          animationEnabled: true,
          zoomEnabled: true,
          title:{
            text: "Ice Cream Sales vs Temperature"
          },
          axisX: {
            title:"Temperature (in °C)",
            minimum: 0,
		        maximum: this.state.max_x,
            suffix: "°C",
            crosshair: {
              enabled: true,
              snapToDataPoint: true
            }
          },
          axisY:{
            title: "Sales",
            minimum: 0,
		        maximum: this.state.max_y,
            crosshair: {
              enabled: true,
              snapToDataPoint: true
            }
          },
          data: [{
            type: "scatter",
            markerSize: 15,
            toolTipContent: "<b>Temperature: </b>{x}°C<br/><b>Sales: </b>{y}",
            dataPoints: this.state.data
          }]
        }
        console.log(this.state)
        return (
            <div >
            <CanvasJSChart options = {options}/>
            </div>
        )
    }
}
