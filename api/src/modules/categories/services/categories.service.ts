import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "../../../shared/database/repositories/categories.repositories";

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  findAllByUserId(userId: string) {
    return this.categoriesRepo.findMany({
      where: { userId },
    });
  }
}
