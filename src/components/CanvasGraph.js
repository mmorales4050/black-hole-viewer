import React, { Component } from 'react'
import CanvasJSReact from './canvasjs.react'
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Graph extends Component {

    render() {
      let range = this.props.data.reduce ((acc, val) => {
        return {min_x: (val [0] < acc.min_x ? val [0] : acc.min_x), max_x: (val [0] > acc.max_x ? val [0] : acc.max_x), min_y: (val [1] < acc.min_y ? val [1] : acc.min_y), max_y: (val [1] > acc.max_y ? val [1] : acc.max_y)}
      }, {min_x: Infinity, max_x: -Infinity, min_y : Infinity, max_y: -Infinity});

      const options = {
        animationEnabled: true,
        zoomEnabled: true,
        // title: {
        //   text: "Cont nu / Total"
        // },
        axisX: {
          labelFormatter: e => parseFloat (e.value).toExponential (),
          logarithmic: true,
          logarithmBase:  10,
          title:"Cont nu",
          minimum: range.min_x,
          maximum: range.max_x,
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          }
        },
        axisY:{
          labelFormatter: e => parseFloat (e.value).toExponential (),
          logarithmic: true,
          logarithmBase:  10,
          title: "Total",
          minimum: 1,
          maximum: 1e50,
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          }
        },
        data: [{
          type: "line",
          markerSize: 1,
          toolTipContent: "<b>Cont nu: </b>{x}<br/><b>Total: </b>{y}",
          dataPoints: this.props.data.map (([x, y]) => {return {x, y}})
        }]
      }

      return (
          <div >
          <CanvasJSChart options = {options} />
          </div>
      )
    }
}
