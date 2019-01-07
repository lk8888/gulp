export default function run() {
	let env = {};
	let variables = process.env.NODE_ENV
	switch(variables) {
		case 'development':
			env.apiUrl = 'dev'
	}
	console.log(variables,222)
	return env
}