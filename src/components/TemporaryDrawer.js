import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    agn: "",
    z: "",
    n: "",
    nh: "",
    logU: ""
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  const inputs = [
    {
      name: "agn",
      values: [0,5,10,20,40,60,80,100]
    },
    {
      name: "z",
      values: [1, 0.1]
    },
    {
      name: "n",
      values: [300, 1000]
    },
    {
      name: "nh",
      values: [20,21,22,23]
    }
  ]

  const handleChange = event => {
    setState({...state, [event.target.name]: event.target.value})
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
    >
    <List>

      {inputs.map((input, index) => (
        <FormControl className={classes.formControl} key={index}>
        <InputLabel id="demo-simple-select-label">{input.name.toUpperCase()}</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name={input.name}
            value={state[input.name]}
            onChange={handleChange}
          >
          {input.values.map((value, index) => {
            return <MenuItem key={index} value={value}>{value}</MenuItem>
          })}
      </Select>
      </FormControl>
      ))}
      <FormControl className={classes.formControl}>
       <TextField id="standard-basic" label="LogU" />
      </FormControl>
      <FormControl className={classes.formControl}>
      <Button variant="contained" color="primary">
        Submit
      </Button>
      </FormControl>
    </List>
    </div>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer('open', true)}edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Drawer open={state.open} onClose={toggleDrawer('open', false)}>
        {sideList('open')}
      </Drawer>
    </div>
  );
}