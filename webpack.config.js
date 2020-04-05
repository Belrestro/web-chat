const path = require('path');

module.exports = {
  context: __dirname + '/ui',
  entry: __dirname + '/ui',
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              '@babel/env',
              '@babel/react',
            ],
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
};