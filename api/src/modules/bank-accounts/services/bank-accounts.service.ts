import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/modules/email/email.service';
import { BankAccountSharesRepository } from 'src/shared/database/repositories/bank-account-shares.repositories';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { ShareBankAccountDto } from '../dto/share-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly bankAccountSharesRepo: BankAccountSharesRepository,
    private readonly usersRepo: UsersRepository,
    private readonly emailService: EmailService,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  async create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type, shareWithEmail, permission } =
      createBankAccountDto;

    const bankAccount = await this.bankAccountsRepo.create({
      data: {
        userId,
        color,
        initialBalance,
        name,
        type,
      },
    });

    if (shareWithEmail && permission) {
      const user = await this.usersRepo.findUnique({
        where: { email: shareWithEmail },
      });

      await this.bankAccountSharesRepo.create({
        data: {
          bankAccountId: bankAccount.id,
          email: shareWithEmail,
          permission,
          userId: user?.id,
        },
      });

      const owner = await this.usersRepo.findUnique({ where: { id: userId } });
      await this.emailService.sendInvite(shareWithEmail, owner.name);
    }

    return bankAccount;
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepo.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
        shares: {
          select: {
            userId: true,
            email: true,
            permission: true,
          },
        },
      },
    });

    const sharedBankAccounts = await this.bankAccountSharesRepo.findMany({
      where: { userId },
      include: {
        bankAccount: {
          include: {
            transactions: {
              select: {
                type: true,
                value: true,
              },
            },
            shares: {
              select: {
                userId: true,
                email: true,
                permission: true,
              },
            },
          },
        },
      },
    });

    const allAccounts = [
      ...bankAccounts,
      ...sharedBankAccounts.map((share) => ({
        ...share.bankAccount,
        isShared: true,
        permission: share.permission,
      })),
    ];

    return allAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === 'INCOME'
            ? transaction.value
            : -transaction.value),
        0,
      );

      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return {
        ...bankAccount,
        currentBalance,
      };
    });
  }

  async share(
    userId: string,
    bankAccountId: string,
    shareBankAccountDto: ShareBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    const { email, permission } = shareBankAccountDto;

    const user = await this.usersRepo.findUnique({
      where: { email },
    });

    await this.bankAccountSharesRepo.create({
      data: {
        bankAccountId,
        email,
        permission,
        userId: user?.id,
      },
    });

    const owner = await this.usersRepo.findUnique({ where: { id: userId } });
    await this.emailService.sendInvite(email, owner.name);
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    const { color, initialBalance, name, type } = updateBankAccountDto;

    return this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: {
        color,
        initialBalance,
        name,
        type,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId },
    });

    return null;
  }
}
