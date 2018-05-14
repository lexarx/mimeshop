jest.mock('api-request');
jest.mock('add-to-cart-form/add-to-cart-form', () => () => 'Add to cart form');
import React from 'react'
import ProductPage from 'product-page/product-page'
import { mount } from 'enzyme'
import apiRequest from 'api-request'

test('displays product page', async () => {
	apiRequest.mockImplementation((method, url) => {
		if (method === 'GET' && url === 'products/1') {
			return {
				id: '1',
				longDescription: `Long description`,
				images: [
					`http://via.placeholder.com/600?text=Product image 1`,
					`http://via.placeholder.com/600?text=Product image 2`,
					`http://via.placeholder.com/600?text=Product image 3`
				],
				price: 100.00
			};
		}
	});
	const productPage = mount(<div><ProductPage location="/products/1"/></div>);
	await new Promise(resolve => setTimeout(resolve, 0));
	productPage.update();
	expect(productPage).toMatchSnapshot();
});