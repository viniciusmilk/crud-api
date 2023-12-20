const db = require('../persistence/db-inMemory')

module.exports = async (request, reply) => {
    return db.read()
}