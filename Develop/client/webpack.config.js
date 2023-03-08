const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
const workboxPlugin = new InjectManifest({
  swSrc: './src/sw.js',
});

const manifestPlugin = new WebpackPwaManifest({
  name: 'My PWA App',
  short_name: 'PWA',
  start_url: '/',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#2b2b2b',
  icons: [
    {
      src: path.resolve('src/img/icon.png'),
      sizes: [96, 128, 192, 256, 384, 512],
      destination: path.join('icons'),
    },
  ],
});

// TODO: Add CSS loaders and babel to webpack.
const cssRules = [
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
];

const babelRules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  },
];

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [manifestPlugin, workboxPlugin, new HtmlWebpackPlugin()],

    module: {
      rules: [...cssRules, ...babelRules],
    },
  };
};
