// import db from "../persistence/db-inMemory.js"
import { dbReadOne } from '../persistence/mysql.js'

export default async function getProduct(fastify, options) {
  fastify.get('/product/:id', async (request, reply) => {
    const productId = request.params.id
    return dbReadOne(productId)
  })
}