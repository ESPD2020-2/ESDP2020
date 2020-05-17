import React from 'react';
import CourierImage from '../../assets/images/courier.jpeg';
import './ForCouriers.css';
import Grid from "@material-ui/core/Grid";
import ScheduleIcon from '@material-ui/icons/Schedule';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Typography from "@material-ui/core/Typography";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";

const ForCouriers = () => {
    return (
        <>
            <Grid container direction="column" spacing={2} className="forCouriers">
                <Grid item className="blockWithImage">
                    <Grid item className="textNearTheImage">
                        <Typography variant="h4">Как стать курьером</Typography>
                        <p>Хорошо знаете город, готовы много двигаться и ищете дополнительный заработок?
                            Тогда приходите к нам!
                            Удобное расписание, достойный заработок, ежедневная оплата - это то, что мы
                            предлагаем нашим курьерам.</p>
                    </Grid>
                    <Grid item xs>
                        <img src={CourierImage} alt="Courier img"/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justify="center" className="reasons">
                <Grid item xs={12} md={10} lg={4}>
                    <Grid container direction="column" spacing={10}>
                        <Grid item className="reason" xs>
                            <Typography variant="h5"><ScheduleIcon/>Удобное расписание</Typography>
                            <p>Мы принимаем заявки постоянно, все дни недели, будни и праздники - мы работаем! А
                                значит, у вас будет свободный выбор, в какой день или в какое время брать заказы на
                                доставку. Это прекрасная возможность для студентов, молодых мам, пенсионеров и
                                других активных людей.</p>
                        </Grid>
                        <Grid item className="reason">
                            <Typography variant="h5"><MonetizationOnIcon/>Достойный заработок</Typography>
                            <p>Ваш заработок будет зависеть только от вас, ваших усилий и вашего времени, ведь
                                мы подбираем наиболее короткие маршруты, чтобы наши курьеры тратили как можно
                                меньше времени и могли доставить как можно больше заказов.</p>
                        </Grid>
                        <Grid item className="reason">
                            <Typography variant="h5"><ThumbUpAltIcon/>Ежедневная оплата</Typography>
                            <p>Чтобы наше сотрудничество было выгодно и полезно для всех, мы предлагаем
                                ежедневную оплату. Выполнили заявку - и сразу получили за нее деньги.</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justify="center" className="list">
                <Grid item xs={12} md={10} lg={4}>
                    <Grid item xs>
                        <Box pt={2} pb={2}>
                            <Typography variant="h4">Наши требовния:</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <List>
                            <ListItem>
                                <ListItemText>
                                    1. Совершеннолетие кандидата.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    2. Знание города и умение быстро по нему передвигаться.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    3. Вежливость, пунктуальность, приятный и аккуратный внешний вид.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    4. Телефон или планшет с доступом в интернет и мессенджером (Viber, WhatsApp,
                                    Telegram) для оперативной связи.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Все остальное, а именно: ваш пол, опыт работы курьером, прическа, любимый цвет,
                                    принадлежность к политической партии или склонность к просмотру какого-нибудь
                                    сериала, не имеют значения!
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Grid>
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
};

export default ForCouriers;