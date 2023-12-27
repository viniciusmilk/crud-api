import db from "./../persistence/db-inMemory.js"

export default async function addProduct(fastify, options) {
  fastify.post('/product', (request, reply) => {
    let { name, category, amount, value } = request.body
    name = name.toUpperCase()
    category = category.toUpperCase()
    db.create({ name, category, amount, value })
    return reply.status(201).send()
  })
}