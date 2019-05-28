var gulp = require('gulp');

gulp.task('favicon', function () {
  return gulp.src('./src/favicon.ico')
      .pipe(gulp.dest('./dist'));
});