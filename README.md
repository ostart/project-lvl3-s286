# project-lvl3-s286

[![Maintainability](https://api.codeclimate.com/v1/badges/7030827fc5005bbb0f0e/maintainability)](https://codeclimate.com/github/ostart/project-lvl3-s286/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/7030827fc5005bbb0f0e/test_coverage)](https://codeclimate.com/github/ostart/project-lvl3-s286/test_coverage)

[![Build Status](https://travis-ci.org/ostart/project-lvl3-s286.svg?branch=master)](https://travis-ci.org/ostart/project-lvl3-s286)

# Загрузчик страниц (Третий проект на Hexlet.io)

В рамках данного проекта реализована утилита для скачивания указанного адреса из сети. Принцип ее работы очень похож на то, что делает браузер при сохранении страниц сайтов.

Возможности утилиты:

Можно указать папку, в которую нужно положить готовый файл
Утилита скачивает все ресурсы указанные на странице и меняет страницу так, что начинает ссылаться на локальные версии

Пример использования:
```
$ page-loader --output /var/tmp https://hexlet.io/courses

✔ https://ru.hexlet.io/lessons.rss
✔ https://ru.hexlet.io/assets/application.css
✔ https://ru.hexlet.io/assets/favicon.ico
✔ https://ru.hexlet.io/assets/favicon-196x196.png
✔ https://ru.hexlet.io/assets/favicon-96x96.png
✔ https://ru.hexlet.io/assets/favicon-32x32.png
✔ https://ru.hexlet.io/assets/favicon-16x16.png
✔ https://ru.hexlet.io/assets/favicon-128.png

Page was downloaded as 'ru-hexlet-io-courses.html'
```
## Install

`npm install -g pageLoader-ostart-js`

## Usage

```
Usage: page-loader [options] <urlLink>

For example: page-loader --output /var/tmp https://hexlet.io/courses

Download pages with sources in local folder.

Options:

-o, --output [folder]    output to local folder
```
