jest.mock('products-list/products-list', () => () => 'ProductList');
jest.mock('product-page/product-page', () => () => 'ProductPage');
jest.mock('cart-page/cart-page', () => () => 'CartPage');
import React from 'react'
import Page from 'page/page'
import { render } from 'enzyme'

test('displays products list', () => {
	history.pushState(undefined, undefined, '/');
	const page = render(<Page/>);
	expect(page).toMatchSnapshot();
});

test('displays products list', () => {
	history.pushState(undefined, undefined, '/products');
	const page = render(<Page/>);
	expect(page).toMatchSnapshot();
});

test('displays product page', () => {
	history.pushState(undefined, undefined, '/products/0');
	const page = render(<Page/>);
	expect(page).toMatchSnapshot();
});

test('displays cart page', () => {
	history.pushState(undefined, undefined, '/cart');
	const page = render(<Page/>);
	expect(page).toMatchSnapshot();
});