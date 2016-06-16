'use strict';

const watcherLog = tars.helpers.watcherLog;

/**
 * Watch for components' css-files
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        `markup/${tars.config.fs.componentsFolderName}/**/*.${tars.cssPreproc.ext}`,
        Object.assign(tars.options.watch, {
            ignored: [
                `markup/${tars.config.fs.componentsFolderName}/**/ie8.${tars.cssPreproc.ext}`,
                `markup/${tars.config.fs.componentsFolderName}/**/ie9.${tars.cssPreproc.ext}`,
                `markup/${tars.config.fs.componentsFolderName}/**/ie8.css`,
                `markup/${tars.config.fs.componentsFolderName}/**/ie9.css`
            ]
        })
    ).on('all', (event, watchedPath) => {
        watcherLog(event, watchedPath);
        tars.packages.gulp.start('css:compile-css');

        if (tars.flags.ie8 || tars.flags.ie) {
            tars.packages.gulp.start('css:compile-css-for-ie8');
        }

        if (tars.flags.ie9 || tars.flags.ie) {
            tars.packages.gulp.start('css:compile-css-for-ie9');
        }
    });
};
