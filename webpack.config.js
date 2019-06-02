const path = require('path')
const express = require('express')

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

// const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const styledComponentsTransformer = createStyledComponentsTransformer()

// const devEnvironmentAppConfig = require('./k8s/charts/route-manager-webapp/config/dev/config.json')

const ENTRY_POINT = './src/app/index.tsx'
const DEV_SERVER_PORT = 8000

const getProgressPluginReporter = () =>
  // by default ProgressPlugin writes progress in the same console line, hence we define line-by-line reporter for CI
  process.env.CI === 'true'
    ? (percentage, ...args) => {
        console.log(`${(percentage * 100).toFixed()}%`, ...args)
      }
    : undefined

const createCommonConfig = isProd => ({
  context: __dirname,
  entry: ENTRY_POINT,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.d.ts'],
    // prefer `module` to include ES6 modules and take adventage of tree-shaking
    // ref: https://webpack.js.org/configuration/resolve/#resolvemainfields
    // ref: https://github.com/rollup/rollup/wiki/pkg.module
    mainFields: ['module', 'browser', 'main'],
    plugins: [new TsConfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // prettier-ignore
        include: [
          /src/,
        ],
        exclude: [/node_modules/],
        use: [
          // {
          //   loader: 'thread-loader',
          //   options: {
          //     workers: require('os').cpus().length - (isProd ? 0 : 1), // leave 1 CPU for `fork-ts-checker-webpack-plugin` in development mode
          //     poolTimeout: isProd ? 2000 : Infinity, // set this to Infinity in watch mode, see https://github.com/webpack-contrib/thread-loader
          //   },
          // },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              // https://webpack.js.org/guides/build-performance/#typescript-loader
              transpileOnly: true,
              experimentalWatchApi: true,
              getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: 'svg-react-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  // prettier-ignore
  plugins: [
    new HtmlWebpackPlugin({ template: './src/app/index.html' })
  ]
})

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: ENTRY_POINT,
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom', // ref: https://github.com/gaearon/react-hot-loader#react--dom
    },
  },
  devServer: {
    port: DEV_SERVER_PORT,
    hot: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './'),
    // proxy: {
    //   '/api': { target: 'xxx', changeOrigin: true },
    // },
    setup(app) {
      app.use('/api/', express.static(path.join(__dirname, 'src', 'mocks')))
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    new ForkTsCheckerNotifierWebpackPlugin(),
    // define window.APP_CONFIG for development purposes
    new webpack.DefinePlugin({
      // 'window.APP_CONFIG': JSON.stringify(devEnvironmentAppConfig),
    }),
  ],
}

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    pathinfo: false, // https://webpack.js.org/guides/build-performance/#output-without-path-info
  },
  // prettier-ignore
  plugins: [
    new webpack.ProgressPlugin(getProgressPluginReporter()),
    // new CleanWebpackPlugin(),
  ]
}

module.exports = ({
  isProd = process.env.NODE_ENV === 'production',
  analyzeBundleSize = false,
} = {}) => {
  const additionalConfig = {
    plugins: [],
  }

  if (analyzeBundleSize) {
    additionalConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../webpack-bundle-report.html', // relative to ./dist/
      })
    )
  }

  return isProd
    ? webpackMerge(createCommonConfig(isProd), prodConfig, additionalConfig)
    : webpackMerge(createCommonConfig(isProd), devConfig, additionalConfig)
}
