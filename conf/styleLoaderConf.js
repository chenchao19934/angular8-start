const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const _PROD_ = process.env.NODE_ENV === 'production'

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: _PROD_ ? false : true,
    plugins: [
      require('autoprefixer')({
        browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"]
      })
    ]
  }
}

const styleRules = [
  {
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          sourceMap: _PROD_ ? false : true,
        }
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: _PROD_ ? false : true,
        }
      },
      postcssLoader,
      {
        loader: 'less-loader',
        options: {
          sourceMap: _PROD_ ? false : true,
        }
      },
    ]
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          sourceMap: _PROD_ ? false : true,
        }
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: _PROD_ ? false : true,
        }
      },
      postcssLoader
    ]
  },
]

if (_PROD_) {
  styleRules.forEach(rule => {
    rule.use.splice(0, 1, MiniCssExtractPlugin.loader)
  })
}

module.exports = styleRules
