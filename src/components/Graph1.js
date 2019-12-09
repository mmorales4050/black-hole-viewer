import React, { Component } from 'react'
import Chart from "react-google-charts"

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
          data_set.push([data_point.x, data_point.y])
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
        return (
            <Chart
    chartType="LineChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Cont nu', 'Total'],
      ...this.state.data
    ]}
    options={{
      intervals: { style: 'sticks' },
      legend: 'none',
      chartArea: { width: '40%' },
      hAxis: {
        title: 'Total',
        scaleType: 'log',
        format: 'scientific'
      },
      vAxis: {
        title: 'Cont nu',
        scaleType: 'log',
        format: 'scientific'
      },
    }}

  />
        )
    }
}
