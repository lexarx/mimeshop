jest.mock('api-request');
jest.mock('session/session');
import React from 'react'
import AddToCartForm from './add-to-cart-form'
import { mount, render } from 'enzyme'
import apiRequest from 'api-request'
import { getSessionId } from 'session/session';

test('displays add to cart form', () => {
	const addToCartForm = render(<AddToCartForm/>);
	expect(addToCartForm).toMatchSnapshot();
});

test('sends server request', () => {
	const addToCardForm = mount(<AddToCartForm productId="123"/>);
	const quantity = addToCardForm.find('input');
	quantity.instance().value = '5';
	quantity.simulate('change');
	apiRequest.mockReturnValue({});
	getSessionId.mockReturnValue('s1');
	addToCardForm.find('button').simulate('click');
	expect(apiRequest).toHaveBeenCalledWith('POST', 'add-to-cart', {
		productId: '123',
		quantity: '5',
		sessionId: 's1'
	});
});