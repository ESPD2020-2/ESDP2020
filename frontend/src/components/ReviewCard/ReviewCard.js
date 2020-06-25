import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import moment from 'moment';
import "moment/locale/ru";
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';

const useStyles = makeStyles({
  root: {
    width: '100%',
    // minWidth: 400,
    margin: '10px auto',
  },
  userName: {
    fontWeight: 'bold',
  },
  titleContainer: {
    paddingTop: '5px',
    paddingBottom: '15px',
  },
  date: {
    fontSize: '14px',
    fontStyle: 'italic',
    color: 'rgba(0,0,0,0.5)',
  },
  number: {
    fontSize: '14px',
  },
  paragraph: {
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  advantages: {
    color: "green",
  },
  disadvantages: {
    color: "red",
  },
  boldText: {
    fontWeight: 'bold',
  },
});

const ReviewCard = ({reviewNumber, customer, advantages, disadvantages, comment, postedAt}) => {
  const classes = useStyles();

  const date = moment(postedAt).calendar();
  moment.locale("ru");

  return (
    <Grid item xs>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Grid container direction="row" spacing={2}>
            <Grid container justify='space-between' className={classes.titleContainer}>
              <Grid item xs={12} sm={5} md={6}>
                <Typography className={classes.userName}>
                  {`${customer.name} ${customer.surname} ${customer.patronymic}`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3} md>
                <Typography className={classes.date}>
                  <CalendarTodayOutlinedIcon style={{fontSize: 18, paddingRight: '3px', verticalAlign: 'text-bottom'}}/>
                  {date}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2} md={1}>
                <Typography className={classes.number}>
                  #{`${reviewNumber}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify='flex-start' alignItems='center' className={classes.paragraph}>
              <Grid item xs={12} sm={3} md={2}>
                <Typography gutterBottom variant="body2" className={`${classes.advantages} ${classes.boldText}`}>
                  Достоинства
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9} md={10}>
                <Typography gutterBottom variant="body2" className={classes.advantages}>
                  {advantages}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify='flex-start' alignItems='center' className={classes.paragraph}>
              <Grid item xs={12} sm={3} md={2}>
                <Typography gutterBottom variant="body2" className={`${classes.disadvantages} ${classes.boldText}`}>
                  Недостатки
                </Typography>
              </Grid>
              <Grid item xs sm md>
                <Typography gutterBottom variant="body2" className={classes.disadvantages}>
                  {disadvantages}
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems='flex-start' className={classes.paragraph}>
              <Grid item xs={12} sm={3} md={2}>
                <Typography gutterBottom variant="body2" className={classes.boldText}>
                  Комментарии
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9} md={10}>
                <Typography gutterBottom variant="body2" component="p">
                  {comment}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ReviewCard;