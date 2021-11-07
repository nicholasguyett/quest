const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss_mixins = require("postcss-mixins");
const postcss_nested = require("postcss-nested");
const postcss_preset_env = require('postcss-preset-env');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const config = {
  plugins: [
    autoprefixer(),
    postcss_mixins(),
    postcss_nested(),
    postcss_preset_env(),

    !dev &&
    cssnano({
      preset: 'default'
    })
  ]
};

module.exports = config;
