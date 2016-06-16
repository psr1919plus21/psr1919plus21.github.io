<p align="right">
English description | <a href="../ru/css-processing.md">Описание на русском</a>
</p>

# CSS

You can use folow CSS-preprocessors:
* [Scss](http://sass-lang.com) .sass extension is supported;
* [Less](http://www.lesscss.ru);
* [Stylus](http://learnboost.github.io/stylus)  

You can choose CSS-preprocessor in [tars-config.js](options.md#csspreprocessor).

In general, there are no surprises when using CSS-preprocessor. Use all the possibilities offered by the selected tool.

If you are used to the usual CSS, you can use CSS-syntax in any preprocessor.

TARS supports two workflows for CSS-code processing:
* [автоматическая склейка стилей сборщиком](css-concat-processing.md);
* [Ручное управление подключаемыми стилями](css-manual-processing.md).

All info below is general for both workflows.

Все, что описано ниже справедливо для обоих подходов.

All files with _ prefix won't be compiled by builder. You can use these files for importing. Actually, you can import all files, what you want, but if you include file without _ you will have two copies in compiled CSS-file. So, with is the reason, why files with _ prefix won't be compiled. You can import all type of styles files: scss (sass), less, styl, css.
Example of import using (scss):

```scss
// files are located in one directory
@import '_partial.scss';

// _partial.sass is located in neighbour directory partials
@import '../partials/_partial.sass';
```

If you need to include files from node_modules or bower_components, you do not have to write full path to node_modules, you can use short syntax, TARS will expand path like this:

```scss
@import 'bootstrap/dist/bootstrap.scss';
```

In case if that import TARS will try to find bootstrap/dist/bootstrap.scss in node_modules and bower_components. This feature is implemented in TARS from version 1.7.0

If you want to include the files from the static directory (pictures), you should use the placeholder %=static=%. Then including of the image as a background (in current example the picture will be taken from your main component) will be as follows (in this example scss is used):

```scss
.main {
    background: url('%=static=%assets/main/bg.png') repeat;
}
```

**%=staticPrefixForCss=% prefix works, but this prefix is depricated! Use just %=static=% or \_\_static\_\_! This prefixes work in TARS from version 1.6.0**

There are a couple of points on the organization scss|sass|less|styl-files (scss is selected):

* Each component has its own css-representation.
* Common styles for the project is recommended to put in common.scss in static/scss
* Included fonts' styles is in fonts.scss
* Mixins are in mixins.scss
* UI-elements styles are in GUI.scss
* Variables are in vars.scss
* Libraries styles are in static/scss/libraries (may contains sub-folders and css-files).
* Styles for plugins are in static/scss/plugins (may contains sub-folders and css-files).
* Styles that we don't now where determine have to be put in static/scss/etc/etc.{scss,css}.
* In the main folder with css (in this case, scss folder) you can not create new files (except when you correct task by yourselves connected with working with css). New files can be created only in the static/scss/plugins|libraries|etc|separate-css.

If you'd like to use library from bower- or npm-package, you can import stylies from package by using @import.

For IE8 and IE9 you can add fixes in a folder in the ie component folder. You need to create ie8.{scss,sass,css} or ie9.{scss,sass,css}.
