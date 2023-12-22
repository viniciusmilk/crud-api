import db from "../persistence/db-inMemory.js"

export default async function getProducts(request, reply) {
    return db.read()
}