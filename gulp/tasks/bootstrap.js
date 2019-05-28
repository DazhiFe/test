var gulp = require('gulp'),
    changed = require('gulp-changed'),
    config = require('../config').bootstrap;

gulp.task('bootstrap', function () {
  return gulp.src(config.src)
      .pipe(changed(config.dist))
      .pipe(gulp.dest(config.dist));
});