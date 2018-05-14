jest.mock('api-request');
jest.mock('add-to-cart-form/add-to-cart-form', () => () => 'Add to cart form');
import React from 'react'
import ProductsList from 'products-list/products-list'
import { mount } from 'enzyme'
import apiRequest from 'api-request'

test('displays products list', async () => {
	apiRequest.mockImplementation((method, url) => {
		if (method === 'GET' && url === 'products') {
			return [
				{
					id: '1',
					shortDescription: `Short description 1`,
					preview: 'http://via.placeholder.com/100?text=P1',
					price: 100.00
				},
				{
					id: '2',
					shortDescription: `Short description 2`,
					preview: 'http://via.placeholder.com/100?text=P2',
					price: 100.00
				}
			];
		}
	});
	const productsList = mount(<div><ProductsList/></div>);
	await new Promise(resolve => setTimeout(resolve, 0));
	productsList.update();
	expect(productsList).toMatchSnapshot();
});

test('navigates to product page', async () => {
	apiRequest.mockImplementation((method, url) => {
		if (method === 'GET' && url === 'products') {
			return [
				{
					id: '1',
					shortDescription: `Short description 1`,
					preview: 'http://via.placeholder.com/100?text=P1',
					price: 100.00
				}
			];
		}
	});
	const navigate = jest.fn();
	const productsList = mount(<div><ProductsList navigate={navigate}/></div>);
	await new Promise(resolve => setTimeout(resolve, 0));
	productsList.update();
	productsList.find('img').simulate('click');
	expect(navigate).toHaveBeenCalledWith('/products/1');
});