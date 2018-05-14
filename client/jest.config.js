module.exports = {
	automock: false,
	testMatch: ['**/*-test.js'],
	setupFiles: ['./jest-setup.js'],
	transform: {
		'\\.css$': 'jest-css-modules-transform',
		'\\.js$': 'babel-jest'
	},
	testURL: 'http://mimeshop/',
	snapshotSerializers: ['enzyme-to-json/serializer'],
	modulePaths: [
		'.',
		'node_modules'
	]
};