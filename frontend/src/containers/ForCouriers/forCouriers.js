import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
//img
import time from '../../assets/images/time.png'
import courier from '../../assets/images/courier.png'
import pro from '../../assets/images/pro.png'
//icon
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({

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
  imgBlock:{
    textAlign: 'center',
  },

  description: {
    color: 'black',
    padding: '5% 25%',
  },
  text__theme: {
    color: 'orange',
    fontSize: '16px',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  text__description: {
    padding: '20px 0 10%',
    fontSize:'18px',
  },

  paragraph: {
    width: '70%',
    alignSelf: 'center',
    padding: '0 10%',
  },
  btn:{
    backgroundColor:'orange',
    color: 'white',
  }

}));

export default function ForCouriers() {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper} elevation={0}>
        <Grid container wrap="nowrap" spacing={5}>

          <Grid item lg>
            <Typography variant="h6" gutterBottom className={classes.text__theme}>
              Как стать курьером
            </Typography>
            <Typography variant="h4" gutterBottom className={classes.advantage__title} style={{marginTop: '10%'}}>
              Будь частью нашей команды
            </Typography>
            <Typography className={classes.text__description}>
              Хорошо знаете город, готовы много двигаться и ищете дополнительный заработок?
              Тогда приходите к нам!
              Удобное расписание, достойный заработок, ежедневная оплата - это то, что мы
              предлагаем нашим курьерам.</Typography>

            <Button variant="contained" className={classes.btn}>
              Отправить заявку
            </Button>
          </Grid>
          <Grid item xs md={6} style={{textAlign: 'center'}}>
            <img src="https://image.freepik.com/free-vector/superhero-delivery-service_80802-298.jpg" alt="team"/>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.time} elevation={0}>

        <Grid container wrap="nowrap">
          <Box item xs className={classes.imgBlock}>
            <img src={time} alt="time" style={{width:'50%'}}/>
          </Box>
          <Box item lg className={classes.paragraph}>

            <Typography variant="p">
              Мы принимаем заявки постоянно, все дни недели, будни и праздники - мы работаем! А
              значит, у вас будет свободный выбор, в какой день или в какое время брать заказы на
              доставку. Это прекрасная возможность для студентов, молодых мам, пенсионеров и
              других активных людей.</Typography>

          </Box>

        </Grid>
      </Paper>

      <Paper className={classes.time} elevation={0}>

        <Grid container wrap="nowrap">

          <Box item lg className={classes.paragraph}>

            <Typography variant="p">
              Ваш заработок будет зависеть только от вас, ваших усилий и вашего времени, ведь
              мы подбираем наиболее короткие маршруты, чтобы наши курьеры тратили как можно
              меньше времени и могли доставить как можно больше заказов.</Typography>

          </Box>
          <Box item xs className={classes.imgBlock}>
            <img src={courier} alt="time" style={{width:'80%'}}/>
          </Box>
        </Grid>
      </Paper>

      <Paper className={classes.time} elevation={0}>

        <Grid container wrap="nowrap">
          <Box item xs className={classes.imgBlock}>
            <img src={pro} alt="time" style={{width:'60%'}}/>
          </Box>
          <Box item lg className={classes.paragraph}>

            <Typography variant="p">
              Каждый человек в нашей команде профессионал в своем деле и настоящий гурман. И все мы сходимся в одном
              мнении: "Самое дорогое - это время". Только на одних суши, пиццах и фаст-фуде долго не протянешь, особенно,
              когда не всегда есть время готовить самостоятельно.</Typography>

          </Box>

        </Grid>
      </Paper>

        <Paper style={{textAlign:'center', margin:'5% 0',background:'orange'}}>
          <Typography variant="h4">Наши требовния:</Typography>
      <Grid container style={{padding:'5%'}}>
        <Grid item xs style={{margin:'0 3%',background:'white',textAlign:'center'}}>
          <Typography variant="p">Совершеннолетие кандидата.</Typography>
        </Grid>
        <Grid item xs style={{margin:'0 3%',background:'white',textAlign:'center'}}>
          <Typography variant="p">Знание города и умение быстро по нему передвигаться.</Typography>
        </Grid>
        <Grid item xs style={{margin:'0 3%',background:'white',textAlign:'center'}}>
          <Typography variant="p">Вежливость, пунктуальность, приятный и аккуратный внешний вид.</Typography>
        </Grid>
        <Grid item xs style={{margin:'0 3%',background:'white',textAlign:'center'}}>
          <Typography variant="p">елефон или планшет с доступом в интернет и мессенджером (Viber, WhatsApp,
            Telegram) для оперативной связи.</Typography>
        </Grid>
      </Grid>
          <Typography variant='p' style={{color:'white',paddingBottom:'20px'}}>
            Все остальное, а именно: ваш пол, опыт работы курьером, прическа, любимый цвет,
            принадлежность к политической партии или склонность к просмотру какого-нибудь
            сериала, не имеют значения!
          </Typography>
        </Paper>

      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={4}>
          <Box pt={2} pb={2}>
            <Typography variant="h6">Что нужно, чтобы устроиться курьером в нашей службе доставки?
              Зарегистрируйтесь на сайте, используя свою свежую фотографию (чтобы мы знали
              вас в лицо!) в качестве аватара, прикрепите свои паспортные данные (копию паспорта)
              и ждите: мы обязательно свяжемся с вами по электронной почте.</Typography>
          </Box>
        </Grid>
      </Grid>

    </>
  );
}
