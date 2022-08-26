import fs from 'fs'

export const gitignore = () => {
  if (!fs.existsSync('.gitignore')) {
    fs.writeFile('./.gitignore', '', cb)
    fs.appendFile('./.gitignore', 'package-lock.json\r\n', cb)
    fs.appendFile('./.gitignore', '/node_modules\r\n', cb)
    fs.appendFile('./.gitignore', '/dist\r\n', cb)
    fs.appendFile('./.gitignore', 'version.json\r\n', cb)
    fs.appendFile('./.gitignore', '.env\r\n', cb)
    fs.appendFile('./.gitignore', '**/video\r\n', cb)
    fs.appendFile('./.gitignore', '**/photo\r\n', cb)
    fs.appendFile('./.gitignore', '**/*.zip\r\n', cb)
    fs.appendFile('./.gitignore', '**/*.rar\r\n', cb)
  }
  return app.gulp.src(`${app.path.srcFolder}`)
}
function cb() {}
