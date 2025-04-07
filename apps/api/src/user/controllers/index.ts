import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository";
import { UserService } from "../services";

const userRepository = new PrismaUserRepository();
const userService = new UserService(userRepository);

const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "password must be at least 6 characters long"),
});

const findUserSchema = z.object({
  email: z.string().email("Email inválido"),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = registerBodySchema.parse(request.body);

  await userService.createUser({ name, email, password });

  reply.code(201).send({ message: "user created successfully" });
}

export async function listAllUsers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const users = await userService.listAllUsers();
  reply.code(200).send({ allUsers: users });
}

export async function findByEmail(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { email } = findUserSchema.parse(request.body);
    const user = await userService.findByEmail(email);
    reply.code(200).send(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({ message: error.errors[0].message });
    }

    if (error instanceof Error && error.message === "User not found") {
      return reply.code(404).send({ message: error.message });
    }

    console.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
}
