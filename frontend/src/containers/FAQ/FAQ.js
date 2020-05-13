import React from 'react';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
	faqTitle: {
		padding: '20px 0',
		fontWeight: 'bold'
	},
	hrLine: {
		border: '1px #ff5a5e solid',
	}
}));

const Faq = () => {
	const classes = useStyles();

	return (
		<Container>
			<Grid>
				<Typography variant="h3">Вопросы</Typography>
				<Typography className={classes.faqTitle} variant="h5">Как можно сделать заказ?</Typography>
				<p>Заказ можно сделать на нашем сайте, заполнив форму заказа, а также по телефону,
					через оператора. Если вы сделали заказ через сайт, то в течение 10 минут вам
					перезвонить оператор и подтвердит заказ. Если же вы делаете заказ через оператора,
					то все детали заказа будут обсуждаться во время этого разговора с оператором.</p>
				<hr className={classes.hrLine}/>
			</Grid>
			<Grid>
				<Typography className={classes.faqTitle} variant="h5">Сколько будет стоить доставка?</Typography>
				<p>На сайте указаны цены, в зависимости от количества точек, которые нужно посетить
					курьеру, но в случае, если определить конкретную стоимость заказа окажется сложно,
					то цену назовет наш оператор, при подтверждении заказа или уточнении его деталей.</p>
				<hr className={classes.hrLine}/>
			</Grid>
			<Grid>
				<Typography className={classes.faqTitle} variant="h5">Работает ли служба по выходным и праздникам?</Typography>
				<p>Да, мы принимаем заказы семь дней в неделю, без выходных и праздников.</p>
				<hr className={classes.hrLine}/>
			</Grid>
			<Grid>
				<Typography className={classes.faqTitle} variant="h5">А какие габариты могут быть у заказа?</Typography>
				<p>Вес заказа - до 10 кг, а размеры: длина - 60 см, ширина - 60 см, высота - 60 см.</p>
				<hr className={classes.hrLine}/>
			</Grid>
			<Grid>
				<Typography className={classes.faqTitle} variant="h5">Возможна ли доставка на следующий день?</Typography>
				<p>Да, на сайте можно выбрать вариант доставки "Ко времени", или сообщить оператору,
					когда он свяжется с вами для получения заказа, как именно вы хотите, чтобы ваш
					заказ был выполнен.</p>
				<hr className={classes.hrLine}/>
			</Grid>
			<Grid>
				<Typography className={classes.faqTitle} variant="h5">А с курьером можно карточкой расплатиться?</Typography>
				<p>В настоящее время это невозможно, однако в будущем этот сервис будет
					предоставляться.</p>
				<hr className={classes.hrLine}/>
			</Grid>
			<Grid>
				<Typography className={classes.faqTitle} variant="h5">Вы принимаете возврат заказов?</Typography>
				<p>Возврат заказа будет возможен в том случае, если содержимое заказа пострадает во
					время перевозки курьером.</p>
				<hr className={classes.hrLine}/>
			</Grid>
			<Grid>
				<Typography className={classes.faqTitle} variant="h5">Здесь нет ответа на мой вопрос.</Typography>
				<p>Вы можете обратиться в нашу службу поддержки со всеми вопросами, ответы на
					которые вы не нашли на сайте, по телефону:...</p>
				<hr className={classes.hrLine}/>
			</Grid>

		</Container>
	);
};

export default Faq;