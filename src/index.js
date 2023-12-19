const fastify = require('fastify')({
    logger: true
})

// Declarando rota
fastify.get('/', (request, replay) => {
    replay.send({hello: 'Fastify!'})
})

// Inicia o servidor na porta 3000
fastify.listen({port: 3000, host: '0.0.0.0'}, (err, address) => {
    if (err) throw err
    fastify.log.info(`Servidor rodando no endereço ${address}`)
})