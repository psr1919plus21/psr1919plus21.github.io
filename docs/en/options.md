<p align="right">
English description | <a href="../ru/options.md">Описание на русском</a>
</p>

# Options

All builder configuration is in one file — tars-config.js at the root of the project.

You need to restart the assembly to apply changes.

## Variable options

### postcss

Type: `Array`

Default: `[]`

Example: 
````javascript
postcss: [
        {
            name: 'postcss-short',
            options: {
                deny: ['text']
            }
        }, {
            name: 'postcss-size',
            options: {}
        }
    ]
````

You can set all used postprocessors. Do not forget to install them.

### svg

Type: `Object`

Config for working with SVG in TARS.

#### active

Type: `Boolean`

Default: `true`

Activate svg-processing.

#### workflow

Type: `String`

Default: `sprite`

Available workflows of working with SVG in TARS. You can use SVG-sprite `sprite` and SVG-symbols `symbols`.

**Build for IE8 won't be created then "symbols" is used**

#### symbolsConfig

Type: `Object`

Config for working with SVG then "symbols" workflow is selected.

##### loadingType

Type: `String`

Default: `inject`

This option set type of svg-symbols loading workflow.

You can set:
* inject into the page code — `inject`;
* just separate file — `separate-file`;
* separate file with link from each use to that file — `separate-file-with-link`.

##### usePolyfillForExternalSymbols

Type: `Boolean`

Default: `true`

SVG-symbols loading from separate file is supported in all modern browsers natively except IE9 - Edge. You have to use polyfill for them. If you do not support IE, you can set false to this option.

##### pathToExternalSymbolsFile

Type: `String`

Default: `''`

You can set a path to file with svg-symbols. File will be created in that directory, which was set in option. It will be created in the root of your build by default.

Possible value: `static/images/`.

### css

Type: `Object`

Config for CSS processing in TARS.

#### workflow

Type: `String`

Default: `concat`

Type of CSS-code processing.

You can set:
* `concat` — concatenation of all CSS-files into one budle in specific order;
* `manual` — you have to import all used files into entry points by yourself.

### js

Type: `Object`

Config for JavaScript processing in TARS.

#### workflow

Type: `String`

Default: `concat`

Type of JavaScript-code processing.

You can set:
* `concat` — concatenation of all JavaScript-files into one budle in specific order;
* `modular` — using bundler, which will resolve all dependencies between JavaScript-files.

#### bundler

Type: `String`

Default: `webpack`

You can specify bundler, if `modular` workflow is selected. You can choose only webpack at that moment.

#### lint

Type: `Boolean`

Default: `true`

Error checking in JavaScript-code and code-style (option for eslint are in the root, in `.eslintrc` file. Full list of available options can be found [here](http://eslint.org/)). Also, you can manually switch off linting of files and folders by using `.eslintignore` in the root of your project.

#### useBabel

Type: `Boolean`

Default: `false`

This option allow to use [Babel](https://babeljs.io/) for ES6(ES7) syntax support. Config for Babel is in project root, in `.babelrc`. See the [babel options](https://babeljs.io/docs/usage/options/), except for `sourcemaps` and `filename` which is handled for you by default.

#### webpack

Type: `Object`

You can switch on/off additional cool features for webpack.

##### useHMR

Type: `Boolean`

Default: `false`

Switch on/off [Hot module replacement](https://webpack.github.io/docs/hot-module-replacement.html).

#### removeConsoleLog

Type: `Boolean`

Default: `true`

Removing console.log and alert from js-files in the build. It's an option, because sometimes it is necessary to retain console.log in the ready build.

#### jsPathsToConcatBeforeModulesJs and jsPathsToConcatAfterModulesJs

Type: `Array of Strings`

Default: `[]`

This option makes sense in case of using concat workflow. In that case all JavaScript-code of the project is built into one file except JavaScript-files, which are located in a separate-js directory. If you want to include files into the build from other locations (for example, you create another folder for JavaScript-files), you can register in this option path or array of paths (patterns paths, such as 'controllers/\*\*/\*.js') to JavaScript-files, which must be connected into the build before components' JavaScript-files (jsPathsToConcatBeforeModulesJs) and JavaScript-files, which must be connected after components' JavaScript-files (jsPathsToConcatAfterModulesJs). 

It will be useful for when building a site on JavaScript-framework, with any its entities (controller, router, etc.). You do not need to go into tasks, just create a separate directory and specify for which files you want to watch.

Also you can disable eslint for these files (lintJsCodeBeforeModules and lintJsCodeAfterModules options).

### sourcemaps

Type: `Object`

Default: 
```javascript
sourcemaps: {
    js: {
        active: true,
        inline: true
    },
    css: {
        active: true,
        inline: true
    }
},
```

Config for sourcemaps. Sourcemaps for JavaScript and CSS work only in dev mode.
active {Boolean}: to use sourcemap or not.
inline {Boolean}: to use sourcemap inlined into source-file or to use separate file.

### notifyConfig

Config for notifications module.

When project files are changed there will be given a system notifications, which will indicate which file is changed and what task is executed.

#### useNotify

Type: `Boolean`

Default: `true`

Enabling of notification. You can disable notifications by using environment variables:
```bash
export DISABLE_NOTIFIER=true;
#or
export NODE_ENV=production;
```
Environment variables will overwrite useNotify value from tars-config.js

#### title

Type: `String`

Default: `'TARS notification'`

Each notification has a title. If you want to see another title, you should change this option.

#### sounds

Sounds during the notifications.

##### onSuccess

Type: `String, undefined`

Default: `undefined`

In this option the name of the system sound is passed which will be played during the notification in case of successful build. If you don't need the sounds, you can set it with `undefined` value.

##### onError

Type: `String, undefined`

Default: `undefined`

In this option the name of the system sound is passed which will be played during the notification in case of failed build. If you don't need the sounds, you can set it with `undefined` value.

### minifyHtml

Type: `Boolean`

Default: `false`

Enabling minifications for HTML. If is set to `false`, compiled html will be prettified.

### generateStaticPath

Type: `Boolean`

Default: `true`

This option turns on autogeneration of apth to static directory from current file. In case of using server or livereload, path to static won't ve generated, cause static files is served by server.

### buildPath

Type: `String`

Default: `'./builds/'`

You can set a string with relative or absolute path to the folder where the project should be built.
If you are using useBuildVersioning (use versioning of builds), each new build will be created in a separate folder with a name - the build version, and each folder will be created at the path specified in buildPath.

### useBuildVersioning

Type: `Boolean`

Default: `true`

Use build versioning. The name of the version consists of the build name + date of creation (accurate to second).

### useArchiver

Type: `Boolean`

Default: `true`

Creating the archive of the build. The archive is created in the folder with the build. If package.json given the project name, the archive will be called by that name, otherwise it will 'build' by default. There will also be added to date creation build (accurate to second).

### ulimit

Type: `Number`

Default: `4096`

By default, the number of simultaneously open files in the operating system (unixbased) is limited. Since the TARS working on Gulp, then the number of simultaneously open files may be large. To avoid problems with that, you can set [ulimit](http://ss64.com/bash/ulimit.html). If the project uses the large number of files and some of them do not fall into the final assembly, then you can just increase this option.

## Partially modifiable options

These options can be changed before the command `init` only, because they don't influence to any command, besides `useImagesForDisplayWithDpi`. More info below.

### templater

Type: `String`

Default: `handlebars`

Used template is specified in this option. `Jade` and `Handlebars` are available. The name of the template is sent in the option with a small letter.

If you want to write in plain HTML, retain the option unchanged.

### cssPreprocessor

Type: `String`

Default: `scss`

Used css-preprocessor is specified in this option. `Scss`, `Less` or `Stylus` are available. The name of the css-preprocessor is sent in the option with a lowercase letters.

### useImagesForDisplayWithDpi

Type: `Array`

Default: `[96]`

The pixel density of different screens, which will be supported by your project. Supported values are:

* 96 - 1 dppx (usuall screen)
* 192 - 2 dppx (retina)
* 288 - 3 dppx (for example, nexus 5)
* 384 - 4 dppx (for example, nexus 6)

On the basis of this option, a folder for png-images of different sizes for different screens is created. Read more in [images processing](images-processing.md) docs.

This option can be changed at any time, but there are a couple of important points. If this option is changed after `gulp|tars init`, it is necessary to create (or delete) directory in the 'static/img/sprite/' folder by hands. The format of the folder name - option value + dpi. For example, `192dpi`.

### fs

Options to name the main folders with static. If you change the option from the block before the command `gulp|tars init` or `gulp|tars re-init`, then nothing more not necessary to do. If this option is changed after `gulp|tars init` or `gulp|tars re-init`, it is necessary to rename the appropriate directories by hands.

#### staticFolderName

Type: `String`

Default: `'static'`

The name of the folder where statics of the the project will be. If you are developing a project locally, it is necessary that the value of this option matches with the value of [staticPrefix](#staticprefix) option.

#### imagesFolderName

Type: `String`

Default: `'img'`

The name of the folder where images of the the project will be. Most often  this folder has different names, so the name of this directory is optional.

#### componentsFolderName

Type: `String`

Default: `'components'`

The name of the folder where components (modules for TARS 1.7.0 and below) of the the project will be.

## Depricated

### useSVG

**Option is depricated! Use svg.active**

Type: `Boolean`

Default: `true`

Enabling svg-image support.

### staticPrefixForCss

**Option is depricated! Value is set in tars/tars.js**

Type: `String`

Default: `../imageFolderName/`

Custom path to the folder with the statics of the css-files. imageFolderName is taken from the [imagesFolderName](options.md#imagesFolderName) option.

### useJsLintAndHint

**Option has been renamed to [lint](#lint) and moved to js-config object.**

### autoprefixerConfig

Configuration for autoprefixer (read more here). In short, this module allows you not to write vendor prefixes. In this configuration you do not need to include IE8 and IE9, style assembly is done by another way for them . You can look here which browsers are available. If you do not want to use autoprefixer, pass in this option false value.

**Option was moved to plugins-config.json.**

### browserSyncConfig

Config for the Browsersync module. This module implements the possibility livereload in browser, sharing the markup to an external web, creating a local server.

#### baseDir
#### port
#### open
#### browser
#### startUrl
#### useNotifyInBrowser
#### injectChanges

**Option was moved to plugins-config.json. You can set any [option, which is supported by browsersync](https://www.browsersync.io/docs/options/).**

### staticPrefix

The value of this option sets the value of the placeholder %=static=% or __static__, which can be used in any project files.

%=staticPrefix=% prefix works, but this prefix is depricated! Use just %=static=% or __static__!

**Option is depricated! Value is set in tars/tars.js**
