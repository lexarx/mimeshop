const { getSession } = require('./sessions');
const { getProduct } = require('./products');

function getCart(sessionId) {
	const session = getSession(sessionId);
	const cart = session.cart || [];
	const items = cart.map(item => ({
		product: getProduct(item.productId),
		quantity: item.quantity
	}));
	const total = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
	return {
		items,
		total
	};
}

module.exports = {
	addToCart({ productId, quantity, sessionId }) {
		if (!getProduct(productId)) {
			return;
		}

		const session = getSession(sessionId);
		if (!session.cart) {
			session.cart = [];
		}
		quantity = toNumber(quantity);
		const item = session.cart.find(item => item.productId === productId);
		if (item) {
			item.quantity += quantity;
		} else {
			session.cart.push({
				productId,
				quantity
			});
		}
	},

	getCart({ sessionId }) {
		return getCart(sessionId);
	},

	checkout({ sessionId }) {
		const session = getSession(sessionId);
		delete session.cart;
		return getCart(sessionId);
	}
};

function toNumber(quantity) {
	const number = Number(quantity);
	return isNaN(number) ? 0 : number;
}