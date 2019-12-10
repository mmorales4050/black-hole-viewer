import React, { Component } from 'react';
import {Button, Header} from 'semantic-ui-react'
import Graph from './Graph'

class GraphContainer extends Component {

  render() {
    return (
      <>
      <Header as='h3'>
    Graph {
      // this.state.toggle ? "2" : "1"
    }
    </Header>
      {this.props.data === "" ? null :
      <Graph data={this.props.data}/>
      //   this.state.toggle ?
      //   <Graph graph={this.state.graph}/> :
      //   <Graph1 graph={this.state.graph}/>
      }
      <a href={this.props.graphFile} download >
      <Button>
      Download Configuration File
      </Button>
      </a>
      {//<Button onClick={this.toggleGraph}>
      //Change Graph
      //</Button>
      }
      </>
    );
  }

}

export default GraphContainer;
