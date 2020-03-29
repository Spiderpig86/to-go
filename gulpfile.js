const gulp = require('gulp');
const jsonminify = require('gulp-jsonminify');

gulp.task('minify', () => {
    return gulp.src(['./data/restaurants.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('dist'))
})