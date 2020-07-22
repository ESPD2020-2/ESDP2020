import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function FAQ() {
    const classes = useStyles();

    const information = [
        {
            title: 'Как можно сделать заказ?',
            text: 'Заказ можно сделать на нашем сайте, заполнив форму заказа, а также по телефону,\n' +
                '\t\t\t\t\tчерез оператора. Если вы сделали заказ через сайт, то в течение 10 минут вам\n' +
                '\t\t\t\t\tперезвонить оператор и подтвердит заказ. Если же вы делаете заказ через оператора,\n' +
                '\t\t\t\t\tто все детали заказа будут обсуждаться во время этого разговора с оператором.'
        },
        {
            title: 'Сколько будет стоить доставка?',
            text: 'На сайте указаны цены, в зависимости от количества точек, которые нужно посетить\n' +
                '\t\t\t\t\tкурьеру, но в случае, если определить конкретную стоимость заказа окажется сложно,\n' +
                '\t\t\t\t\tто цену назовет наш оператор, при подтверждении заказа или уточнении его деталей.'
        },
        {
            title: 'Работает ли служба по выходным и праздникам?',
            text: 'Да, мы принимаем заказы семь дней в неделю, без выходных и праздников.'
        },
        {
            title: 'А какие габариты могут быть у заказа?',
            text: 'Вес заказа - до 10 кг, а размеры: длина - 60 см, ширина - 60 см, высота - 60 см.'
        },
        {
            title: 'Возможна ли доставка на следующий день?',
            text: 'Да, на сайте можно выбрать вариант доставки "Ко времени", или сообщить оператору,\n' +
                '\t\t\t\t\tкогда он свяжется с вами для получения заказа, как именно вы хотите, чтобы ваш\n' +
                '\t\t\t\t\tзаказ был выполнен.'
        },
        {
            title: 'А с курьером можно карточкой расплатиться?',
            text: 'В настоящее время это невозможно, однако в будущем этот сервис будет\n' +
                '\t\t\t\t\tпредоставляться.'
        },
        {
            title: 'Вы принимаете возврат заказов?',
            text: 'Возврат заказа будет возможен в том случае, если содержимое заказа пострадает во\n' +
                '\t\t\t\t\tвремя перевозки курьером.'
        },
        {
            title: 'Здесь нет ответа на мой вопрос.',
            text: 'Вы можете обратиться в нашу службу поддержки со всеми вопросами, ответы на\n' +
                '\t\t\t\t\tкоторые вы не нашли на сайте, по телефону:...'
        },
    ];

    return (
        <div className={classes.root}>
            <Typography align="center" variant="h3">Вопросы</Typography>
            {information.map((info, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                    >
                        <Typography className={classes.heading}>{info.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{info.text}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}