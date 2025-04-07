import type { UserRepository } from "../repositories/user-repository";

interface UserRegister {
  email: string;
  name: string;
  password: string;
}

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser({ name, email, password }: UserRegister) {
    const userSameEmail = await this.userRepository.findByEmail(email);

    if (userSameEmail) {
      throw new Error("E-mail already exists");
    }

    await this.userRepository.create({
      name,
      email,
      password,
    });
  }

  async listAllUsers() {
    const users = await this.userRepository.listAll();
    return users;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
