
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('name').notNullable()
    table.timestamps(true, true)
  })
  .createTable('tasks', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('created_by').references('id').inTable('users').notNullable()
    table.string('text').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tasks').dropTableIfExists('users')
}
