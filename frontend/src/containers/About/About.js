import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from "@material-ui/core/useMediaQuery";

//icon import
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'left',
  },
  advantage: {
    backgroundColor: 'orange',
    padding: '10px 20px 0',
    textAlign: 'center',
    marginBottom: '5%',
    marginTop: '25px',
  },
  advantage__title: {
    color: 'black',
    fontSize: '22px',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  advantage__block: {
    paddingTop: '5%',
    textAlign: "center",
    backgroundColor: 'transparent'
  },
  iconStyle: {
    fontSize: '40px',
    color: 'white'
  },

  description: {
    color: 'white',
    padding: '5% 25%',
  },
  text__theme: {
    color: 'orange',
    fontSize: '16px',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  text__description: {
    paddingTop: '20px',
  },
  team__description:{
    padding: '3% 5%',
  }

}));

export default function About() {
  const classes = useStyles();
  const matches = useMediaQuery('(display:none)');

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container wrap="nowrap" spacing={5}>

          <Grid item lg>
            <Typography variant="h6" gutterBottom className={classes.text__theme}>
              О нас
            </Typography>
            <Typography variant="h4" gutterBottom className={classes.advantage__title} style={{marginTop: '10%'}}>
              Все легко и просто
            </Typography>
            <Typography className={classes.text__description}>
              Абсолютно каждому человеку важно питаться регулярно, чтобы всегда быть в тонусе. А с учетом
              растущего ритма жизни в Бишкеке это просто необходимость! Поэтому мы разработали и запустили сервис
              доставки по Бишкеку Namba Food. Он позволяет не только вовремя и регулярно питаться всегда вкусной,
              горячей и разнообразной едой. И при этом, не тратить время на ее приготовление. Но и заказывать свежие
              продукты из супермаркетов, медикаменты из аптек, еду для Ваших питомцев. А услуга "личный курьер" легко
              решит проблемы с доставкой:

              Если у вас интернет-магазин, инста - магазин, ресторан и любой другой бизнес
              Цветов, подарков и посылок Вашим родным и близким
              Деловой корреспонденции, важных документов, срочных пакетов из рук в руки и многого другого, доставку
              которого Вам необходимо осуществить.</Typography>
          </Grid>
          <Grid item xs md={6} style={{textAlign: 'center'}}>
            <img src="https://www.groovypost.com/wp-content/uploads/2016/12/ms-teams-review.png" alt="team"/>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} style={{textAlign: 'center'}}>
        <Typography className={classes.advantage__title} variant="h4" gutterBottom>
          Преимущества
        </Typography>
        <Grid container xs className={classes.advantage}>
          <Grid item xs style={{textAlign: 'center'}}>
            <Paper className={classes.advantage__block} elevation={0}>
              <LiveHelpIcon className={classes.iconStyle}/>
              <Typography className={classes.description}>
                полный контроль процесса заказа от приема до выдaчи кypьepy
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.advantage__block} elevation={0}>
              <DesktopWindowsIcon className={classes.iconStyle}/>
              <Typography className={classes.description}>
                полный контроль процесса заказа от приема до выдaчи кypьepy
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.advantage__block} elevation={0}>
              <CardGiftcardIcon className={classes.iconStyle}/>
              <Typography className={classes.description}>
                полный контроль процесса заказа от приема до выдaчи кypьepy
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      <Grid container direction="column" justify="center" alignItems="center" style={{textAlign: 'center'}}>
        <Grid item>
          <Typography className={classes.advantage__title} variant="h4" gutterBottom>
            Команда
          </Typography>
          <Typography className={classes.team__description}>
            Каждый человек в нашей команде профессионал в своем деле и настоящий гурман. И все мы сходимся в одном
            мнении: "Самое дорогое - это время". Только на одних суши, пиццах и фаст-фуде долго не протянешь, особенно,
            когда не всегда есть время готовить самостоятельно.</Typography>
        </Grid>
        <Grid item>
          <img src="https://squalio.com/wp-content/uploads/2018/08/Teams.png" alt="team"/>
        </Grid>
      </Grid>
    </div>
  );
}
