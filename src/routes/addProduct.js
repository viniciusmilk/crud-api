// Importa a função dbCreate do módulo "../persistence/mysql.js"
import { dbCreate } from "../persistence/mysql.js"

// A função addProduct é exportada como padrão. Ela é uma função assíncrona que recebe dois parâmetros: fastify e options.
export default async function addProduct(fastify, options) {
  // A função post do objeto fastify é chamada. Ela recebe dois parâmetros: a rota '/product' e uma função callback.
  fastify.post('/product', (request, reply) => {
    // A função callback recebe dois parâmetros: request e reply. 
    // A partir do objeto request, são extraídas as propriedades name, category, amount e value do corpo da requisição.
    let { name, category, amount, value } = request.body
    // As variáveis name e category são convertidas para maiúsculas.
    name = name.toUpperCase()
    category = category.toUpperCase()
    // A função dbCreate é chamada com um objeto contendo name, category, amount e value como argumento.
    dbCreate({ name, category, amount, value })
      // Em caso de sucesso, a resposta é enviada com status 200 e o corpo da resposta.
      .then(response => reply.status(200).send(response))
      // Em caso de erro, a resposta é enviada com status 500 e o erro.
      .catch(err => {
        reply.status(500).send(err)
      })
  })
}