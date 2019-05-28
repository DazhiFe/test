var gulp = require('gulp'),
    changed = require('gulp-changed'),
    config = require('../config').css;

gulp.task('css', function () {
  return gulp.src([config.src, '!src/css/common.css', '!src/css/page.css'])
      .pipe(changed(config.dist))
      .pipe(gulp.dest(config.dist));
});