import { Injectable } from "@nestjs/common";

import { BankAccountsRepository } from "src/shared/database/repositories/bank-accounts.repositories";
import { ValidateBankAccountOwnershipService } from "./validate-bank-account-ownership.service";
import { CreateBankAccountDto } from "../dto/create-bank-account.dto";
import { UpdateBankAccountDto } from "../dto/update-bank-account.dto";

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnerShip: ValidateBankAccountOwnershipService
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, color, type } = createBankAccountDto;

    return this.bankAccountsRepo.create({
      data: {
        userId,
        name,
        initialBalance,
        color,
        type,
      },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepo.findMany({
      where: {
        userId,
      },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === "INCOME"
            ? transaction.value
            : -transaction.value),
        0
      );

      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return {
        ...bankAccount,
        currentBalance,
      };
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto
  ) {
    await this.validateBankAccountOwnerShip.validate(userId, bankAccountId);

    const { name, initialBalance, color, type } = updateBankAccountDto;

    return this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: {
        name,
        initialBalance,
        color,
        type,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnerShip.validate(userId, bankAccountId);

    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId },
    });

    return null;
  }
}
