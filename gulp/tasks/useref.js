var gulp = require('gulp'),
    config = require('../config').html,
    cleanCss = require('gulp-clean-css'),
    rev = require('gulp-rev'),
    useref = require('gulp-useref');

gulp.task('useref', function () {
  return gulp.src(config.src)
    .pipe(useref({
    	noAssets: true   // 只替换路径，不进行文件的合并
    }))
    .pipe(gulp.dest(config.dist));
});