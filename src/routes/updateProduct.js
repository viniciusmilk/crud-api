import db from "../persistence/db-inMemory.js"

export default async function updateProduct(fastify, options) {
  fastify.put('/product/:id', (request, reply) => {
    let { name, category, amount, value } = request.body
    name = name.toUpperCase()
    category = category.toUpperCase()
    const productId = request.params.id
    const response = db.update(productId, { name, category, amount, value })
    return response ? reply.status(404).send(response) : reply.status(204).send()    
  })
}