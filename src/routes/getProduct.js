// Importa a função dbReadOne do módulo '../persistence/mysql.js'
import { dbReadOne } from '../persistence/mysql.js'

// A função exportada (getProduct) é uma função assíncrona que configura uma rota GET no servidor Fastify
export default async function getProduct(fastify, options) {
  // A rota é '/product/:id', onde ':id' é um parâmetro que será substituído pelo ID do produto na URL
  fastify.get('/product/:id', async (request, reply) => {
    // O ID do produto é extraído dos parâmetros da requisição
    const productId = request.params.id
    // A função dbReadOne é chamada com o ID do produto e o resultado é retornado como resposta da requisição
    return dbReadOne(productId)
  })
}