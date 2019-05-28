var gulp = require('gulp'),
    config = require('../config').html,
    cheerio = require('gulp-cheerio');

gulp.task('htmlmin', function () {
  return gulp.src(config.src)
      .pipe(cheerio(function ($) {
            //$('script').remove();
            $('link[rel=stylesheet]').remove();
            //$('body').append('<script src="js/main.min.js"></script>');
            $('head').append('<link rel="stylesheet" href="css/main.min.css">');
        }))
      .pipe(gulp.dest(config.dist));
});