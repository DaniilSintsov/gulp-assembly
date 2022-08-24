// Основной модуль
import gulp from 'gulp'
// Импорт путей
import {path} from './gulp/config/path.js'
// Импорт общих плагинов
import {plugins} from './gulp/config/plugins.js'

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins,
}

// Импорт задач
import {copyFavicon} from './gulp/tasks/copyFavicon.js'
import {copyFiles} from './gulp/tasks/copyFiles.js'
import {copyVideo} from './gulp/tasks/copyVideo.js'
import {fontsStyle, otfToTtf, ttfToWoff} from './gulp/tasks/fonts.js'
import {ftp} from './gulp/tasks/ftp.js'
import {gitignore} from './gulp/tasks/gitignore.js'
import {html} from './gulp/tasks/html.js'
import {images} from './gulp/tasks/images.js'
import {js} from './gulp/tasks/js.js'
import {php} from './gulp/tasks/php.js'
import {reset} from './gulp/tasks/reset.js'
import {scss} from './gulp/tasks/scss.js'
import {server} from './gulp/tasks/server.js'
import {svgSprive} from './gulp/tasks/svgSprive.js'
import {zip} from './gulp/tasks/zip.js'

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.video, copyVideo)
  gulp.watch(path.watch.favicon, copyFavicon)
  gulp.watch(path.watch.files, copyFiles)
  gulp.watch(path.watch.html, html)
  gulp.watch(path.watch.php, php)
  gulp.watch(path.watch.scss, scss)
  gulp.watch(path.watch.js, js)
  gulp.watch(path.watch.images, images)
}

export {svgSprive}

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

// Основные задачи
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(
    copyVideo,
    copyFavicon,
    copyFiles,
    html,
    php,
    scss,
    js,
    images,
    gitignore
  )
)

// Построение сценариев выполнения задач
export const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
export const build = gulp.series(reset, mainTasks)
export const deployZIP = gulp.series(reset, mainTasks, zip)
export const deployFTP = gulp.series(reset, mainTasks, ftp)

// Выполнение сценария по умолчанию
gulp.task('default', dev)
