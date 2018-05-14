import React, { Component } from 'react'
import pageStyles from './page.css'
import classNames from 'classnames'
import ProductsList from 'products-list/products-list'
import ProductPage from 'product-page/product-page'
import CartPage from 'cart-page/cart-page'

export default class Page extends Component {
	constructor() {
		super();
		this.state = {
			location: location.pathname === '/' ? '/products' : location.pathname
		};
		this.popStateListener = () => this.setLocation(location.pathname);
	}

	setLocation(location) {
		this.setState({ location });
	}

	componentDidMount() {
		window.addEventListener('popstate', this.popStateListener);
	}

	componentWillUnmount() {
		window.removeEventListener('popstate', this.popStateListener);
	}

	render() {
		const navigate = url => this.navigate(url);
		return [
			<div className={pageStyles.header}>
				<span className={this.headerLinkClassNames('/products')} onClick={() => this.navigate('/products')}>
					Products
				</span>
				<span className={this.headerLinkClassNames('/cart')} onClick={() => this.navigate('/cart')}>Cart</span>
			</div>,
			this.state.location === '/products' && <ProductsList navigate={navigate}/>,
			this.state.location.startsWith('/products/') && <ProductPage location={this.state.location}/>,
			this.state.location === '/cart' && <CartPage navigate={navigate}/>,
		];
	}

	headerLinkClassNames(location) {
		return classNames(
			pageStyles.headerLink,
			this.state.location === location && pageStyles.currentHeaderLink
		);
	}

	navigate(url) {
		history.pushState(undefined, undefined, url);
		this.setLocation(url);
	}
}