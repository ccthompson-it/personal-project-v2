

exports.up = function(knex, Promise) {
    return knex.schema.createTable('beats', (table) => {
        table.increments('id').primary()
        table.integer('beat_id')
        table.string('sound')
        table.integer('timing')
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('beats')
};

