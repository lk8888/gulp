import gulp from 'gulp'
import connect from 'gulp-connect'
import runSequence from 'run-sequence'
import clean from 'gulp-clean'
import browserify from 'browserify'
import stream from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import replace from 'gulp-replace'
import variables from './config/variables.js'
import files from './src/Path/index.js'
console.log(variables(),3333,process.env.NODE_ENV)
console.log(files,666)

var app = {
	srcPath: 'src/',
	devPath: 'dev/',
	prdPath: 'dist/'
}
gulp.task('clean', () => {
	return gulp.src('dev')
				.pipe(clean())
})
gulp.task('browserify', () => {
	var tasks = files.map((entry) => {
		return browserify({
			entries: [entry.fpath],
			debug: true
		})
		.bundle()
		.pipe(stream(entry.fname))
		.pipe(replace('process.env.NODE_ENV', JSON.stringify(process.env.NODE_ENV)))
		.pipe(buffer())
		.pipe(gulp.dest('dev/Assets/Js'))
	})
	
})
gulp.task('server', () => {
	connect.server({
		root: './dev',
		livereload: true,
		port: 8000
	})
})
gulp.task('html', () => {
	gulp.src(app.srcPath + 'Page/**/*.html')
		.pipe(gulp.dest(app.devPath + 'Page'))
})

gulp.task('watch', () => {
	gulp.watch([])
})

// gulp.task('dev', gulp.series('clean', gulp.parallel('watch', 'server', 'html', 'scripts')))
gulp.task('dev', gulp.parallel('html', 'server', 'browserify'))

gulp.task('default', () => {
	console.log(111)
})