import React, { Component } from 'react';
import { Input, Button, Dropdown, Label, Segment } from 'semantic-ui-react'

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
    {text: 5, value: 5}
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
      <Segment raised style={{margin: "5px"}}>
      <Label ribbon color='blue' style={{marginBottom: "5px"}}>AGN</Label>
      <Dropdown
    placeholder=''
    fluid
    selection
    options={this.agn}
    style={{width: '100px'}}/>
      </Segment>
      <Input onChange={this.handleChange} id='agn' label='AGN' value={this.state.agn} placeholder='' style={{padding: "5px"}}/>
      <Input onChange={this.handleChange} id='z' label='Z' value={this.state.z} placeholder='' style={{padding: "5px"}}/>
      <Input onChange={this.handleChange} id='n' label='N' value={this.state.n} placeholder='' style={{padding: "5px"}}/>
      <Input onChange={this.handleChange} id='r' label='R' value={this.state.r} placeholder='' style={{padding: "5px"}}/>
      <Input onChange={this.handleChange} id='nh' label='NH' value={this.state.nh} placeholder='' style={{padding: "5px"}}/>
      <Button onClick={this.handleClick} style={{margin: "5px", width: "154px", height: "37px"}}>
      Submit
      </Button>
      </>
    );
  }

}

export default Form;
