var gulp = require('gulp');
var compass = require('gulp-compass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var inject = require('gulp-inject');

var
    source = 'src/',
    dest = 'dist/';

var bootstrapSass = { in: './node_modules/bootstrap-sass/'
};

var fonts = { in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
    out: dest + 'styles/fonts/'
};

gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});


gulp.task('compass', ['fonts'], function () {
    return gulp.src([source + 'main.scss'])
        .pipe(compass({
            sass: source,
            css:dest + 'styles',
            import_path: bootstrapSass.in + 'assets/stylesheets'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(cssnano())
        .pipe(gulp.dest(dest + 'styles'));
});

gulp.task('traspaso-build', ['compass'], function () {
    var injectFiles = gulp.src([dest + 'styles/main.css']);
    var injectOptions = {
        addRootSlash: false,
        ignorePath: [source, dest]
    };
    return gulp.src([source + 'index.html'])
        .pipe(inject(injectFiles, injectOptions))
        .pipe(gulp.dest(dest));
});

gulp.task('default', ['traspaso-build'], function () {});