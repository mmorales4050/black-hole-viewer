import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    textAlign: 'center'
  },
  button: {
    marginTop: "20px"
  }
}));

export default function PaperSheet() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        Welcome to Black Hole Viewer.
      </Typography>
      <Typography component="p">
        This is a tool for visualizing data associated with black holes.
      </Typography>
      <Button variant="contained" color="primary" className={classes.button}>Get Started</Button>
    </Paper>
  );
}
