import React, { Component } from 'react';
import { Input, Button, Dropdown, Label, Segment, Icon } from 'semantic-ui-react'
import DropDown from './DropDown'

class Form extends Component {
  state = {
    agn: "5", // index 1
    z: "0.1", // index 2
    n: "300", // index 3
    r: "19.2", // index 4
    nh: "21" // index 5,
  }
  agn = [
    {text: 0, value: 0},
    {text: 5, value: 5},
    {text: 10, value: 10},
    {text: 20, value: 20},
    {text: 40, value: 40},
    {text: 60, value: 60},
    {text: 80, value: 80},
    {text: 100, value: 100}
  ]
  z = [
    {text: 1, value: 1},
    {text: 0.1, value: 0.1}
  ]
  n = [
    {text: 300, value: 300},
    {text: 1000, value: 1000}
  ]
  nh = [
    {text: 20, value: 20},
    {text: 21, value: 21},
    {text: 22, value: 22},
    {text: 23, value: 23}
  ]
  handleChange = (e) => {
    this.setState({...this.state, [e.target.id]: e.target.value})
  }

  handleClick = (e) => {
    this.props.updateApp(this.state)
  }

  render() {
    return (
      <>
      <DropDown label="AGN" options={this.agn} />
      <DropDown label="Z" options={this.z} />
      <DropDown label="N" options={this.n} />
      <DropDown label="NH" options={this.nh} />
      <Segment raised style={{margin: "5px"}}>
      <Label ribbon color='blue' style={{marginBottom: "5px"}}>LogU</Label>
      <Input
    placeholder=''
    fluid
    style={{width: '100px'}}/>
      </Segment>
      <Segment raised style={{margin: "5px", width: '129px'}}>
      <Label ribbon color='blue' style={{marginBottom: "5px"}}>Submit</Label>
      <Button onClick={this.handleClick}
       style={{ width: "100px"}}>
      <Icon name="check"/>
      </Button>
      </Segment>
      </>
    );
  }

}

export default Form;
