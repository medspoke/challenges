const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
  const resolvePath = subPath => path.resolve(__dirname, `../${subPath}`)

  const paths = {
    build: resolvePath('build'),
    entry: resolvePath('src/index.js'),
    template: resolvePath('src/index.template.html'),
    src: resolvePath('src'),
    favicon: resolvePath('src/images/favicon.ico'),
  }

  const sassLoader = {
    loader: 'sass-loader',
  }

  const cssLoader = {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: {
        localIdentName: "[name]__[local]___[hash:base64:5]",
        context: paths.src
      }
    },
  }

  const extractPlugin = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: paths.build,
      hmr: true,
    },
  }

  const rules = [
    {
      test: /\.html$/,
      use: {
        loader: "html-loader",
        options: {
          minimize: true
        }
      }
    },
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /\.s?css$/,
      use: [extractPlugin, cssLoader, sassLoader],
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      exclude: [/\.s?css$/],
      use: ["file-loader"]
    },
    {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    }
  ]

  const plugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.template,
      favicon: paths.favicon
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ]
  return (
    {
      entry: paths.entry,
      mode: "development",
      output: {
        publicPath: 'http://localhost:8080',
        path: paths.build,
        filename: '[name].js',
      },
      plugins,
      context: paths.src,
      resolve: {
        modules: [
          paths.src,
          'node_modules',
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
      devServer: {
        contentBase: path.join(__dirname, "../build", "../src"), // TODO: check
        compress: true,
        port: 8080,
        watchContentBase: true,
        progress: true,
        hot: true,
        inline: true,
        historyApiFallback: true
      },
      module: { rules }
    }
  )
}
