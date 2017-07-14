var gulp = require('gulp');
var sass = require('gulp-sass');
var flatten = require('gulp-flatten');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require("vinyl-source-stream");
var glob = require('glob');
var es = require('event-stream');
var imagemin = require('gulp-imagemin');

gulp.task('sass:compile', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(flatten())
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('sass:watch', ['css:replace'], function () {
  gulp.watch('./src/**/*.scss', ['css:replace']);
});

gulp.task('css:replace', ['sass:compile'], function() {
  gulp.src('./build/css/**')
  .pipe(gulp.dest('../foo/static/css'));
});

gulp.task('js:compile', function(done) {
    glob('./src/app/*.js', function(err, files) {
        if(err) done(err);

        var tasks = files.map(function(entry) {
          return browserify({
              entries: [entry]
          })
          .transform(babelify.configure({
              presets : ["es2015"]
          }))
          .bundle()
          .pipe(source(entry))
          .pipe(flatten())
          .pipe(gulp.dest('./build/js'));
      })
    es.merge(tasks).on('end', done);
  });
});

gulp.task('js:watch', ['js:replace'], function() {
  gulp.watch('./src/app/**/*.js', ['js:replace']);
});

gulp.task('js:replace', ['js:compile'], function() {
  gulp.src('./build/js/**')
  .pipe(gulp.dest('../foo/static/js'));
});

gulp.task('img', function() {
  gulp.src('src/static/img/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest('./build/img'));
});



gulp.task('replace-static', function() {
  gulp.src('./build/**')
  .pipe(gulp.dest('../foo/static'));
});

gulp.task('watch', ['sass:watch', 'js:watch']);

gulp.task('default', ['sass:compile', 'js:compile', 'img'], function() {
  gulp.run('replace-static');
});
