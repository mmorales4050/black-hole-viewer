import React, { Component } from 'react';
import {Button, Header, Grid} from 'semantic-ui-react'
import Graph from './Graph'

class GraphContainer extends Component {

  render() {
    return (
      <Grid textAlign='center' style={{width:"100%"}}>
      <Grid.Row>
      {this.props.data === "" ? null :
      <Graph data={this.props.data}/>
      //   this.state.toggle ?
      //   <Graph graph={this.state.graph}/> :
      //   <Graph1 graph={this.state.graph}/>
      }
      </Grid.Row>
      <Grid.Row>
      <a href={this.props.graphFile} download >
      <Button>
      Download Configuration File
      </Button>
      </a>
      </Grid.Row>
      </Grid>
    );
  }

}

export default GraphContainer;
