import "dotenv/config";
import fastify from "fastify";
import { appRoutes } from "./user/routes";

const app = fastify();
app.register(appRoutes);

const port = 3333;

app.listen({ port }, () =>
  console.log(`Server is running... http://localhost:${port}`)
);
