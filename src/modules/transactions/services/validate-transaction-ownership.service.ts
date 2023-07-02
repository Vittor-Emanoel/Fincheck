import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoriesRepository } from "src/shared/database/repositories/categories.repositories";
import { TransactionsRepository } from "src/shared/database/repositories/transactions.repositories";

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(private readonly transactionsRepo: TransactionsRepository) {}

  async validate(userId: string, transactionId: string) {
    const isOwner = await this.transactionsRepo.findFirst({
      where: { id: transactionId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException("Transaction not found");
    }
  }
}
