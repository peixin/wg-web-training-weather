const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


const getOptimization = (isProduction) => {
  let optimization = {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          minSize: 30000,
          minChunks: 1,
          enforce: true,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  };

  if (isProduction) {
    optimization['minimizer'] = [new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: !isProduction,
    }),
      new OptimizeCssAssetsPlugin({})
    ];
  }
  return optimization;
};

const getModules = (isProduction) => {
  return {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader',
            ]
          }

        }

      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            exclude: /node_modules/
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images'
        }
      }
    ]
  }
};

const getPlugins = (isProduction) => {
  let plugins = [
    new CopyPlugin([
      {from: './images', to: 'images'},
      {from: './images/favicon.ico', to: ''},
      {from: './weather_test_data.json', to: ''}
    ]),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'Weather',
      minify: isProduction,
    }),
  ];

  let prodPlugins = [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
  ];
  if (isProduction) {
    return plugins.concat(prodPlugins);
  }
  return plugins;
};

const getConfig = (isProduction) => {
  return {
    context: path.join(__dirname, 'src'),
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: '[name].js',
    },
    module: getModules(isProduction),
    plugins: getPlugins(isProduction),
    optimization: getOptimization(isProduction),
    resolve: {
      alias: {
        'Vue': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    },
    performance: {
      hints: false
    },
    profile: true,
    cache: true,
    watch: !isProduction,
    devtool: isProduction ? 'none' : 'inline-source-map',
  }
};

module.exports = getConfig(process.env.NODE_ENV === 'production');
