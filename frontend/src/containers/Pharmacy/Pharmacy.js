import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchProducts} from "../../store/actions/pharmacyActions";
import {fetchCategories} from "../../store/actions/categoriesActions";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import {Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

class Pharmacy extends Component {
	componentDidMount() {
		this.props.fetchProducts(this.props.match.params.id);
		this.props.fetchCategories();
	}
	render() {
		return (
			<Container>
				<Typography variant='h3'>Лекарства</Typography>
					<Grid container justify='space-between' direction="row" spacing={1}>
						{this.props.products.map(product => (
							<MedicineCard
								key={product._id}
								title={product.title}
								id={product._id}
								price={product.price}
								image={product.image}
								description={product.description}
							/>


						))}
					</Grid>
			</Container>
		);
	}
}
const mapStateToProps = state => ({
	products: state.pharmacy.products,
	categories: state.categories.categories,
});

const mapDispatchToProps = dispatch => ({
	fetchProducts: categoryId => dispatch(fetchProducts(categoryId)),
	fetchCategories: () => dispatch(fetchCategories())
});


export default connect(mapStateToProps, mapDispatchToProps)(Pharmacy);
