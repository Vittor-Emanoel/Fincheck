import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../shared/database/repositories/users.repositories";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async getUserById(userId: string) {
    return await this.usersRepo.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}
