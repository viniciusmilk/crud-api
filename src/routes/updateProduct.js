// import db from "../persistence/db-inMemory.js"
import { dbUpdate } from "../persistence/mysql.js"

export default async function updateProduct(fastify, options) {
  fastify.put('/product/:id', (request, reply) => {
    let { name, category, amount, value } = request.body
    name = name.toUpperCase()
    category = category.toUpperCase()
    const productId = request.params.id
    dbUpdate(productId, { name, category, amount, value })
      .then(response => {
        if (response.hasOwnProperty("erro")) {
          reply.status(404).send(response)
        } else {
          reply.status(200).send(response)
        }
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  })
}