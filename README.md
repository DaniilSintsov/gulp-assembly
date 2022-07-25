# gulp assembly

![gulp](https://img.shields.io/npm/v/gulp?color=blue&label=gulp)
![webpack](https://img.shields.io/npm/v/webpack?color=green&label=webpack)

**gulp assembly** this is a gulp build to speed up the layout process

*gulp assembly* uses [gulp](https://gulpjs.com/) and [webpack](https://webpack.js.org/) and offers out-of-the-box customizable components for implementing interactive site elements

## Supported features

*gulp assembly* supports the following functions:

+ build .pug and .html files
+ build .scss files
+ build .js files, supports ES6 standard modules
+ work with .php files
+ automatically refresh the page in your browser
+ automatically connect and convert fonts
+ automatically minimize images and convert to webp format
+ create svg sprites
+ create .gitignore file
+ сreate a zip archive with the result of the layout
+ send a folder with the result of the layout to the server via FTP

## Folder structure

*gulp assembly* has a convenient folder structure:

+ :file_folder: gulp
  + :file_folder: config
  + :file_folder: tasks
+ :file_folder: src
  + :file_folder: files
  + :file_folder: fonts
  + :file_folder: html
  + :file_folder: img
  + :file_folder: js
    + :file_folder: includes
      + :file_folder: functions
        + :file_folder: forms
        + :file_folder: scroll
        + :file_folder: services
      + :file_folder: libs
    + :file_folder: userModules
  + :file_folder: php
  + :file_folder: scss
    + :file_folder: base
      + :file_folder: forms
    + :file_folder: fonts
    + :file_folder: libs
  + :file_folder: svgicons
  + :file_folder: video

## Usage

First, install the necessary dependencies using the command in the terminal:

`npm install`

Then you can run one of the five scripts:
+ `npm run dev` to run the build in development mode
+ `npm run build` to run the build in production mode
+ `npm run zip` to create a zip archive with the result of the layout
+ `npm run deploy` to send the folder with the result of the layout to the server via FTP
+ `npm run svgSprive` (yes, this is not a typo) to create a svg sprite

## Contributing

Bug reports and/or pull requests are welcome
