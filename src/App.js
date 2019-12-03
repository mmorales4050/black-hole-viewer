import React, { Component } from 'react';
import Papa from 'papaparse';
import './App.css';
import { Button, Grid, Header, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'




class App extends Component {

  state = {
    combineFile: null,
    agn: "",
    z: "",
    n: "",
    nh: "",
    r: ""
  }

  componentDidMount() {
    Papa.parse("combinedFile.csv", {
	download: true,
	complete: function(results) {
    this.setState({...this.state, combineFile: results})
		console.log(results.data[1]);
	}
});
  }

  render() {
    return (
      <Grid container columns={3} divided relaxed stackable style={{"paddingTop": "30px"}}>
        <Grid.Column textAlign='center'>
        <Header as='h3' >
      Input Form
      </Header>
      <Input label='AGN' placeholder='' style={{padding: "5px"}}/>
      <br/>
      <Input label='Z' placeholder='' style={{padding: "5px"}}/>
      <br/>
      <Input label='n' placeholder='' style={{padding: "5px"}}/>
      <br/>
      <Input label='NH' placeholder='' style={{padding: "5px"}}/>
      <br/>
      <Input label='R' placeholder='' style={{padding: "5px"}}/>
      <br/>
      <Button style={{margin: "5px", width: "154px", height: "37px"}}>
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
