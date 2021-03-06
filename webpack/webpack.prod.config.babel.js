import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import StatsWebpackPlugin from 'stats-webpack-plugin';

export default {
  context: path.resolve( __dirname, '..' ),
  entry: [
    './src/main.js',
    './src/stylesheets/main.scss'
  ],
  output: {
    path: path.join( __dirname, '..', 'dist' ),
    filename: '[name]-[hash].min.js'
  },
  resolve: {
    root: path.resolve( __dirname, '..', 'src' ),
    alias: {
      common: 'components/WebGLCommon',
      cannon: path.resolve( __dirname, '..', 'node_modules/cannon/src/Cannon.js' )
    },
    extensions: [
      '',
      '.js',
      '.jsx',
      '.json'
    ]
  },
  externals: {
    'TweenMax': 'TweenMax'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /node_modules/,
        loader: 'ify'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract( 'style', 'css!autoprefixer?browsers=last 2 version' )
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract( 'style', 'css!autoprefixer?browsers=last 2 version!sass' )
      },
      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        loader: 'raw!glslify'
      },
      {
        test: /splitText\.js$/,
        loader: 'imports?define=>false!exports?SplitText'
      },
      {
        test: /drawSvg\.js$/,
        loader: 'imports?define=>false!exports?SplitText'
      },
      {
        test: /\.dae$/,
        exclude: /node_modules/,
        loader: path.join( __dirname, 'loaders', 'spline-loader' )
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV ),
      '__DEV__': JSON.stringify( false ),
      '__PROD__': JSON.stringify( true ),
      '__PREZ__': JSON.stringify( false )
    }),
    new webpack.ProvidePlugin({
      'THREE': 'three',
      'React': 'react'
    }),
    new CopyWebpackPlugin( [
      { from: 'static' }
    ],
    { ignore: [ '.DS_Store', '.keep' ] }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        pure_funcs: [ 'console.log' ]
      }
    }),
    new ExtractTextPlugin( '[name]-[hash].min.css', { allChunks: true }),
    new CleanWebpackPlugin( [ 'dist' ], { root: path.join( __dirname , '..' ) }),
    new StatsWebpackPlugin( 'webpack.stats.json' )
  ]
};
