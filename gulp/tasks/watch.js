var gulp = require('gulp'),
    watch = require('gulp-watch'),
    config = require('../config');

gulp.task('watch', function () {

  watch(config.sass.all, function(){  // 监听所有sass
    gulp.start('sass-dev');
  });

  // watch(config.html.all, function(){  // 监听所有html
  //   gulp.start('fileinclude');
  // });
});