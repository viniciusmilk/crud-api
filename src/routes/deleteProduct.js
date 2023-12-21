const db = require('../persistence/db-inMemory')

module.exports = async (request, reply) => {
    const productId = request.params.id
    const response = db.delete(productId)
    return response ? reply.status(404).send(response) : "DELETADO COM SUCESSO!"
  }