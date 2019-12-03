import React, { Component } from 'react';
import {List} from 'semantic-ui-react'


class Lines extends Component {

  renderList = () => {

  }
  
  render() {
    return (
      <List divided relaxed>
      {this.renderList()}
    {this.props.selection.map((item) => {
      return <List.Item><List.Content>
        <List.Header>{item}</List.Header>
      </List.Content></List.Item>
    })}
  </List>
    );
  }

}

export default Lines;
