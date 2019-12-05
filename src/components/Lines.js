import React, { Component } from 'react';
import {List} from 'semantic-ui-react'


class Lines extends Component {

  // Fromat selection to display top 50 brightest lines
  renderList = () => {
    let index = 0
    let selectionWithHeader = this.props.selection.map((value) => {
      index += 1
      return [this.props.comFile.data[0][index - 1], value]
    })
    selectionWithHeader.splice(0, 7)
    selectionWithHeader = selectionWithHeader.sort((a, b) => {
      return Number(b[1]) - Number(a[1])
    }).splice(0,49)
    return selectionWithHeader
  }

  render() {
    return (
      <List divided relaxed style={{"paddingTop": "30px"}}>
      {this.renderList().map((item) => {
        return <List.Item>{item[0]} - {item[1]}</List.Item>
      })}
  </List>
    );
  }

}

export default Lines;
