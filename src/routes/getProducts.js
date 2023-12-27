import db from "../persistence/db-inMemory.js"

export default async function getProducts(fastify, options) {
    fastify.get('/product', async (request, reply) => {
        return db.read()
    })
}