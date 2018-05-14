const products = Array(10).fill(0).map((zero, index) => ({
	id: String(index),
	shortDescription: `Product ${index} short description`,
	longDescription: `Product ${index} long description`,
	preview: `http://via.placeholder.com/100?text=P${index}`,
	images: [
		`http://via.placeholder.com/600?text=Product ${index} image 1`,
		`http://via.placeholder.com/600?text=Product ${index} image 2`,
		`http://via.placeholder.com/600?text=Product ${index} image 3`
	],
	price: (1 + Math.random() * 99).toFixed(2)
}));

module.exports = {
	products,

	getProduct(productId) {
		return products.find(product => product.id === productId);
	}
};