// import db from "../persistence/db-inMemory.js"
import { dbRead } from "../persistence/mysql.js"

export default async function getProducts(fastify, options) {
    fastify.get('/product', async (request, reply) => {
        return dbRead()
    })
}