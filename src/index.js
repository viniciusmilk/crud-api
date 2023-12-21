const fastify = require('fastify')({logger: true})
const getProducts = require('./routes/getProducts')
const getProduct = require('./routes/getProduct')
const addProduct = require('./routes/addProduct')
const updateProduct = require('./routes/updateProduct')
const deleteProduct = require('./routes/deleteProduct')

fastify.get('/product', getProducts)
fastify.get('/product/:id',getProduct)
fastify.post('/product', addProduct)
fastify.put('/product/:id', updateProduct)
fastify.delete('/product/:id', deleteProduct)

// Inicia o servidor na porta 3000
fastify.listen({port: 3000, host: '0.0.0.0'}, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`Servidor rodando no endereço ${address}`)
})