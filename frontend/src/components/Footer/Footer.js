import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import RoomIcon from '@material-ui/icons/Room';
import Divider from "@material-ui/core/Divider";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" style={{paddingTop: '10px', color: 'white', textDecoration: 'none'}} >
      {'Copyright © '}
      <Link style={{color: 'white', textDecoration: 'none'}} href="http://deliveryforall.sytes.net/">
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
    backgroundColor: '#3f51b5 !important',
    color: theme.palette.common.white,
  },
  columns: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  linkHeader: {
    fontStyle: 'italic',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container>
        <Grid item container xs justify="space-evenly" spacing={0} className={classes.columns}>
          <Grid container item xs={4}>
            <Typography variant="h6" className={classes.linkHeader}>О компании</Typography>
            <Typography variant="body1" className={classes.phrase}>
              Delivery For All - Мы осуществляем доставки по всему Бишкеку.
            </Typography>
            <Typography variant="body1">Доверьтесь нам и мы позаботимся о вас!</Typography>
          </Grid>
          <Grid container item xs={3} direction="column">
            <Grid item>
              <Typography variant="h6" className={classes.linkHeader}>Контакты</Typography>
            </Grid>
            <Grid item xs container>
              <Link className={classes.link} href="tel:996772303303"><PhoneIcon/> +996 (772) 30-33-03</Link>
            </Grid>
            <Grid item xs container>
              <Link className={classes.link} href="tel:996772303303"><PhoneIcon/> +996 (700) 30-33-03</Link>
            </Grid>
            <Grid container item>
              <Grid item xs>
                <Link className={classes.link} href="mailto:example@gmail.com"><MailIcon/> example@gmail.com</Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item direction="column" xs={2}>
            <Grid item>
              <Typography variant="h6" className={classes.linkHeader} style={{paddingLeft: '5px'}}>Адрес</Typography>
            </Grid>
            <Grid container item>
              <Grid item>
                <RoomIcon />
              </Grid>
              <Grid item xs>
                <Typography variant="body1" className={classes.phrase}>
                  720000
                </Typography>
                <Typography variant="body1" className={classes.phrase}>
                  Кыргызская Республика
                </Typography>
                <Typography variant="body1" className={classes.phrase}>
                  ул. Фрунзе 1, офис 2
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider/>
        </Grid>
      </Grid>
      <Grid container item xs justify="center" style={{paddingTop: '15px'}}>
        <Copyright/>
      </Grid>
    </footer>
  );
};

export default Footer;