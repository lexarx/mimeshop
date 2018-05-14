jest.mock('api-request');
import React from 'react'
import CartPage from './cart-page'
import { mount } from 'enzyme'
import apiRequest from 'api-request'

test('displays cart page', async () => {
	apiRequest.mockImplementation((method, url) => {
		if (method === 'POST' && url === 'cart') {
			return {
				items: [
					{
						product: {
							id: '1',
							shortDescription: `Short description 1`,
							preview: 'http://via.placeholder.com/100?text=P1',
							price: 100.00
						},
						quantity: 1
					},
					{
						product: {
							id: '2',
							shortDescription: `Short description 2`,
							preview: 'http://via.placeholder.com/100?text=P2',
							price: 100.00
						},
						quantity: 2
					}
				],
				total: 300.00
			};
		}
	});
	const cartPage = mount(<div><CartPage/></div>);
	await new Promise(resolve => setTimeout(resolve, 0));
	cartPage.update();
	expect(cartPage).toMatchSnapshot();
});

test('navigates to product page', async () => {
	apiRequest.mockImplementation((method, url) => {
		if (method === 'POST' && url === 'cart') {
			return {
				items: [
					{
						product: {
							id: '1',
							shortDescription: `Short description 1`,
							preview: 'http://via.placeholder.com/100?text=P1',
							price: 100.00
						},
						quantity: 1
					}
				],
				total: 100.0
			};
		}
	});
	const navigate = jest.fn();
	const cartPage = mount(<div><CartPage navigate={navigate}/></div>);
	await new Promise(resolve => setTimeout(resolve, 0));
	cartPage.update();
	cartPage.find('img').simulate('click');
	expect(navigate).toHaveBeenCalledWith('/products/1');
});