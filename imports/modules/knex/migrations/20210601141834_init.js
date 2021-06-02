
exports.up = function(knex) {
    return knex.schema.createTable('tasks', (table) => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
        table.string('text').notNullable()
        table.timestamps(true, true)
      })
}

exports.down = function(knex) {
  return knex.schema.dropTable('tasks')
}
