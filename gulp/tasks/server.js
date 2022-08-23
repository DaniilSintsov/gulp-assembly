import {configServer} from '../config/settings.js'

export const server = () => {
  if (configServer.forPHP) {
    // При index.php
    app.plugins.browsersync.init({
      port: 3000,
      open: configServer.open,
      proxy: configServer.proxy,
    })
  } else {
    // При index.html
    app.plugins.browsersync.init({
      port: 3000,
      open: configServer.open,
      server: {
        baseDir: `${app.path.build.html}`,
      },
      notify: false,
    })
  }
}
