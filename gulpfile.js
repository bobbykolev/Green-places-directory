var gulp = require('gulp'),
    //gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    jsonminify = require('gulp-jsonminify');

gulp.task('minifyPlaces', function(){
    return gulp.src('places.json')
        .pipe(jsonminify())
        .pipe(gp_rename('placesMin.json'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['minifyPlaces'], function(){});