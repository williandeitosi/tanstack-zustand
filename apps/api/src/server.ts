import "dotenv/config";
import fastify, { type FastifyReply, type FastifyRequest } from "fastify";

const app = fastify();

const port = 3333;

app.get("/", (request: FastifyRequest, reply: FastifyReply) => {
  reply.send("Ola Fastify");
});

app.listen({ port }, () =>
  console.log(`Server is running... http://localhost:${port}`)
);
