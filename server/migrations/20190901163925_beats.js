

exports.up = function(knex, Promise) {
    return knex.schema.createTable('beats', (table) => {
        table.increments('id').primary()
        table.string('sounds')
        table.string('timings')
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('beats')
};

