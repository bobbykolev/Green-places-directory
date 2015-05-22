var gulp = require('gulp');
var gp_rename = require('gulp-rename');
var jsonminify = require('gulp-jsonminify');
var paths = require('../paths');

gulp.task('json', ['minifyPlacesBg', 'minifyPlacesEn'], function(){
    return gulp.src(['./data/*.json'])
        .pipe(gulp.dest(paths.output));
});

gulp.task('minifyPlacesBg', function(){
    return gulp.src('places_bg.json')
        .pipe(jsonminify())
        .pipe(gp_rename('places_min_bg.json'))
        .pipe(gulp.dest('./data'));
});

gulp.task('minifyPlacesEn', function(){
    return gulp.src('places_en.json')
        .pipe(jsonminify())
        .pipe(gp_rename('places_min_en.json'))
        .pipe(gulp.dest('./data'));
});
