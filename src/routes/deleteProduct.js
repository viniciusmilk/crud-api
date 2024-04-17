// Importa a função dbDelete do módulo "../persistence/mysql.js"
import { dbDelete } from "../persistence/mysql.js"

// A função deleteProduct é exportada como padrão. Ela é uma função assíncrona que recebe dois parâmetros: fastify e options.
export default async function deleteProduct(fastify, options) {
  // A função delete do objeto fastify é chamada. Ela recebe dois parâmetros: a rota '/product/:id' e uma função callback.
  fastify.delete('/product/:id', (request, reply) => {
    // A constante productId é definida como o id passado como parâmetro na rota.
    const productId = request.params.id
    // A função dbDelete é chamada com productId como argumento.
    dbDelete(productId)
      // Se a promessa for resolvida, a resposta é enviada com o status 200.
      .then(response => reply.status(200).send(response))
      // Se a promessa for rejeitada, o erro é enviado com o status 500.
      .catch(err => {
        reply.status(500).send(err)
      })
  })
}