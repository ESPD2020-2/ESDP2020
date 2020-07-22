import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchReviews} from "../../store/actions/reviewActions";
import Grid from "@material-ui/core/Grid";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import PostAddIcon from '@material-ui/icons/PostAdd';
import ShowTo from "../../hoc/ShowTo";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrap: {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '0 16px',
    },
  },
  titleWrap: {
    [theme.breakpoints.down('xs')]: {
      boxShadow: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      border: '1px solid rgba(0, 0, 0, 0.23)',
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      top: '-20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#fff'
    },
    [theme.breakpoints.down('xs')]: {
      padding: "20px 0",
      textAlign: 'center'
    }
  },
  button: {
    margin: theme.spacing(2),
  },
  buttonWrap: {
    textAlign: 'right',
    paddingTop: '20px',
    marginBottom: '-30px',
  },
  reviewsList: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: "0px"
    },
  },
}));

const Reviews = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const reviews = useSelector(state => state.reviews.reviews);
  const user = useSelector((state) => state.users.user);

  useEffect( () => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <>
      <Grid item container direction="column" alignItems="center" className={classes.wrap}>
        <Grid item xs={10}>
          <Paper elevation={3} className={classes.titleWrap}>
            <Box className={classes.title}>
              <Typography variant="h4">Отзывы о службе доставки</Typography>
            </Box>
            <Box className={classes.buttonWrap}>
              <ShowTo user={user} role="user">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<PostAddIcon />}
                  component={Link}
                  to={"/add-review"}
                >
                  Оставить свой отзыв
                </Button>
              </ShowTo>
            </Box>
            <Box className={classes.reviewsList} mt={5} mb={2} mx={2}>
              {reviews && reviews.map(review => (
                <ReviewCard
                  key={review._id}
                  reviewNumber={review.reviewNumber}
                  customer={review.customer && review.customer}
                  advantages={review.advantages}
                  disadvantages={review.disadvantages}
                  comment={review.comment}
                  postedAt={review.postedAt}
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Reviews;