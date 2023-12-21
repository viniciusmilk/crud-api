const db = require('../persistence/db-inMemory')

module.exports = async (request, reply) => {
    const { name, category, value } = request.body
    const productId = request.params.id
    const response = db.update(productId, { name, category, value })
    return response ? reply.status(404).send(response) : reply.status(204).send()
  }