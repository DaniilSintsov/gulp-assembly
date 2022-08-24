export const copyVideo = () => {
  return app.gulp
    .src(app.path.src.video)
    .pipe(app.gulp.dest(app.path.build.video))
}
