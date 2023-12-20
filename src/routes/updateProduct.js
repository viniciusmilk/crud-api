const db = require('../persistence/db-inMemory')

module.exports = async (request, reply) => {
    const { name, category, value } = request.body
    const productId = request.params.id
    db.update(productId, { name, category, value })
    return reply.status(204).send()
  }