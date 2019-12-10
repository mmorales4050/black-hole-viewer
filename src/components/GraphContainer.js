import React, { Component } from 'react';
import {Button, Header} from 'semantic-ui-react'
import Graph from './Graph'
import Graph1 from './Graph1'

class GraphContainer extends Component {
  state = {
    graph: "",
    graphFile: "",
    toggle: false
  }

  componentDidMount() {
      // Create file name from selection
      let zeros = 9 - Number(this.props.selection[0])
      let file = "grid" + "0".repeat(zeros)
      if(this.props.selection[2] === "1") {
        file += "_Z_1_n_"
      } else {
        file += "_Z_0p1_n_"
      }
      file += this.props.selection[3] + "_" + this.props.selection[1] + "per.con"
      // Set configuration file to state
      this.setGraph("data/" + file)
  }

  toggleGraph = () => {
    this.setState({...this.state, toggle: !this.state.toggle})
  }

  setGraph = file => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file , true);
    // If specified, responseType must be empty string or "text"
    xhr.responseType = 'text';

    xhr.onload = () => {
      if (xhr.readyState === xhr.DONE && this.state.graph !== xhr.responseText) {
          if (xhr.status === 200) {
              this.setState({...this.state, graph: xhr.responseText, graphFile: file})

            }
          }
        }
        xhr.send(null);
    }

  render() {
    return (
      <>
      <Header as='h3'>
    Graph {
      // this.state.toggle ? "2" : "1"
    }
    </Header>
      {this.state.graph === "" ? null :
      <Graph1 graph={this.state.graph}/>
      //   this.state.toggle ?
      //   <Graph graph={this.state.graph}/> :
      //   <Graph1 graph={this.state.graph}/>
      }
      <a href={this.state.graphFile} download >
      <Button>
      Download Configuration File
      </Button>
      </a>
      <Button onClick={this.toggleGraph}>
      Change Graph
      </Button>
      </>
    );
  }

}

export default GraphContainer;
