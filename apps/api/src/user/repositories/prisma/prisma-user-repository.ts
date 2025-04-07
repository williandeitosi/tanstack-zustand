import { prisma } from "../../../../prisma/db";
import type { UserRepository } from "../user-repository";
import { Prisma } from "./../../../../generated/prisma/index.d";

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async listAll() {
    const users = await prisma.user.findMany();
    return users;
  }
}
