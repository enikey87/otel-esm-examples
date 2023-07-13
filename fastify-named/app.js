import { fastify } from 'fastify';

const server = fastify();

server.route({
  method: "GET",
  url: "/",
  handler: (req, res) => {
    return res.status(200).send();
  }
})

server.listen({ port: 3000 });
