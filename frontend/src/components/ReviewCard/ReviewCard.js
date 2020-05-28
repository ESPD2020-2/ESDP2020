import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  text: {
    advantages: {
      color: "green",
    },
    disadvantages: {
      color: "red",
    },
  },
});

const ReviewCard = (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.text.advantages} gutterBottom variant="h5">
            {props.advantages}
          </Typography>
          <Typography className={classes.text.disadvantages} gutterBottom variant="h5">
            {props.disadvantages}
          </Typography>
          <Typography gutterBottom variant="h5">
            {props.comment}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

};

ReviewCard.propTypes = {
  advantages: PropTypes.string,
  disadvantages: PropTypes.string,
  comment: PropTypes.string.isRequired,
};

export default ReviewCard;