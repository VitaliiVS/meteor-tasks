import { Meteor } from 'meteor/meteor'
import { TasksCollection } from '/imports/api/collection'
const db = require('../imports/modules/knex/knex')

Meteor.methods({
  async createTask(text) {
    await db('tasks').insert({ text: text }).returning('id')
    
    const tasks = await db.from('tasks').select().orderBy('created_at', 'desc')

    return tasks
  },
  async getTasks() {
    const tasks = await db.from('tasks').select().orderBy('created_at', 'desc')

    return tasks
  },
  async deleteAllTasks() {
    const tasks = await db('tasks').del()

    return []
  },
  removeMOngoTasks() {
    TasksCollection.remove({})
  }
})