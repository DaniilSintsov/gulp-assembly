import fileInclude from 'gulp-file-include'
import pug from 'gulp-pug'
import versionNumber from 'gulp-version-number'
import webpHtmlNosvg from 'gulp-webp-html-nosvg'

import {configHtml} from '../config/settings.js'

export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'HTML',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(app.plugins.if(!configHtml.forPug, fileInclude()))
    .pipe(
      app.plugins.if(
        configHtml.forPug,
        pug({
          pretty: true,
          verbose: true,
        })
      )
    )
    .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: 'gulp/version.json',
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream())
}
