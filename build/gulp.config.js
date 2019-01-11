const dev_path = './dev'
const dist_path = './dist'
export default path = {
	enterPath: './src',
	outPath: process.env.NODE_ENV == 'development' ? dev_path : dist_path
}