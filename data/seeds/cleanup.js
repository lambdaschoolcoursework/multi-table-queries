const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
	return cleaner.clean(knex, {
		ignoreTables: [
			'knex_migrations',
			'knex_migrations_lock',
			'categories',
			'customer_customer_demo',
			'customer_demographics',
			'customers',
			'employee_territories',
			'employees',
			'order_details',
			'orders',
			'products',
			'region',
			'shippers',
			'suppliers',
			'territories',
			'us_states'
		]
	});
};