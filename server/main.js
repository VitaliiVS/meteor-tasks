const { Meteor } = require('meteor/meteor')
const { TasksCollection }  = require('/imports/api/collection')
const { setupDb } = require('../imports/modules/db/knex')
const User = require('../imports/modules/db/models/User')
const Task = require('../imports/modules/db/models/Task')

setupDb()

Meteor.methods({
  async createTask(text) {
    const user = await User.query().select().where({ name: 'testUser' })

    await Task.query().insert({ text: text, createdBy: user[0].id })
    
    const tasks = await Task.query().select().orderBy('created_at', 'desc')

    return tasks
  },
  async getTasks() {
    const tasks = await Task.query().select().orderBy('created_at', 'desc')

    return tasks
  },
  async deleteAllTasks() {
    const tasks = await Task.query().delete()

    return []
  },
  removeMOngoTasks() {
    TasksCollection.remove({})
  }
})