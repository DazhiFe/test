var gulp = require('gulp'),
    config = require('../config').clean,
    del = require('del');

gulp.task('del', function (cb) {
  return del([config.src], cb);
});