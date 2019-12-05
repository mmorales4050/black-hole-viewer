import React, { Component } from 'react';
import {Button} from 'semantic-ui-react'
class Graph extends Component {
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
              console.log(xhr.responseText)

            }
          }
        }
        xhr.send(null);
    }

    renderGraph = () => {
      return <div>{this.state.graph}</div>
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

export default Graph;
