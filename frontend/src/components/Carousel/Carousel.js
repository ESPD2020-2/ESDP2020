import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const testReviews = [
    {
        name: 'Аман',
        review: 'Все сделали быстро, сервисом удовлетворен.',
    },
    {
        name: 'Максим',
        review:
            'Все сделали быстро',
    },
    {
        name: 'Нурлан',
        review:
            'Классная работа',
    },
    {
        name: 'Бактияр',
        review:
            'Все привезли вовремя',
    },
    {
        name: 'Алия',
        review:
            'Всем рекомендую',
    },
];

const testEvents = [
    {
        img: 'https://nambafood.kg/image_by_id/95258'
    },
    {
        img: 'https://nambafood.kg/image_by_id/95258'
    },
    {
        img: 'https://nambafood.kg/image_by_id/95258'
    },
    {
        img: 'https://nambafood.kg/image_by_id/95258'
    },
    {
        img: 'https://nambafood.kg/image_by_id/95258'
    },
];

const reviewStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
        margin: '0 auto'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
}));

const eventStyles = makeStyles(() => ({
    root: {
        width: '80%',
        flexGrow: 1,
        margin: '0 auto'
    },
    img: {
        height: '100%',
        display: 'block',
        overflow: 'hidden',
        width: '100%',
    },
}));

const cardStyles = makeStyles({
    card: {
        wordWrap: "break-word"
    },
    title: {
        fontSize: 14,
    },
});

function Carousel(props) {
    const reviewClasses = reviewStyles();
    const eventClasses = eventStyles();
    const cardClasses = cardStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = testReviews.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <>
            {props.type === 'events' ?
                <div className={eventClasses.root}>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {testEvents.map((step, index) => (
                            <div key={step.label}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <img className={eventClasses.img} src={step.img} alt="event"/>
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        variant="text"
                        activeStep={activeStep}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                Вперед
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                                Назад
                            </Button>
                        }
                    />
                </div> :
                <div className={reviewClasses.root}>
                    <Paper square elevation={0} className={reviewClasses.header}>
                        Отзывы о нашем сервисе
                    </Paper>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {testReviews.map((step, index) => ( //В дальнейшем вместо testReviews будет props.reviews
                            <div>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <Card className={cardClasses.card}>
                                        <CardContent>
                                            <Typography className={cardClasses.title} color="textSecondary"
                                                        gutterBottom>
                                                {step.name}
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {step.review}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        variant="text"
                        activeStep={activeStep}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                Вперед
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                                Назад
                            </Button>
                        }
                    />
                </div>
            }
        </>
    );
}

export default Carousel;