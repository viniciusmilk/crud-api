import db from "../persistence/db-inMemory.js"

export default async function getProduct(fastify, options) {
  fastify.get('/product/:id', async (request, reply) => {
    const productId = request.params.id
    return db.readOne(productId)
  })
}