var gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    changed = require('gulp-changed'),
    config = require('../config').html;

gulp.task('fileinclude', function () {
  return gulp.src(config.all)
      // .pipe(changed(config.dist))
      .pipe(fileinclude({
      	prefix: '@@',	
      	basepath: '@file'
      }))
      .pipe(gulp.dest(config.dist));
});