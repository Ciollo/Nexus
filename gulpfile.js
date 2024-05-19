const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
    return src('src/assets/sass/**/*.scss')
        .pipe(sass())
        .pipe(dest('src/assets/css'));
}

function watchTask() {
    watch(['src/assets/sass/**/*.scss'], buildStyles);
}

exports.default = series(buildStyles, watchTask);