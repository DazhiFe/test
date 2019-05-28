var gulp = require('gulp'),
    changed = require('gulp-changed'),
    config = require('../config').images;

gulp.task('images', function () {
  return gulp.src([config.src,'./src/favicon.ico'])
      .pipe(changed(config.dist))
      .pipe(gulp.dest(config.dist));
});