var gulp = require('gulp'),
    config = require('../config').clean,
    clean = require('gulp-clean');

gulp.task('clean', function () {
  return gulp.src(config.src, {read: false})
      .pipe(clean());
});