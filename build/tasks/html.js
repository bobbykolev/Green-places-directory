var gulp = require('gulp');
var ver = require('gulp-version-append');
var paths = require('../paths');

gulp.task('html', function(){
    return gulp.src(paths.html)
        .pipe(ver(['html', 'js', 'css']))
        .pipe(gulp.dest(paths.output));
});