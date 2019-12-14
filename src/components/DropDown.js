import React, { Component } from 'react';
import { Dropdown, Label, Segment } from 'semantic-ui-react'

class DropDown extends Component {

  render() {
    return (
      <Segment raised style={{margin: "5px"}}>
      <Label ribbon color='blue' style={{marginBottom: "5px"}}>{this.props.label}</Label>
      <Dropdown
    placeholder=''
    fluid
    selection
    options={this.props.options}
    style={{width: '100px'}}/>
      </Segment>
    );
  }

}

export default DropDown;
