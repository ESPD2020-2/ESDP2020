import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddIcCallIcon from '@material-ui/icons/AddIcCall';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "4%",
        margin: 'auto',
        maxWidth: 450,
        height: 300
    },
    centerPaper: {
        padding: "3%",
        margin: 'auto',
        maxWidth: 480,
        height: 350
    },
    paperTitle: {
        fontWeight: 'bold',
        color: '#ff5a5e',
        paddingBottom: '20px'
    },
    phoneNumber: {
        paddingBottom: '20px',
        color: 'lightgreen'
    }
}));

const Contacts = () => {
    const classes = useStyles();

    return (
        <>
            <Container>
                <Typography align="center" variant="h3">Контакты</Typography>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"

                >
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>
                            <Typography className={classes.paperTitle} variant="h5">Наш адрес</Typography>
                            <p>
                                Кыргызская Республика, 720000 г. Бишкек,
                                ул. Фрунзе 1, офис 2</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>
                            <Typography className={classes.paperTitle} variant="h5">Заказ по телефонам</Typography>
                            <p>0551 303 303
                            </p>
                            <p>0551 303 303
                            </p>
                            <p>0551 303 303
                            </p>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>
                            <Typography className={classes.paperTitle} variant="h5">Для жалоб и предложений</Typography>
                            <b>Менеджер:</b>
                            <p>example@gmail.com
                            </p>
                            <p>+996 770 880 205
                            </p>
                        </Paper>
                    </Grid>
                </Grid>

            </Container>
        </>

    );
};

export default Contacts;