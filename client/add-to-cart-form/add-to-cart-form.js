import React, { Component } from 'react'
import addToCartFormStyles from './add-to-cart-form.css'
import apiRequest from 'api-request';
import { getSessionId } from 'session/session';

export default class AddToCartForm extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return [
			<input
				className={addToCartFormStyles.quantity}
				placeholder="Quantity"
				value={this.state.quantity || ''}
				onChange={event => this.setState({ quantity: event.target.value })}
			/>,
			<button className={addToCartFormStyles.addButton} onClick={() => this.addToCart()}>Add to cart</button>
		];
	}

	addToCart() {
		apiRequest('POST', 'add-to-cart', {
			productId: this.props.productId,
			quantity: this.state.quantity,
			sessionId: getSessionId()
		});
	}
}