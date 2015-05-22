var gulp = require('gulp');
var source = require('vinyl-source-stream');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var gulpIgnore = require('gulp-ignore');
var argv = require('yargs').argv;
var development = !(argv.ENV === "production");

var paths = require('../paths');

gulp.task('libs', ['jsLibs', 'cssLibs'], function(){

});

gulp.task('jsLibs', function(){
    var condition = /animate.min.js|angular.min.js|angular-route.min.js|angular-touch.min.js|jquery.min.|angular-sanitize.min.js|angulartics.min.js|angulartics-ga.min.js/;

    return gulp.src(paths.libs)
        .pipe(gulpIgnore.include(condition))
        .pipe(gulp.dest(paths.outputLibs));
});

gulp.task('cssLibs', function(){
    var path = ['./libs/bootstrap/dist/**/*','./libs/font-awesome/css/**/*','./libs/font-awesome/fonts/**/*',];

    return gulp.src(path, { base: './libs' })
        .pipe(gulp.dest(paths.outputLibs));
});