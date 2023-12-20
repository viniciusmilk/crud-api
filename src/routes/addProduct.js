const db = require('../persistence/db-inMemory')

module.exports = async (request, reply) => {
    const { name, category, value } = request.body
    db.create({ name, category, value })
    console.log()
    return reply.status(201).send()
  }