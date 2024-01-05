// import db from "./../persistence/db-inMemory.js"
import { dbCreate } from "../persistence/mysql.js"

export default async function addProduct(fastify, options) {
  fastify.post('/product', (request, reply) => {
    let { name, category, amount, value } = request.body
    name = name.toUpperCase()
    category = category.toUpperCase()
    dbCreate({ name, category, amount, value })
      .then(response => reply.status(200).send(response))
      .catch(err => {
        reply.status(500).send(err)
      })
  })
}