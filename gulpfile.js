var gulp = require('gulp'),
    //gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    jsonminify = require('gulp-jsonminify'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload');

gulp.task('minifyPlaces', function(){
    return gulp.src('places.json')
        .pipe(jsonminify())
        .pipe(gp_rename('placesMin.json'))
        .pipe(gulp.dest('./'));
});

gulp.task('compileSass', function(){
    return gulp.src('./sass/style.scss')
        .pipe(sass())
        .on('error', function (err) { console.log("[SASS]" + err.message); })
        .pipe(gulp.dest('./css'));
});

gulp.task('live', function() {
    gulp.src('./')
    .pipe(livereload());
});

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', ['compileSass']);
    gulp.watch('./places.json', ['minifyPlaces']);

    livereload.listen();
    gulp.watch('./**/*.*', ['live']);
});

gulp.task('default', ['minifyPlaces', 'compileSass', 'watch'], function(){});