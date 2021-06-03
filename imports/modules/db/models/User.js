const { Model } = require('objection')
const Tasks = require('./Task')

class User extends Model {
    static get tableName() {
        return 'users'
    }

    static get relationMappings() {
        return {
            tasks: {
                relation: Model.HasOneRelation,
                modelClass: Tasks,
                join: {
                    from: 'users.id',
                    to: 'tasks.createdBy'
                }
            }
        }
    }
}

module.exports = User