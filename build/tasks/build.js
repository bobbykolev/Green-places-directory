var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function (cb) {
	return runSequence('clean',['app', 'libs', 'sass', 'images', 'html', 'json', 'moveManifest'], cb);
});