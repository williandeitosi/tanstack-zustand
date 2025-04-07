import "dotenv/config";
import fastify from "fastify";
import { appRoutes } from "./user/routes";

const app = fastify();

app.register(appRoutes, { prefix: "/api" });

const port = 3333;

const start = async () => {
  try {
    await app.listen({ port });
    console.log(`Server is running... http://localhost:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
