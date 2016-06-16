<p align="right">
English description | <a href="../ru/js-processing.md">Описание на русском</a>
</p>

# JS-processing

TARS supports two workflows for JavaScript-code processing:
* [concatenation all JavaScript-files into one bundle in specific order](js-concat-processing.md);
* [resolve dependencies between JavaScript-files (from TARS 1.7.0)](js-webpack-processing.md).

Both workflows support style- and error-checking with eslint. Config files for eslint are in the root folder: .eslintrc and .eslintignore. You can switch off eslint by using [js.lint config option in tars-config.js](options.md#lint)

ES6(ES.Next) syntax is supported by using [Babel](https://babeljs.io/).  Use option [useBabel](options.md#usebabel) to turn on the ES6(ES.Next) syntax (it is turned off by default). If you want to exclude some files from Babel processing you can add "babel_ignore_" to the begining of file name or add with file (or directory) to ignore in .babelrc in the root of the project. All JavaScript-files from folders static/framework, static/libraries, static/plugins and static/separate-js are ignored in babelrs by default. All config for Babel is in project root. See the [babel options](https://babeljs.io/docs/usage/options/), except for sourcemap and filename which is handled for you. 

You can manage with sourcemaps from [builder-config](#sourcemaps).

