var gulp = require('gulp'),
    changed = require('gulp-changed'),
    config = require('../config').js;

gulp.task('js', function () {
  return gulp.src([config.src/*,'!src/js/plugins','!src/js/plugins/**'*/])
      .pipe(changed(config.dist))
      .pipe(gulp.dest(config.dist));
});