var gulp = require('gulp'),
    config = require('../config').css,
    configJs = require('../config').js,
    configRev = require('../config').rev,
    concat = require('gulp-concat'),
    order = require('gulp-order'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');

gulp.task('concatCss', ['css'], function () {
  return gulp.src([
      'src/css/common.css',
      'src/css/page.css'
      //'src/css/**/*.css'
    ])
    .pipe(concat('site.css'))
    // .pipe(rename({ suffix: '.min' }))
    // .pipe(rev())  // 文件名加MD5后缀
    .pipe(gulp.dest(config.dist))
    // .pipe(rev.manifest())  // 生成一个rev-manifest.json
    // .pipe(gulp.dest(configRev.revCss));  // 将 rev-manifest.json 保存到 rev 目录内
});

// gulp.task('concatJs', ['js'], function () {
//   return gulp.src([
//       // 'src/js/lib/*.js',
//       'src/js/plugins/*.js'
//       // 'src/js/**/*.js'
//     ])
//     .pipe(concat('plugins.js'))
//     .pipe(gulp.dest(configJs.dist))
// });

gulp.task('rev', function () {
  return gulp.src([configRev.revJson,configRev.src])
      .pipe(revCollector({
      	replaceReved: true
      }))
      .pipe(gulp.dest(configRev.dist));
});