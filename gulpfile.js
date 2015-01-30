var rimraf = require('rimraf');
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sketch = require('gulp-sketch');
var browserify = require('browserify'); 

var server = {
  host: 'localhost',
  port: '8080'
}

gulp.task('sketch', function() {
  return gulp.src('./examples/assets/sketch/*.sketch')
    .pipe(
      sketch({
        export: 'slices',
        formats: 'png',
        outputJSON: 'index.json',
        saveForWeb: true,
        groupConentsOnly: true
      })
    )
    .pipe(gulp.dest('./examples/hiro-ui/images'));
});

gulp.task('webserver', function() {
  gulp.src( './' )
    .pipe(webserver({
      host: server.host,
      port: server.port,
      livereload: true
    }));
});

gulp.task('scripts', function() {
  gulp.src('./src/*.js')
    .pipe(gulp.dest('./dist/'))
})

gulp.task('watch', function() {
  gulp.watch('./examples/assets/sketch/*.sketch', ['sketch']);
  gulp.watch('./examples/hiro-ui/*.html');
  gulp.watch('./src/*.js', ['scripts']);
});

gulp.task('default', ['webserver', 'watch']);