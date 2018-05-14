const express = require('express');
const { startSession } = require('./sessions');
const bodyParser = require('body-parser');
const { products, getProduct } = require('./products');
const { addToCart, getCart, checkout } = require('./cart');

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.post('/start-session', (request, response) => {
	const session = startSession(request.body);
	response.send(session);
});
app.get('/products/:productId', (request, response) => {
	const product = getProduct(request.params.productId);
	response.send(product);
});
app.get('/products', (request, response) => {
	response.send(products);
});
app.post('/add-to-cart', (request, response) => {
	addToCart(request.body);
	response.send({});
});
app.post('/cart', (request, response) => {
	const cart = getCart(request.body);
	response.send(cart);
});
app.post('/checkout', (request, response) => {
	const cart = checkout(request.body);
	response.send(cart);
});

module.exports = app;