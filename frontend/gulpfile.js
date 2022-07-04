const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

let paths = {
    "styles": {
        "src": "./styles/**/*.scss",
        "dest": "./dist/styles"
    },
    "scripts": {
        "src": "./js/**/*.js",
        "dest": "./dist/js"
    }
}

function styles() {
    let plugins = [
        autoprefixer({ browsers: ['last 1 version'] }),
        cssnano()
    ];
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss(plugins))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
}

function js() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        proxy: '127.0.0.1:5500'
    });
    gulp.watch(paths.styles.src, gulp.series(styles));
    gulp.watch(paths.scripts.src, gulp.series(js));
    gulp.watch('./**/*.php').on('change', browserSync.reload);
}

exports.styles = styles;
exports.js = js;
exports.watch = watch;

let build = gulp.parallel(watch, styles, js);

exports.default = build;