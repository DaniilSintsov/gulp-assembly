import browsersync from 'browser-sync'
import ifPlugin from 'gulp-if'
import newer from 'gulp-newer'
import notify from 'gulp-notify'
import plumber from 'gulp-plumber'

// Экспортируем объект
export const plugins = {
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  if: ifPlugin,
}
