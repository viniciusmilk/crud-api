
const obj = '{"name":"Marcos","lastName":"Leite","age":24,"sex":"M"}'

async function routes (fastify, options) {
    fastify.get('/', async (request, reply) => {
      return JSON.parse(obj)
    })
  }
  
  module.exports = routes