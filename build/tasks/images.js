var gulp = require('gulp');
var paths = require('../paths');

gulp.task('images', function(){
    return gulp.src(paths.img)
        .pipe(gulp.dest(paths.outputImg));
});