import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TemporaryDrawer from './TemporaryDrawer'
import WelcomePage from './WelcomePage'
import Papa from 'papaparse';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const useEffect = React.useEffect
  const useState = React.useState
  const [open, setOpen] = useState(false)
  const [inputOpen, setInputOpen] = useState(false)
  const [comFile, setComFile] = useState(null)
  const [graphFile, setGraphFile] = useState(null)
  const [selection, setSelection] = useState([]) // Used to display top 50 brightest lines
  const [data, setData] = useState([]) // Data for graph


  const updateApp = (inputState) => {
    let selection = comFile.data.filter((item) => {
      return parseFloat(item[1]) === parseFloat(inputState.agn) && parseFloat(item[2]) === parseFloat(inputState.z) && parseFloat(item[3]) === parseFloat(inputState.n) && parseFloat(item[4]) === parseFloat(inputState.r) && parseFloat(item[5]) === parseFloat(inputState.nh)
    })
    if(selection.length === 0) {
      // Warn user that input is invalid
      console.log("invalid input")
    }else {
      console.log("Graph updated")
      // update graph and top 50 brightest lines
      let file = fileName(selection[0])
      setSelection(selection[0])
      setGraphFile(file)
      getData(file)
    }
  }

  const fileName = (selection) => {
    // Create file name from selection
    let zeros = 9 - selection[0].length
    // debugger
    let file = "grid" + "0".repeat(zeros) + selection[0]
    if(selection[2] === "1") {
      file += "_Z_1_n_"
    } else {
      file += "_Z_0p1_n_"
    }
    file += selection[3] + "_" + selection[1] + "per.con"
    // Set configuration file to state
    return ("data/" + file)
  }

  const getData = file => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file , true);
    // If specified, responseType must be empty string or "text"
    xhr.responseType = 'text';

    xhr.onload = () => {
      if (xhr.readyState === xhr.DONE && this.state.graphContents !== xhr.responseText) {
          if (xhr.status === 200) {
              this.setData(extractData(xhr.responseText))
            }
          }
        }
        xhr.send(null);
  }

  const extractData = graph => {
    graph = graph.split(/(\s+)/).filter((value) => {
      return value.includes("e") && value.length > 6 && !value.includes("i")
    })

    // extract data that will be graphed
    let data_set = []
    let data_point = {}
    let counter = 0
    let nu_counter = 0
    let total_counter = 6
    let max_x = 0
    let min_x = graph[0]
    let min_y = graph[6]
    let max_y = 0
    graph.forEach((value) => {
      if(counter - nu_counter === 0) {
        nu_counter += 9
        data_point.x = Number(value)
        if(Number(value) > max_x) {
          max_x = Number(value)
        }
        if(Number(value) < min_x) {
          min_x = Number(value)
        }
      }
      if(counter - total_counter === 0) {
        total_counter += 9
        data_point.y = Number(value)
        data_set.push([data_point.x, data_point.y])
        data_point = {}
        if(Number(value) > max_y) {
          max_y = Number(value)
        }
        if(Number(value) < min_y) {
          min_y = Number(value)
        }
      }
      counter ++
    })
    return data_set
  }

  useEffect(() => {
    Papa.parse("combinedFile.csv", {
      download: true,
      complete: (results) => {
          setComFile(results)
       }
    })
  })

  const toggleInput = (open) => {
    setInputOpen(open)
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  };

  const handleDrawerClose = () => {
    setOpen(false)
  };

  const drawer = () => {
    return <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Graph
          </Typography>
          <TemporaryDrawer
            updateApp={updateApp}
            inputOpen={inputOpen} toggleInput={toggleInput}/>
        </Toolbar>
      </AppBar>
      {drawer()}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <WelcomePage toggleInput={toggleInput}/>
      </main>
    </div>
  );
}
