'use strict';

const gulp = tars.packages.gulp;
const concat = tars.packages.concat;
const streamCombiner = tars.packages.streamCombiner;
const plumber = tars.packages.plumber;
const gulpif = tars.packages.gulpif;
const rename = tars.packages.rename;
const sourcemaps = tars.packages.sourcemaps;
const notifier = tars.helpers.notifier;
const browserSync = tars.packages.browserSync;
const cwd = process.cwd();
const path = require('path');
let generateSourceMaps = false;
const staticFolderName = tars.config.fs.staticFolderName;
const destFolder = `./dev/${staticFolderName}/js`;
const compressJs = tars.flags.release || tars.flags.min;
const sourceMapsDest = tars.config.sourcemaps.js.inline ? '' : '.';
const jsPaths = [].concat.apply([], [
    `!./markup/${tars.config.fs.componentsFolderName}/**/data/data.js`,
    `!./markup/${tars.config.fs.componentsFolderName}/**/_*.js`,
    `./markup/${staticFolderName}/js/framework/**/*.js`,
    `./markup/${staticFolderName}/js/libraries/**/*.js`,
    `./markup/${staticFolderName}/js/plugins/**/*.js`,
    tars.config.js.jsPathsToConcatBeforeModulesJs,
    `./markup/${tars.config.fs.componentsFolderName}/**/*.js`,
    tars.config.js.jsPathsToConcatAfterModulesJs,
    `!./markup/${staticFolderName}/js/separate-js/**/*.js`
]);

/**
 * Stream of base processing with JavaScript.
 * ------------------------------------------
 * There are:
 *  - concat js files;
 *  - add hash like a suffix of filename;
 *  - write header in the start of main file;
 *  - write footer in the end of main file;
 *  - write source map;
 *  - write main file at fs.
 */
function base() {
    return streamCombiner(
        gulpif(tars.config.js.useBabel, tars.require('gulp-babel')({
            babelrc: path.resolve(cwd + '/.babelrc')
        })),
        concat({cwd: cwd, path: 'main.js'}),
        rename({ suffix: tars.options.build.hash }),
        gulpif(generateSourceMaps, sourcemaps.write(sourceMapsDest)),
        gulp.dest(destFolder)
    );
}

/**
 * Stream of minimized with JavaScript.
 * ------------------------------------
 * There are:
 *  - removing `console.log()` and `debug`;
 *  - uglified code;
 *  - add '.min' suffix for main file;
 *  - write source maps;
 *  - write main file at fs.
 */
function compress() {
    if (compressJs) {
        return streamCombiner(
            tars.require('gulp-uglify')(tars.pluginsConfig['gulp-uglify']),
            rename({ suffix: '.min' }),
            gulp.dest(destFolder)
        );
    }

    return tars.packages.gutil.noop();
}

module.exports = () => {
    /**
     * Task for processing with JavaScript files.
     * ------------------------------------------
     * There are:
     *  - call lint task;
     *  - prevent pipe breaking;
     *  - creation of stream;
     *  - init source maps;
     *  - base processing;
     *  - compress code;
     *  - notify about end of task;
     *  - reloading browser's page.
     */
    return gulp.task('js:concat-processing', () => {
        generateSourceMaps = tars.config.sourcemaps.js.active && tars.options.watch.isActive;

        return gulp.src(jsPaths, { base: cwd })
            .pipe(plumber({
                errorHandler(error) {
                    notifier.error('An error occurred while processing js-files.', error);
                }
            }))
            .pipe(gulpif(generateSourceMaps, sourcemaps.init()))
            .pipe(base())
            .pipe(compress())
            .pipe(notifier.success('JavaScript has been processed'))
            .pipe(browserSync.reload({ stream: true }));
    });
};
