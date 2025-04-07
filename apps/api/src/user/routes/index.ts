import type { FastifyInstance } from "fastify";
import { findByEmail, listAllUsers, register } from "../controllers";

export async function appRoutes(app: FastifyInstance) {
  app.post("/user", register);
  app.get("/user/all", listAllUsers);
  app.post("/teste", findByEmail);
}
