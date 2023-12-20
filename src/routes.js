const Database = require('./db-inMemory')
const db = new Database()

async function routes(fastify, options) {
  fastify.get('/product', async (request, reply) => {
    return db.read()
  })

  fastify.get('/product/:id', async (request, reply) => {
    const productId = request.params.id
    return db.readOne(productId)
  })

  fastify.post('/product', async (request, reply) => {
    const { name, category, value } = request.body
    db.create({ name, category, value })
    return reply.status(201).send()
  })

  fastify.put('/product/:id', async (request, reply) => {
    const { name, category, value } = request.body
    const productId = request.params.id
    db.update(productId, { name, category, value })
    return reply.status(204).send()
  })

  fastify.delete('/product/:id', async (request, reply) => {
    const productId = request.params.id
    db.delete(productId)
  })
}

module.exports = routes