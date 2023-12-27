import Fastify from 'fastify'
const fastify = Fastify({ logger: true })

// Rotas da aplicação
import getProducts from './routes/getProducts.js'
import getProduct from './routes/getProduct.js'
import addProduct from './routes/addProduct.js'
import updateProduct from './routes/updateProduct.js'
import deleteProduct from './routes/deleteProduct.js'

fastify.register(getProducts)
fastify.register(getProduct)
fastify.register(addProduct)
fastify.register(updateProduct)
fastify.register(deleteProduct)

// Configura a porta e o host do servidor
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' })
        console.log(`Servidor escutando no endereço 3000`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
// Inicia o servidor
start()