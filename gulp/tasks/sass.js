var gulp = require('gulp'),
  sass = require('gulp-sass'),
  notify = require('gulp-notify'),
  autoprefixer = require('gulp-autoprefixer'),
  config = require('../config').sass,
  changed = require('gulp-changed'),
  plumber = require('gulp-plumber'),
  debug = require('gulp-debug'),
  handleErrors = require('../util/handleErrors');

gulp.task('sass-dev', function () {
  return gulp.src(config.src)               // sass 源文件
    .pipe(changed(config.dev, { extension: '.css' }))
    .pipe(debug({ title: '编译：' }))
    /*
     * 嵌套输出方式 nested
     * 展开输出方式 expanded 
     * 紧凑输出方式 compact 
     * 压缩输出方式 compressed
    */
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(sass({ outputStyle: 'expanded' }))   // 执行编译
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    // .on('error', handleErrors)     //交给notify处理错误
    .pipe(gulp.dest(config.dev))  // 输出目录
      /*.pipe(notify({ message: '样式编译成功！' }))*/;
});

gulp.task('sass', function () {
  return gulp.src(config.src)               // sass 源文件
    .pipe(changed(config.dist))
    /*
     * 嵌套输出方式 nested
     * 展开输出方式 expanded 
     * 紧凑输出方式 compact 
     * 压缩输出方式 compressed
    */
    .pipe(sass({ outputStyle: 'compressed' }))   // 执行编译
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .on('error', handleErrors)     //交给notify处理错误
    .pipe(gulp.dest(config.dist))  // 输出目录
      /*.pipe(notify({ message: '样式编译成功！' }))*/;
});