var gulp = require('gulp'),
    changed = require('gulp-changed'),
    config = require('../config').html;

gulp.task('html', function () {
  return gulp.src(config.src)
      .pipe(changed(config.dist))
      .pipe(gulp.dest(config.dist));
});