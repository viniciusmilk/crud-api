// Importa a função dbRead do módulo "../persistence/mysql.js"
import { dbRead } from "../persistence/mysql.js"

// A função getProducts é exportada como padrão. Ela é uma função assíncrona que recebe dois parâmetros: fastify e options.
export default async function getProducts(fastify, options) {
    // A função get do objeto fastify é chamada com dois argumentos: a rota '/product' e uma função assíncrona.
    fastify.get('/product', async (request, reply) => {
        // A função assíncrona retorna o resultado da função dbRead, que é importada do módulo "../persistence/mysql.js".
        // Isso provavelmente lê dados de um banco de dados MySQL.
        return dbRead()
    })
}