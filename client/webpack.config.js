module.exports = {
    entry: './app/app.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
	resolve: {
    	modules: [
    		'.',
			'node_modules'
		]
	},
    output: {
        path: __dirname,
        filename: 'app-bundle.js'
    },
    devServer: {
		historyApiFallback: {
			rewrites: [
				{ from: /./, to: '/app/app.html' },
			]
        },
		proxy: {
			'/api': 'http://localhost:3000/'
		}
    }
};