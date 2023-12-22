import db from "./../persistence/db-inMemory.js"

export default async function addProduct(request, reply) {
  const { name, category, amount, value } = request.body
  db.create({ name, category, amount, value })
  return reply.status(201).send()
}