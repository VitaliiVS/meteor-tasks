
exports.seed = async (knex) => {
  let userId

  await knex.raw('TRUNCATE TABLE "users" CASCADE')
  await knex.raw('TRUNCATE TABLE "tasks" CASCADE')

  await knex('users').insert({ name: 'testUser' })

  userId = await knex.from('users').select('id').where({ name: 'testUser' })

  return knex('tasks').insert([
    {
      text: 'testTask1',
      createdBy: userId[0].id
    },
    {
      text: 'testTask2',
      createdBy: userId[0].id
    },
    {
      text: 'testTask3',
      createdBy: userId[0].id
    }
  ])
}
