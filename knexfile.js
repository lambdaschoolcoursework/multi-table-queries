require('dotenv').config();

module.exports = {
	development: {
		client: 'postgresql',
		connection: {
			database: process.env.DATABASE,
			user:     process.env.USER,
			password: process.env.PASSWORD
		},
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		}
	}
};
