import fastify from 'fastify'

const server = fastify()

server.route({
  method: 'GET',
  url: '/:foo',
  handler: (request, reply) => {
    reply.send({ hello: 'world' })
  },
})

await server.listen({ port: 3000 })
