var gulp = require('gulp');
var gp_rename = require('gulp-rename');
var jsonminify = require('gulp-jsonminify');
var paths = require('../paths');

gulp.task('json', ['minifyPlacesBg', 'minifyPlacesEn', 'minifyTagsEn', 'minifyTagsBg', 'minifyTypesEn', 'minifyTypesBg'], function(){
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

gulp.task('minifyTagsEn', function(){
    return gulp.src('places_tags_en.json')
        .pipe(jsonminify())
        .pipe(gp_rename('places_tags_min_en.json'))
        .pipe(gulp.dest('./data'));
});

gulp.task('minifyTagsBg', function(){
    return gulp.src('places_tags_bg.json')
        .pipe(jsonminify())
        .pipe(gp_rename('places_tags_min_bg.json'))
        .pipe(gulp.dest('./data'));
});

gulp.task('minifyTypesEn', function(){
    return gulp.src('places_types_en.json')
        .pipe(jsonminify())
        .pipe(gp_rename('places_types_min_en.json'))
        .pipe(gulp.dest('./data'));
});

gulp.task('minifyTypesBg', function(){
    return gulp.src('places_types_bg.json')
        .pipe(jsonminify())
        .pipe(gp_rename('places_types_min_bg.json'))
        .pipe(gulp.dest('./data'));
});
