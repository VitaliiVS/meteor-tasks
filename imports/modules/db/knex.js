const knex = require('knex')
const knexfile = require('./knexfile')
const { Model } = require('objection')


const db = knex(knexfile.development)

const setupDb = () => {
    Model.knex(db)
}

exports.db = db
exports.setupDb = setupDb