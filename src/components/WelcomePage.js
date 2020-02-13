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

export default function WelcomePage(props) {
  const classes = useStyles();

  const handleClick = event => {
    props.toggleInput(true)
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        Welcome to Black Hole Viewer.
      </Typography>
      <Typography component="p">
      This tool is used to simulate Galaxy Spectra in the JWST wavelength regime. These models use the spectral synthesis code, Cloudy, and employ an integrated modeling approach using photoionization and stellar population synthesis models in which both the line and emergent continuum is predicted from gas exposed to the ionizing radiation from a young starburst and an active galactic nuclei (AGN). The user can select the fraction of the total luminosity from the AGN, the gas density, the ionization parameter, gas phase metallicity, and stopping column density.  The tool generates the brightest predicted lines in the JWST wavelength regime and the transmitted continuum is plotted for download. <a href="https://ui.adsabs.harvard.edu/abs/2018ApJ...858...38S/abstract">Please see and reference Satyapal et al. 2018</a> for details.
      </Typography>
      <Typography component="p">
      This tool was developed by <a href="https://github.com/mmorales4050">Miguel Morales</a> and <a href="https://github.com/lincoln-howard-jr">Lincoln Howard</a>.
      </Typography>
      <Button onClick={handleClick} variant="contained" color="primary" className={classes.button}>Get Started</Button>
    </Paper>
  );
}
