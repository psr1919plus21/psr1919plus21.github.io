<p align="right">
English description | <a href="../ru/css-manual-processing.md">Описание на русском</a>
</p>

# CSS manual processing

This workflow will be usefull, if you need to control css-processing by yourself. You can use manual css-processing in TARS fro mversion 1.8.0

Основные точки входа, файлы стилей, в которые будут импортироваться стили вашего проекта, находятся в папке static/scss/entry. По умолчанию там уже находится одна точка входа — main.scss Вы можете добавить еще точек входа, если вам это потребуется. Именно эти файлы будут компилироваться препроцессором. Файлы вашего проекта необходимо подключать в точки входа с помощью конструкции @import.

Подключение точки входа по умолчанию (main) уже описано в шаблонах (components/head/). В случае добавления новых точек входа, их треубется подключать в шаблонах вручную.

Содержимое main.scss выглядит следующим образом:

```scss
@import '../normalize.scss';

/* Libraries, which is used in current project. */
@import 'partials/_libraries.scss';

/* Libraries, which is used in current project. */
@import 'built-in-partials/_service.scss';

/* Plugins, which is used in current project. */
@import 'partials/_plugins.scss';

/* Components, which is used in current project. */
@import 'partials/_components.scss';

/* Additional style files. */
@import '../etc/etc.scss';
```

В точку входа импортируется normalize.scss, затем партиал, в который вы можете импортировать библиотеки, затем встроенные партиалы (различные миксины для правильной работы с графикой в проекте и т.д.), партиал с плагинами, партиал с компонентами и другие стили.

Партиал с компонентами означает, что именно в этот файл вы будете импортировать стили своих компонентов. При этом вам не обязательно указывать относительный путь до стилей компонентов от файла партиала. Достаточно сделать так:

```scss
@import 'components/_template/_template.scss';
```

Подключение стилей для плагинов и библиотек из node_modules и bower_components описано в [общей доке по работе со стилями](css-processing.md).

Большая просьба: **не редактируйте файлы из директории built-in-partials, они могут быть перезаписаны в результате обновления проекта!**.

Также в entry есть директория ie, в которой вы можете добавить точки входа для ie8 и ie9. Точки входа для ie9 должны иметь суффикс _ie9, а для ie8 — _ie8.

Обратите внимание, для этих точек входа вам необходимо подключать стили компонентов, если они есть для этих браузеров. Нет необходимости дублировать содержимое _components и _components-ie9. В _components-ie9 должны быть только стили компонентов для ie9.

