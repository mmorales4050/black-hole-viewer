import React, { Component } from 'react';
import {Button} from 'semantic-ui-react'
import Graph from './Graph'
class GraphContainer extends Component {
  state = {
    graph: "",
    graphFile: ""
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

    renderGraph = () => {
      let graph = this.state.graph
      graph = graph.split(/(\s+)/).filter((value) => {
        return value.includes("e") && value.length > 6
      })
      graph.shift()
      console.log(graph)
      return <Graph />
    }

  render() {
    return (
      <>
      {this.renderGraph()}
      <a href={this.state.graphFile} download >
      <Button>
      Download Configuration File
      </Button>
      </a>
      </>
    );
  }

}

export default GraphContainer;
