exports.up = function(knex) {
	return knex.schema.createTable('scores', (tbl) => {
		tbl.increments();

		tbl
			.integer('classId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('classes')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());

		tbl.integer('score').notNullable().defaultTo(0);
		tbl.integer('streak').unsigned().notNullable().defaultTo(0);
		// tbl.integer('threshold').unsigned();
		tbl.string('theme');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('scores');
};