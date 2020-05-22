import React, {Component} from 'react';
import PharmacyForm from "../../components/PharmacyForm/PharmacyForm";
import {connect} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import {createProduct} from "../../store/actions/pharmacyActions";


const styles = theme => ({
	wrap: {
		[theme.breakpoints.up('sm')]: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			padding: '0 16px'
		},
		[theme.breakpoints.up('md')]: {
			maxWidth: "70%"
		}
	},
	titleWrap: {
		[theme.breakpoints.down('xs')]: {
			boxShadow: 'none',
		},
		[theme.breakpoints.up('sm')]: {
			border: '1px solid rgba(0, 0, 0, 0.23)',
		}
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
	formWrap: {
		[theme.breakpoints.down('xs')]: {
			paddingTop: "0px"
		}
	}

});

class NewProduct extends Component {
	componentDidMount() {
		this.props.fetchCategories();
	}

	createProduct = async (productData) => {
		await this.props.createProduct(productData);
		this.props.history.push('/');
	};

	render() {
		const { classes } = this.props;

		return (
			<>
				<Grid container direction='column' className={classes.wrap}>
						<Paper elevation={3} className={classes.titleWrap}>
							<Box className={classes.title}>
								<Typography variant="h4">Новое лекарство</Typography>
							</Box>
							<Box className={classes.formWrap} pt={5} pb={2} px={2}>
								<PharmacyForm
									onSubmit={this.createProduct}
									categories={this.props.categories}
								/>
							</Box>
						</Paper>
				</Grid>
			</>
		);
	}
}

const mapStateToProps = state => ({
	categories: state.categories.categories,
});

const mapDispatchToProps = dispatch => ({
	createProduct: productData => dispatch(createProduct(productData)),
	fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(NewProduct));
