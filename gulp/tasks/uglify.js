var gulp = require('gulp'),
    config = require('../config').js,
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('uglify', ['concatJs'], function () {
  return gulp.src(config.dist + '/plugins.js')
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest(config.dist));
});