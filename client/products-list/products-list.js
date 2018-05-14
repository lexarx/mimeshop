import React, { Component } from 'react'
import productsListStyles from './products-list.css'
import apiRequest from 'api-request';
import AddToCartForm from 'add-to-cart-form/add-to-cart-form'

export default class ProductsList extends Component {
	constructor() {
		super();
		this.state = {};
	}

	async componentDidMount() {
		const products = await apiRequest('GET', 'products');
		this.setState({ products });
	}

	render() {
		if (!this.state.products) {
			return null;
		}

		return this.state.products.map(product => {
			const showProductPage = () => this.props.navigate(`/products/${product.id}`);
			return (
				<div key={product.id} className={productsListStyles.product}>
					<img className={productsListStyles.image} src={product.preview} onClick={showProductPage}/>
					<div className={productsListStyles.shortDescription} onClick={showProductPage}>
						{product.shortDescription}
					</div>
					<div className={productsListStyles.price}>Price: {product.price}</div>
					<AddToCartForm productId={product.id}/>
				</div>
			);
		});
	}
}