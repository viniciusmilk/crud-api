import Fastify from 'fastify'
const fastify = Fastify()

import getProducts from './routes/getProducts.js'
import getProduct from './routes/getProduct.js'
import addProduct from './routes/addProduct.js'
import updateProduct from './routes/updateProduct.js'
import deleteProduct from './routes/deleteProduct.js'

fastify.get('/product', getProducts)
fastify.get('/product/:id', getProduct)
fastify.post('/product', addProduct)
fastify.put('/product/:id', updateProduct)
fastify.delete('/product/:id', deleteProduct)

// Inicia o servidor na porta 3000
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`Servidor rodando no endereço ${address}`)
})