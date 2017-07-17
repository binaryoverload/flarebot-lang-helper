var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var webpack = require('webpack');

gulp.task('styles', function () {
    gulp.src('sass/main.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
});

gulp.task("webpack", function (callback) {
    // run webpack
    webpack({
        entry: './public/js/app.js',
        output: {
            filename: './public/js/bundle.js'
        }
    }, function (err, stats) {
        callback();
    });
});

//Watch task
gulp.task('default', function () {
    gulp.watch('sass/main.sass', ['styles']);
    gulp.watch('**/*.js', ['webpack'])
});