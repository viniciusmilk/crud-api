import db from "../persistence/db-inMemory.js"

export default async function getProduct(request, reply) {
  const productId = request.params.id
  return db.readOne(productId)
}