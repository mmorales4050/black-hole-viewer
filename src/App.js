import React, { Component } from 'react';
import Papa from 'papaparse';
import './App.css';
import { Button, Grid, Header, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'




class App extends Component {
  state = {
    comFile: null,
    selection: null,
    agn: "10", // index 1
    z: "1", // index 2
    n: "300", // index 3
    r: "21.6", // index 4
    nh: "20" // index 5
  }

  handleClick = (e) => {
    let selection = this.state.comFile.data.filter((item) => {
      return parseFloat(item[1]) === parseFloat(this.state.agn) && parseFloat(item[2]) === parseFloat(this.state.z) && parseFloat(item[3]) === parseFloat(this.state.n) && parseFloat(item[4]) === parseFloat(this.state.r) && parseFloat(item[5]) === parseFloat(this.state.nh)
    })
    this.setState({...this.state, selection: selection})
  }

  handleChange = (e) => {
    let newState = {...this.state}
    newState[e.target.id] = e.target.value
    this.setState(newState)
  }

  componentDidMount() {
    Papa.parse("combinedFile.csv", {
	download: true,
	complete: (results) => {
          this.setState({...this.state, comFile: results})
	     }
    })
  }

  render() {
    return (
      <Grid container columns={3} divided relaxed stackable style={{"paddingTop": "30px"}}>
        <Grid.Column textAlign='center'>
        <Header as='h3' >
      Input Form
      </Header>
      <Input id='agn' label='AGN' value={this.state.agn} onChange={this.handleChange} placeholder='' style={{padding: "5px"}}/>
      <br/>
      <Input id='z' label='Z' value={this.state.z} onChange={this.handleChange} placeholder='' style={{padding: "5px"}}/>
      <br/>
      <Input id='n' label='N' value={this.state.n} onChange={this.handleChange} placeholder='' style={{padding: "5px"}}/>
      <br/>
      <Input id='nh' label='NH' value={this.state.nh} onChange={this.handleChange} placeholder='' style={{padding: "5px"}}/>
      <br/>
      <Input id='r' label='R' value={this.state.r} onChange={this.handleChange} placeholder='' style={{padding: "5px"}}/>
      <br/>
      <Button onClick={this.handleClick} style={{margin: "5px", width: "154px", height: "37px"}}>
      Submit
      </Button>
        </Grid.Column>

        <Grid.Column textAlign='center'>
        <Header as='h3'>
      Graph
      </Header>
        </Grid.Column>
        <Grid.Column textAlign='center'>
        <Header as='h3'>
      Top 50 Brightest lines
      </Header>
        </Grid.Column>
      </Grid>
    )
  }
}

export default App;
