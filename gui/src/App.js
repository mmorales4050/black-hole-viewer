import React from 'react';
import './App.css';
import { Button, Divider, Form, Grid, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'



function App() {
  return (
    <Grid container columns={3} divided relaxed stackable>
      <Grid.Column>
      <Header as='h3' textAlign='center'>
    Input Form
    </Header>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
      <Header as='h3' textAlign='center'>
    Graph
    </Header>
      </Grid.Column>
      <Grid.Column verticalAlign='middle'>
      <Header as='h3' textAlign='center'>
    Top 50 Brightest lines
    </Header>
      </Grid.Column>
    </Grid>
  );
}

export default App;
