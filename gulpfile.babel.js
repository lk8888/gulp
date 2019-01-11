import gulp from 'gulp'
require('./build/gulp.task')

// 开发环境启动任务
gulp.task('dev', gulp.series('del', gulp.parallel('htmlRev', 'css',  'browserify', 'server')))
