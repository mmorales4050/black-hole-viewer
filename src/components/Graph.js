import React, { Component } from 'react';
import {Button} from 'semantic-ui-react'
class Graph extends Component {
  // <a href="/favicon.ico" download >
  // download
  // </a>
  //
  renderButton = () => {
    if(this.props.selection.length > 0){
      // Create file name from selection
      let zeros = 9 - Number(this.props.selection[0])
      let file = "grid" + "0".repeat(zeros)
      if(this.props.selection[2] === "1") {
        file += "_Z_1_n_"
      } else {
        file += "_Z_0p1_n_"
      }
      file += this.props.selection[3] + "_" + this.props.selection[1] + "per.con"
      return <a href={"data/" + file} download >
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
