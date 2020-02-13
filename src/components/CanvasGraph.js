import React, { Component } from 'react'
import CanvasJSReact from './canvasjs.react'
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Graph extends Component {

    state = {
      min_x: 1,
      min_y: 1,
      max_x: 1e12,
      max_y: 1e50
    }

    get onChange () {
      return e => this.setState ({[e.target.name]: parseFloat(`1e${e.target.value}`)});
    }

    render() {

      const options = {
        zoomEnabled: true,
        // title: {
        //   text: "Cont nu / Total"
        // },
        axisX: {
          labelFormatter: e => parseFloat (e.value).toExponential (),
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
          labelFormatter: e => parseFloat (e.value).toExponential (),
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
          markerSize: 1,
          toolTipContent: "<b>Cont nu: </b>{x}<br/><b>Total: </b>{y}",
          dataPoints: this.props.data.map (([x, y]) => {return {x, y}})
        }]
      }

      return (
          <div >
            <CanvasJSChart options = {options} />
            <h2>Select Range:</h2>
            <label>X: [1e<input className="range-input" name="min_x" onChange={this.onChange} defaultValue={Math.log10 (this.state.min_x)}  /> - 1e<input className="range-input" name="max_x" onChange={this.onChange} defaultValue={Math.log10 (this.state.max_x)}  />]</label>
            <br/>
            <label>Y: [1e<input className="range-input" name="min_y" onChange={this.onChange} defaultValue={Math.log10 (this.state.min_y)}  /> - 1e<input className="range-input" name="max_y" onChange={this.onChange} defaultValue={Math.log10 (this.state.max_y)}  />]</label>
          </div>
      )
    }
}
