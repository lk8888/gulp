import gulp from 'gulp'
import connect from 'gulp-connect' // 启动本地服务器
import runSequence from 'run-sequence' // 按顺序执行任务
import del from 'del' // 清除文件、文件夹
import browserify from 'browserify' // 打包工具
import stream from 'vinyl-source-stream' //
import buffer from 'vinyl-buffer' //
import replace from 'gulp-replace' // 替换
import rev from 'gulp-rev' // 静态资源文件添加hash值
import revCollector from 'gulp-rev-collector' //根据rev生成的hash值, 去替换html中的文件
import revReplace from 'gulp-rev-replace' // 替换html中文件版本号
import uglify from 'gulp-uglify' // js压缩
import csso from 'gulp-csso' // css 压缩
import htmlmin from 'gulp-htmlmin' // html压缩

import variables from '../config/variables.js'
import files from '../src/Path/index.js'
import file_path from './gulp.path'
var app = {
	srcPath: 'src/',
	devPath: 'dev/',
	prdPath: 'dist/'
}
// 清除文件
gulp.task('del', () => {
	return del(['dev', 'rev'])
})
// js打包，并替换字符
gulp.task('browserify', () => {
	var tasks = files.map((entry) => {
		return browserify({
			entries: [entry.fpath],
			debug: true,
		})
		.bundle()
		.pipe(stream(entry.fname))
		.pipe(replace('process.env.NODE_ENV', JSON.stringify(process.env.NODE_ENV)))
		.pipe(buffer())
		.pipe(gulp.dest('dev/Assets/Js'))
	})
	
})
// 启动本地服务
gulp.task('server', () => {
	connect.server({
		root: './',
		livereload: true,
		port: 8000
	})
})
// 复制html
gulp.task('html', () => {
	gulp.src(app.srcPath + 'Page/*.html')
		.pipe(gulp.dest(app.devPath + 'Page'))
})
// 压缩html并改变html引用路径
gulp.task('htmlRev', () => {
	let opts = {
		removeComments: true, // 清除html注释
		collapseWhitespace: true, // 压缩html
		removeEmptyAttributes: true, // 删除所有空格作属性值
		removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
		removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
		minifyJS: true, // 压缩页面js
		minifyCSS: true // 压缩页面css
	}
	return gulp
			.src(['rev/**/*.json', 'dev/Page/*.html'])
			.pipe(revCollector({
				replaceReved: true
			}))
			.pipe(htmlmin(opts))
			.pipe(gulp.dest(`${app.devPath}/Page`))

})
// 压缩css，添加hash值
gulp.task('css', () => {
	return gulp
			.src(`${app.srcPath}/Assets/Css/*.css`)
			.pipe(csso())
			.pipe(rev())
			.pipe(gulp.dest(`${app.devPath}/Assets/Css`))
			.pipe(rev.manifest())
			.pipe(gulp.dest('./rev/Css'))
})
// 替换html中文件版本号
gulp.task('revision', () => {
	return gulp
			.src([app.devPath + '/Assets/Js/*.js', app.devPath + 'Assets/Css/*.css'])
			.pipe(rev())
			.pipe(gulp.dest())
})
// 监听文件更改
gulp.task('watch', () => {
	gulp.watch([])
})