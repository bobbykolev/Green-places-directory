var gulp = require('gulp');
var browserSync = require('browser-sync');

//create a server instance at http://localhost:8888
gulp.task('server', ['build'], function(done) {
  browserSync({
    open: false,
    port: 9876,
    server: {
      baseDir: ['./dist/'],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});