import React, { Component } from 'react';
import {Button} from 'semantic-ui-react'
class Graph extends Component {
  // <a href="/favicon.ico" download >
  // download
  // </a>
  //
  renderButton = () => {
    if(this.props.selection.length > 0){
      let file
      console.log(this.props.selection)
      return <a href="/favicon.ico" download >
      <Button>
      Download Configuration File
      </Button>
      </a>
    }else{
      return null
    }
  }
  render() {
    return (
      <>{this.renderButton()}</>
    );
  }

}

export default Graph;
