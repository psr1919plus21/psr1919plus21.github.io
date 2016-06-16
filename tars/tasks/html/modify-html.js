'use strict';

const gulp = tars.packages.gulp;
const gulpif = tars.packages.gulpif;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

/**
 * Minify HTML (optional task)
 */
module.exports = () => {
    return gulp.task('html:modify-html', () => {
        const usersModifyOptions = require(tars.root + '/user-tasks/html/helpers/modify-options');
        const minifyOpts = Object.assign(
            tars.pluginsConfig['gulp-minify-html'],
            usersModifyOptions.minifyOpts
        );
        /* eslint-disable camelcase */
        const prettifyOpts = Object.assign(
            tars.pluginsConfig['gulp-html-prettify'],
            usersModifyOptions.prettifyOpts
        );
        /* eslint-enable camelcase */

        return gulp.src('./dev/**/*.html')
            .pipe(plumber({
                errorHandler(error) {
                    notifier.error('An error occurred while processing compiled html-files.', error);
                }
            }))
            .pipe(gulpif(
                tars.config.minifyHtml,
                tars.require('gulp-minify-html')(minifyOpts),
                tars.require('gulp-html-prettify')(prettifyOpts)
            ))
            .pipe(gulp.dest('./dev/'))
            .pipe(
                notifier.success('Compiled html\'ve been processed.')
            );
    });
};
