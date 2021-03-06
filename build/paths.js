var path = require('path');

var appRoot = './';
var vendors = './libs/';
var output = './prod/';

module.exports = {
  appRoot: appRoot,
  vendors: vendors,
  output: output,
  app: 'app/**/*',
  sassMain: appRoot + 'sass/style.scss',
  sass: appRoot + 'sass/**/*.scss',
  img: appRoot + 'img/**',
  html: appRoot + 'index.html',
  libs: vendors + '**/*',
  outputCss: output + 'css/',
  outputApp: output + 'app/',
  outputImg: output + 'img/',
  outputLibs: output + 'libs/'
};
