import React, { Component } from 'react'
import productPageStyles from './product-page.css'
import apiRequest from 'api-request';
import Carousel from 'nuka-carousel'
import AddToCartForm from 'add-to-cart-form/add-to-cart-form'

export default class ProductPage extends Component {
	constructor() {
		super();
		this.state = {};
	}

	async componentDidMount() {
		const product = await apiRequest('GET', `products/${this.getProductId()}`);
		this.setState({ product });
	}

	getProductId() {
		return this.props.location.split('/')[2];
	}

	render() {
		if (!this.state.product) {
			return null;
		}

		return [
			<Carousel className={productPageStyles.carousel} wrapAround={true}>
				{this.state.product.images.map(image => <img src={image} className={productPageStyles.image}/>)}
			</Carousel>,
			<div className={productPageStyles.longDescription}>{this.state.product.longDescription}</div>,
			<div className={productPageStyles.price}>Price: {this.state.product.price}</div>,
			<AddToCartForm productId={this.getProductId()}/>
		];
	}
}