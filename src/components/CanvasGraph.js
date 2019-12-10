import React, { Component } from 'react'
import CanvasJSReact from './canvasjs.react'
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Graph extends Component {
    state = {
      data: [],
      max_x: null,
      max_y: null,
      min_x: null,
      min_y: null
    }

    componentDidMount() {
      // filter out data that will not be graphed
      let graph = this.props.graph
      graph = graph.split(/(\s+)/).filter((value) => {
        return value.includes("e") && value.length > 6
      })
      graph.shift()
      console.log(graph)
      // extract data that will be graphed
      let data_set = []
      let data_point = {}
      let counter = 0
      let nu_counter = 0
      let total_counter = 6
      let max_x = 0
      let min_x = graph[0]
      let min_y = graph[6]
      let max_y = 0
      graph.forEach((value) => {
        if(counter - nu_counter === 0) {
          nu_counter += 9
          data_point.x = Number(value)
          if(Number(value) > max_x) {
            max_x = Number(value)
          }
          if(Number(value) < min_x) {
            min_x = Number(value)
          }
        }
        if(counter - total_counter === 0) {
          total_counter += 9
          data_point.y = Number(value)
          data_set.push(data_point)
          data_point = {}
          if(Number(value) > max_y) {
            max_y = Number(value)
          }
          if(Number(value) < min_y) {
            min_y = Number(value)
          }
        }
        counter ++
      })
      // console.log(data_set)
      this.setState({...this.state, data: data_set, max_x: max_x, max_y: max_y, min_x: min_x, min_y: min_y})
    }

    render() {
      const options = {
        zoomEnabled: true,
			animationEnabled: true,
          animationEnabled: true,
          zoomEnabled: true,
          // title:{
          //   text: "Cont nu / Total"
          // },
          axisX: {
            logarithmic: true,
   logarithmBase:  10,
            title:"Cont nu",
            minimum: this.state.min_x,
		        maximum: this.state.max_x,
            crosshair: {
              enabled: true,
              snapToDataPoint: true
            }
          },
          axisY:{
            logarithmic: true,
   logarithmBase:  10,
            title: "Total",
            minimum: this.state.min_y,
		        maximum: this.state.max_y,
            crosshair: {
              enabled: true,
              snapToDataPoint: true
            }
          },
          data: [{
            type: "line",
            markerSize: 5,
            toolTipContent: "<b>Cont nu: </b>{x}<br/><b>Total: </b>{y}",
            dataPoints: this.state.data
          }]
        }
        return (
            <div >
            <CanvasJSChart options = {options} />
            </div>
        )
    }
}
