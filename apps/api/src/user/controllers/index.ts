import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository";
import { UserService } from "../services";

const userRepository = new PrismaUserRepository();
const userService = new UserService(userRepository);

const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, "password must be at least 6 characters long"),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = registerBodySchema.parse(request.body);

  await userService.createUser({ name, email, password });

  reply.code(201).send({ message: "user created successfully" });
}
