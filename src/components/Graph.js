import React, { Component } from 'react'
import Chart from "react-google-charts"

export default class Graph extends Component {

    render() {
        return (
            <Chart
    chartType="LineChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Cont nu', 'Total'],
      ...this.props.data
    ]}
    options={{
      intervals: { style: 'sticks' },
      legend: 'none',
      chartArea: { width: '60%'},
      hAxis: {
        title: 'Cont nu',
        scaleType: 'log',
        format: 'scientific'
      },
      vAxis: {
        title: 'Total',
        scaleType: 'log',
        format: 'scientific'
      },
    }}

  style={{width:"100%"}}/>
        )
    }
}
