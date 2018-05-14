const api = require('./api');
const request = require('supertest');
const { products, getProduct } = require('./products');

test('starts session', async () => {
	const response = await request(api).post('/start-session');
	expect(response.body.sessionId).toBeTruthy();
});

test('uses existing session', async () => {
	const response = await request(api).post('/start-session');
	const sessionId = response.body.sessionId;
	const nextResponse = await request(api).post('/start-session').send({ sessionId });
	expect(nextResponse.body.sessionId).toEqual(sessionId);
});

test('returns products', async () => {
	const response = await request(api).get('/products');
	expect(response.body).toEqual(products);
});

test('returns products', async () => {
	const response = await request(api).get('/products');
	expect(response.body).toEqual(products);
});

test('returns single product', async () => {
	const response = await request(api).get('/products/0');
	expect(response.body).toEqual(getProduct('0'));
});

test('returns empty cart', async () => {
	const sessionResponse = await request(api).post('/start-session');
	const sessionId = sessionResponse.body.sessionId;
	const cartResponse = await request(api).post('/cart').send({ sessionId });
	expect(cartResponse.body).toEqual({
		items: [],
		total: 0
	});
});

test('adds product to cart', async () => {
	const sessionResponse = await request(api).post('/start-session');
	const sessionId = sessionResponse.body.sessionId;
	await request(api).post('/add-to-cart').send({
		productId: '0',
		quantity: 5,
		sessionId
	});
	const cartResponse = await request(api).post('/cart').send({ sessionId });
	expect(cartResponse.body).toEqual({
		items: [
			{
				product: getProduct('0'),
				quantity: 5
			}
		],
		total: getProduct('0').price * 5
	});
});

test('increases quantity of existing product in cart', async () => {
	const sessionResponse = await request(api).post('/start-session');
	const sessionId = sessionResponse.body.sessionId;
	await request(api).post('/add-to-cart').send({
		productId: '0',
		quantity: 5,
		sessionId
	});
	await request(api).post('/add-to-cart').send({
		productId: '0',
		quantity: 5,
		sessionId
	});
	const cartResponse = await request(api).post('/cart').send({ sessionId });
	expect(cartResponse.body).toEqual({
		items: [
			{
				product: getProduct('0'),
				quantity: 10
			}
		],
		total: getProduct('0').price * 10
	});
});

test('empties cart on checkout', async () => {
	const sessionResponse = await request(api).post('/start-session');
	const sessionId = sessionResponse.body.sessionId;
	await request(api).post('/add-to-cart').send({
		productId: '0',
		quantity: 5,
		sessionId
	});
	await request(api).post('/checkout').send({ sessionId });
	const cartResponse = await request(api).post('/cart').send({ sessionId });
	expect(cartResponse.body).toEqual({
		items: [],
		total: 0
	});
});