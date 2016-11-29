var gulp = require('gulp');
var compass = require('gulp-compass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var inject = require('gulp-inject');
var sass = require('gulp-sass');


gulp.task('compass', function () {

    var injectAppFiles = gulp.src('src/styles/*.scss', {
        read: false
    });

    function transformFilepath(filepath) {
        return '@import "' + filepath + '";';
    }

    var injectAppOptions = {
        transform: transformFilepath,
        starttag: '// inject:app',
        endtag: '// endinject',
        addRootSlash: false
    };
    /*return gulp.src('src/main.scss')
        .pipe(inject(injectAppFiles, injectAppOptions))
        .pipe(compass({
            css: 'dist/styles',
            sass: 'src',
            image: 'dist/images'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(cssnano())
        .pipe(sass())
        .pipe(gulp.dest('dist/styles'));*/
    return gulp.src('src/main.scss')
        .pipe(inject(injectAppFiles, injectAppOptions))
        .pipe(sass())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('traspaso-build', ['compass'], function () {
    var injectFiles = gulp.src(['dist/styles/main.css']);
    var injectOptions = {
        addRootSlash: false,
        ignorePath: ['src', 'dist']
    };
    return gulp.src(['src/index.html'])
        .pipe(inject(injectFiles, injectOptions))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['traspaso-build'], function () {});