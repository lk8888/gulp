import path from './gulp.config'

const enter_path = `${path.enterPath}/Assets/`
const out_path = `${path.outPath}/Assets/`

export default file_path = {
	html: {
		enter: `${enter_path}/**/*.html`,
		out: path.outPath
	},
	css: {
		enter: `${enter_path}/**/*.css`,
		out: `${out_path}/Css/`
	},
	script: {
		enter: `${enter_path}/**/*.js`,
		out: `${out_path}/Js/`
	}
}