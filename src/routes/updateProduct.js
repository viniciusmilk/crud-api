// Importa a função dbUpdate do módulo "../persistence/mysql.js"
import { dbUpdate } from "../persistence/mysql.js"

// A função updateProduct é exportada como padrão. Ela é uma função assíncrona que recebe dois parâmetros: fastify e options.
export default async function updateProduct(fastify, options) {
  // A função put do objeto fastify é chamada. Ela recebe dois parâmetros: a rota '/product/:id' e uma função callback.
  fastify.put('/product/:id', (request, reply) => {
    // A função callback recebe dois parâmetros: request e reply. Request contém os dados da requisição e reply é usado para enviar a resposta.

    // Os dados do produto são extraídos do corpo da requisição.
    let { name, category, amount, value } = request.body

    // O nome e a categoria do produto são convertidos para maiúsculas.
    name = name.toUpperCase()
    category = category.toUpperCase()

    // O id do produto é extraído dos parâmetros da requisição.
    const productId = request.params.id

    // A função dbUpdate é chamada com o id do produto e os novos dados do produto. Ela retorna uma promessa.
    dbUpdate(productId, { name, category, amount, value })
      .then(response => {
        // Se a resposta contém a propriedade "erro", o status da resposta é definido como 404 e a resposta é enviada.
        if (response.hasOwnProperty("erro")) {
          reply.status(404).send(response)
        } else {
          // Se a resposta não contém a propriedade "erro", o status da resposta é definido como 200 e a resposta é enviada.
          reply.status(200).send(response)
        }
      })
      .catch(err => {
        // Se ocorrer um erro, ele é registrado no console e lançado novamente.
        console.log(err)
        throw err
      })
  })
}