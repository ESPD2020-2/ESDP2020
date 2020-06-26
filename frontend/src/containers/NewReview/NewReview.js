import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import {createReview} from "../../store/actions/reviewActions";

const useStyles = makeStyles((theme) => ({
  formWrap: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: "0px"
    }
  },
}));

const NewReview = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  const createReviewHandler = async (reviewData) => {
    if (reviewData.customerId) {
      await dispatch(createReview(reviewData));
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

    </div>
  );
};

export default NewReview;

// import React from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
// import Grid from '@material-ui/core/Grid';
// import Paper from "@material-ui/core/Paper";
// import {createReview} from "../../store/actions/reviewActions";
// import ReviewForm from "../../components/ReviewForm/ReviewForm";
//
// const useStyles = makeStyles((theme) => ({
//   wrap: {
//     [theme.breakpoints.up('sm')]: {
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       padding: '0 16px',
//     },
//   },
//   titleWrap: {
//     [theme.breakpoints.down('xs')]: {
//       boxShadow: 'none',
//     },
//     [theme.breakpoints.up('sm')]: {
//       border: '1px solid rgba(0, 0, 0, 0.23)',
//     }
//   },
//   title: {
//     [theme.breakpoints.up('sm')]: {
//       position: 'absolute',
//       top: '-20px',
//       left: '50%',
//       transform: 'translateX(-50%)',
//       backgroundColor: '#fff'
//     },
//     [theme.breakpoints.down('xs')]: {
//       padding: "20px 0",
//       textAlign: 'center'
//     }
//   },
//   formWrap: {
//     [theme.breakpoints.down('xs')]: {
//       paddingTop: "0px"
//     }
//   },
// }));
//
// const NewReview = () => {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.users.user);
//
//   const createReviewHandler = async (reviewData) => {
//     if (reviewData.customerId) {
//       await dispatch(createReview(reviewData));
//     }
//   };
//
//   return (
//     <>
//       <Grid container direction='column' alignItems='center' className={classes.wrap}>
//         <Grid item xs md={8} lg={5} xl={4}>
//           <Paper elevation={3} className={classes.titleWrap}>
//             <Box className={classes.title} px={1}>
//               <Typography variant="h4">Отзыв</Typography>
//             </Box>
//             <Box className={classes.formWrap} pt={5} pb={2}>
//               <ReviewForm
//                 create={createReviewHandler}
//                 user={user}
//               />
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </>
//   );
// };
//
// export default NewReview;