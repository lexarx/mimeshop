import React, { Component } from 'react'
import cartPageStyles from './cart-page.css'
import apiRequest from 'api-request';
import { getSessionId } from 'session/session';

export default class CartPage extends Component {
	constructor() {
		super();
		this.state = {};
	}

	async componentDidMount() {
		const cart = await apiRequest('POST', 'cart', {
			sessionId: getSessionId()
		});
		this.setState({ cart });
	}

	getProductId() {
		return this.props.location.split('/')[2];
	}

	render() {
		if (!this.state.cart) {
			return null;
		}

		if (this.state.cart.items.length === 0) {
			return 'Your shopping cart is empty.';
		}

		return [
			this.state.cart.items.map(item => {
				const showProductPage = () => this.props.navigate(`/products/${item.product.id}`);
				return (
					<div key={item.product.id} className={cartPageStyles.product}>
						<img className={cartPageStyles.image} src={item.product.preview} onClick={showProductPage}/>
						<div className={cartPageStyles.shortDescription} onClick={showProductPage}>
							{item.product.shortDescription}
						</div>
						<div className={cartPageStyles.quantity}>Quantity: {item.quantity}</div>
					</div>
				);
			}),
			<div className={cartPageStyles.total}>Total price: {this.state.cart.total}</div>,
			<button className={cartPageStyles.checkoutButton} onClick={() => this.checkout()}>Checkout</button>
		];
	}

	async checkout() {
		const cart = await apiRequest('POST', 'checkout', {
			sessionId: getSessionId()
		});
		this.setState({ cart });
	}
}