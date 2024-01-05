// import db from "../persistence/db-inMemory.js"
import { dbDelete } from "../persistence/mysql.js"

export default async function deleteProduct(fastify, options) {
  fastify.delete('/product/:id', (request, reply) => {
    const productId = request.params.id
    dbDelete(productId)
      .then(response => reply.status(200).send(response))
      .catch(err => {
        reply.status(500).send(err)
      })
  })
}