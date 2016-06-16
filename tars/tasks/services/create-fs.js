'use strict';

const gulp = tars.packages.gulp;
const fs = require('fs');

const staticFolderName = tars.config.fs.staticFolderName;
const staticFolderPath = `markup/${staticFolderName}`;
const imagesFolderPath = `${staticFolderPath}/${tars.config.fs.imagesFolderName}`;

let paths = [
    `${staticFolderPath}/js/framework`,
    `${staticFolderPath}/js/libraries`,
    `${staticFolderPath}/js/plugins`,
    imagesFolderPath,
    `${imagesFolderPath}/content`,
    `${imagesFolderPath}/general`,
    `${imagesFolderPath}/plugins`,
    `${imagesFolderPath}/sprite`
];

tars.config.useImagesForDisplayWithDpi.forEach(dpiValue => {
    paths.push(`${imagesFolderPath}/sprite/${dpiValue}dpi`);
});

paths.push(
    `${imagesFolderPath}/svg`,
    `${staticFolderPath}/fonts`,
    `${staticFolderPath}/${tars.config.cssPreprocessor}`,
    `markup/${tars.config.fs.componentsFolderName}/_template/assets`,
    `markup/${tars.config.fs.componentsFolderName}/_template/ie`
);

/**
 * Create fs for project
 */
module.exports = () => {
    return gulp.task('service:create-fs', done => {
        const mkdirp = tars.require('mkdirp');

        if (staticFolderName !== 'static') {
            fs.renameSync('./markup/static/', `./markup/${staticFolderName}`);
        }

        paths.forEach(path => {
            mkdirp(path, error => {
                if (error) {
                    console.error(error);
                }
            });
        });

        done(null);
    });
};
