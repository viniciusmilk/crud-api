const fastify = require('fastify')({
    logger: true
})

fastify.register(require('./firstRoute'))

// Inicia o servidor na porta 3000
fastify.listen({port: 3000, host: '0.0.0.0'}, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`Servidor rodando no endereço ${address}`)
})