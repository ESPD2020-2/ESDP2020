import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link} from "react-router-dom";
import {apiURL} from "../../constants";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
	media: {
		height: 140,
		// [theme.breakpoints.down('sm')]: {
		// 	height: 100,
		// },
	},
	card: {
		width: '100%',
	},

}));


const MedicineCard = props => {
	const classes = useStyles();

	let image = apiURL + '/' + props.image;

	return (
		<Grid container item xs={6} sm={4} md={3} lg={3} style={{marginTop: '10px'}} justify="space-between">
			<Card className={classes.card} >
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={image}
						title={props.title}
					/>
					<CardContent>
						<Typography variant="h6">
							{props.title}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{props.description}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					{/*TODO нужно сделать корзину и эта кнопка добавит товар в корзину*/}
					<IconButton component={Link} to='/' size="small" color="primary" style={{marginRight: '10px'}}>
						В корзину
						<ShoppingBasketIcon/>
					</IconButton>
					<Typography>0{/*TODO количество товара добавленное в корзину*/}</Typography>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default MedicineCard;
