var gulp = require('gulp'),
    config = require('../config').css,
    rename = require('gulp-rename'),
    minifyCss = require('gulp-clean-css');

gulp.task('minifyCss', ['concatCss'], function () {
  return gulp.src(config.dist + '/site.css')
	.pipe(rename({ suffix: '.min' }))
	.pipe(minifyCss())
	.pipe(gulp.dest(config.dist));
});