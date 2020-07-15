import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {links} from "../../constants";
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import {Box} from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" style={{paddingTop: '10px'}}>
      {'Copyright © '}
      <Link color="inherit" href="http://deliveryforall.sytes.net/">
        Delivery For All
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%',
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  phrase: {
    color: '#3f51b5',
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container justify="space-around">
        <Grid item xs={1}>
          <Box/>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1" className={classes.phrase}>Delivery For All - Мы осуществляем доставки по всему
            городу!</Typography>
          <Copyright/>
        </Grid>
        <Grid item container xs={2} direction="column">
          {links.map((el) => (
            <Grid item xs>
              <Link
                button
                key={el.name}
                href={el.path}
                style={{textDecoration: 'none'}}
              >
                {el.name}
              </Link>
            </Grid>
          ))}
        </Grid>
        <Grid container item direction="column" xs={3}>
          <Grid container item direction="row">
            <Grid item xs={1}>
              <PhoneIcon/>
            </Grid>
            <Grid item xs>
              <Link style={{textDecoration: 'none'}} href="tel:996551303303">+996 (551) 30-33-03</Link>
            </Grid>
          </Grid>
          <Grid container item direction="row">
            <Grid item xs={1}>
              <PhoneIcon/>
            </Grid>
            <Grid item xs>
              <Link style={{textDecoration: 'none'}} href="tel:996772303303">+996 (772) 30-33-03</Link>
            </Grid>
          </Grid>
          <Grid container item direction="row">
            <Grid item xs={1}>
              <PhoneIcon/>
            </Grid>
            <Grid item xs>
              <Link style={{textDecoration: 'none'}} href="tel:996772303303">+996 (700) 30-33-03</Link>
            </Grid>
          </Grid>
          <Grid container item direction="row" style={{paddingTop: '10px'}}>
            <Grid item xs={1}>
              <MailIcon/>
            </Grid>
            <Grid item xs>
              <Link style={{textDecoration: 'none'}} href="mailto:example@gmail.com">example@gmail.com</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;