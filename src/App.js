import React, { Component } from 'react';
import Lines from './components/Lines'
import GraphContainer from './components/GraphContainer'
import Papa from 'papaparse';
import './App.css';
import { Button, Grid, Header, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  state = {
    comFile: null,
    graphFile: null,
    selection: [], // Used to display top 50 brightest lines
    data: [], // Data for graph
    agn: "5", // index 1
    z: "0.1", // index 2
    n: "300", // index 3
    r: "19.2", // index 4
    nh: "21" // index 5,
  }

  handleChange = (e) => {
    this.setState({...this.state, [e.target.id]: e.target.value})
  }

  handleClick = (e) => {
    let selection = this.state.comFile.data.filter((item) => {
      return parseFloat(item[1]) === parseFloat(this.state.agn) && parseFloat(item[2]) === parseFloat(this.state.z) && parseFloat(item[3]) === parseFloat(this.state.n) && parseFloat(item[4]) === parseFloat(this.state.r) && parseFloat(item[5]) === parseFloat(this.state.nh)
    })
    if(selection.length === 0) {
      // Warn user that input is invalid
      console.log("invalid input")
    }else {
      console.log("Graph updated")
      // update graph and top 50 brightest lines
      let file = this.fileName(selection[0])
      this.setState({...this.state, selection: selection[0], graphFile: file})
      this.setData(file)
    }
  }

  fileName = (selection) => {
    // Create file name from selection
    let zeros = 9 - selection[0].length
    // debugger
    let file = "grid" + "0".repeat(zeros) + selection[0]
    if(selection[2] === "1") {
      file += "_Z_1_n_"
    } else {
      file += "_Z_0p1_n_"
    }
    file += selection[3] + "_" + selection[1] + "per.con"
    // Set configuration file to state
    return ("data/" + file)
  }

  setData = file => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file , true);
    // If specified, responseType must be empty string or "text"
    xhr.responseType = 'text';

    xhr.onload = () => {
      if (xhr.readyState === xhr.DONE && this.state.graphContents !== xhr.responseText) {
          if (xhr.status === 200) {
              this.setState({...this.state, data: this.extractData(xhr.responseText)})
            }
          }
        }
        xhr.send(null);
  }

  extractData = graph => {
    graph = graph.split(/(\s+)/).filter((value) => {
      return value.includes("e") && value.length > 6 && !value.includes("i")
    })

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
    return data_set
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
      <Grid container columns={3} divided relaxed stackable style={{"paddingTop": "30px", "width":"100%"}} id="grid-container">
        <Grid.Column textAlign='center' id="col-1">
        <Header as='h3' >
      Input Form
      </Header>
      <Input onBlur={this.handleChange} id='agn' label='AGN' value={this.state.agn} placeholder='' style={{padding: "5px"}}/>
      <br/>
      <Input onBlur={this.handleChange} id='z' label='Z' value={this.state.z} placeholder='' style={{padding: "5px"}}/>
      <br/>
      <Input onBlur={this.handleChange} id='n' label='N' value={this.state.n} placeholder='' style={{padding: "5px"}}/>
      <br/>
      <Input onBlur={this.handleChange} id='r' label='R' value={this.state.r} placeholder='' style={{padding: "5px"}}/>
      <br/>
      <Input onBlur={this.handleChange} id='nh' label='NH' value={this.state.nh} placeholder='' style={{padding: "5px"}}/>
      <br/>
      <Button onClick={this.handleClick} style={{margin: "5px", width: "154px", height: "37px"}}>
      Submit
      </Button>
        </Grid.Column>

        <Grid.Column textAlign='center' id="col-2">

      {!this.state.selection.length > 0 ? null : <GraphContainer selection={this.state.selection} data={this.state.data} graphFile={this.state.graphFile}/>
      }
        </Grid.Column>
        <Grid.Column textAlign='center' id="col-3">
        <Header as='h3'>
      Top 50 Brightest lines
      <Lines selection={this.state.selection} comFile={this.state.comFile}/>
      </Header>
        </Grid.Column>
      </Grid>
    )
  }
}

export default App;
