var gulp = require('gulp');
//var source = require('vinyl-source-stream');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var browserSync = require('browser-sync');
var argv = require('yargs').argv;
var development = !(argv.ENV === "production");

var paths = require('../paths');

gulp.task('app', function() {
    if (development) {
        gulp.watch(paths.app, ['app', browserSync.reload]);
    }

    //todo: uglify
    return gulp.src(paths.app)
        .pipe(gulpif(!development, gulpif(('**/*.js'), streamify(uglify()))))
        .pipe(gulp.dest(paths.outputApp));
});