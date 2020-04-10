const gulp = require('gulp');
const jsonminify = require('gulp-jsonminify');
const changed = require('gulp-changed');

gulp.task('minify', () => {
    return gulp.src(['../data/restaurants/*.json'])
        .pipe(changed('../dist/restaurants'))
        .pipe(jsonminify())
        .pipe(gulp.dest('../dist/restaurants'))
})