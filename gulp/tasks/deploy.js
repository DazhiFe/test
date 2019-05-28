var gulp = require('gulp');

gulp.task('deploy', ['clean'], function () {
  gulp.start('favicon', 'imagemin', 'minifyCss', 'js', /*'uglify',*/ 'useref');
});